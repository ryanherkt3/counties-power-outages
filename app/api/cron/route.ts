import { sendEmailNotification } from '@/lib/emails';
import { Coordinate, NotificationSub, NotifOutageInfo, OutageDBData } from '@/lib/definitions';
import { coordIsInOutageZone, getManipulatedOutages } from '@/lib/utils';
import { NextRequest } from 'next/server';
import content from './../../content.json';
import { getAllNotifications, updateNotifOutageInfo } from '@/lib/database';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    // Remove expired outages
    await removeOutages();
    console.log('Expired outages removed');

    // Add or update outages
    const initOutages = await fetch(`${process.env.CRON_API_URL}`);
    const initOutagesJson = await initOutages.json();
    let outages = initOutagesJson.body.planned_outages;

    for (const outage of outages) {
        await addUpdateOutage(outage);
    }
    console.log('Outages added/updated');

    // Early return if no outages have been reported
    if (outages.length === 0) {
        await prisma.$disconnect();

        return new Response(
            JSON.stringify(
                {
                    'success': true,
                    'note': content['cron-no-outages'],
                }
            ), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    const subscriptions = await getAllNotifications();

    // Early return if there are no active subscriptions
    if (subscriptions.length === 0) {
        await prisma.$disconnect();

        return new Response(JSON.stringify({ 'success': true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    console.log('Fetched subscriptions');

    outages = getManipulatedOutages(outages);

    console.log('Fetched manipulated outages');

    const emailCount = await trySendEmails(outages, subscriptions);

    console.log(`Emails sent: ${emailCount}`);

    await prisma.$disconnect();

    return new Response(JSON.stringify({ 'success': true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * Add an outage to the DB, or update an existing one
 *
 * @param {Object} outage 
 * @returns {Object} 
 */
async function addUpdateOutage(outage: any) {
    const {
        id,
        projectType,
        shutdownDateTime,
        shutdownPeriodStart,
        shutdownPeriodEnd,
        feeder,
        affectedCustomers,
        lat, lng,
        distance,
        hull,
        address,
        statusText,
        latestInformation,
        originalShutdownDateTime,
        originalShutdownPeriods,
        lastModified
    } = outage;

    const shutDownStart = shutdownPeriodStart;
    const shutDownEnd = shutdownPeriodEnd;
    const ogShutDownStart = originalShutdownPeriods.length ? originalShutdownPeriods[0].start : '';
    const ogShutDownEnd = originalShutdownPeriods.length ? originalShutdownPeriods[0].end :  '';

    const hullObj = [];
    let hullString = '';
    if (hull && typeof hull === 'object') {
        for (const coords of hull) {
            hullObj.push({lat: coords.lat, lng: coords.lng});
        }
        hullString = JSON.stringify(hullObj);
    }

    const dateString = shutdownDateTime.split('T')[0];
    const ogDateString = originalShutdownDateTime.length ? originalShutdownDateTime.split('T')[0] : dateString;

    // Add outage to DB
    try {
        const outageExists = await prisma.outages.findFirst({ where: { id: id } });

        if (outageExists) {
            const updateOutage = await prisma.outages.update({
                where: {
                    id: id
                },
                data: {
                    shutdownDate: new Date(dateString),
                    statusText: statusText,
                    latestInformation: latestInformation || '',
                    originalShutdownDate: new Date(ogDateString),
                    originalShutdownPeriodStart: ogShutDownStart,
                    originalShutdownPeriodEnd: ogShutDownEnd,
                    lastModified: lastModified,
                }
            });

            return updateOutage;
        }

        const addOutage = await prisma.outages.create({
            data: {
                id,
                projectType: projectType,
                shutdownDateTime: shutdownDateTime,
                shutdownDate: new Date(dateString),
                shutdownPeriodStart: shutDownStart,
                shutdownPeriodEnd: shutDownEnd,
                feeder,
                affectedCustomers: affectedCustomers,
                lat,
                lng,
                distance,
                hull: hullString,
                address,
                statusText: statusText,
                latestInformation: latestInformation || '',
                originalShutdownDate: new Date(ogDateString),
                originalShutdownPeriodStart: ogShutDownStart,
                originalShutdownPeriodEnd: ogShutDownEnd,
                lastModified: lastModified,
            }
        });

        return addOutage;
    }
    catch (error) {
        console.error('Error adding/updating outage entry:', error);
        throw error;
    }
}

/**
 * Remove outages from DB that have expired
 *
 * @returns {Object}
 */
async function removeOutages() {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const removeOutages = await prisma.outages.deleteMany({
            where: {
                shutdownDate: {
                    lt: today
                }
            }
        });

        return removeOutages;
    }
    catch (error) {
        console.error('Error removing expired outages:', error);
        throw error;
    }
}

/**
 * Attempt to send notification emails to users if required.
 *
 * @param {Array<OutageDBData>} outages
 * @param {Array<NotificationSub>} subscriptions
 * @returns {Object}
 */
async function trySendEmails(
    outages: Array<OutageDBData>,
    subscriptions: Array<NotificationSub>
) {
    let totalEmailsSent = 0;

    for (const sub of subscriptions) {
        let emailsSentForSub = 0;

        const subCoords = {
            lat: sub.lat,
            lng: sub.lng
        };

        // Check sub.outageinfo to see if an email has been sent within the last 7 days, and also if
        // the outage status has change compared to last time - if so send email anyway
        let subInfo =
            sub.outageinfo === null || ['null', ''].includes(sub.outageinfo) ? [] : JSON.parse(sub.outageinfo);

        // Check if any objects in outageInfo have email timestamps that are at least 14 days old
        const oldEmailAlerts = Object.keys(subInfo).length > 0 && subInfo.filter((x: NotifOutageInfo) => {
            const currentDate = new Date();
            const currentTime = currentDate.getTime() / 1000;

            return currentTime - x.emailSent >= 86400 * 14;
        }).length > 0;

        // If oldEmailAlerts is true, update subInfo by removing objects in it whose
        // email timestamps are at least 14 days old
        if (oldEmailAlerts) {
            subInfo = subInfo.filter((x: NotifOutageInfo) => {
                const currentDate = new Date();
                const currentTime = currentDate.getTime() / 1000;

                return currentTime - x.emailSent < 86400 * 14;
            });
        }

        for (const outage of outages) {
            const outageCoords = {
                lat: outage.lat,
                lng: outage.lng
            };

            const subLocation = sub.location ? sub.location.toLowerCase() : '';
            const outageAddress = outage.address ? outage.address.toLowerCase() : '';
            const outageStatus = outage.statusText ? outage.statusText.toLowerCase() : '';

            // Remove location endings from the sub location string
            const locationEndings = [
                'st', 'pl', 'rd', 'dr', 'ct', 'ave', 'wy', 'cres', 'ln', 'cl', 'gr', 'bvd', 'cr', 'esp',
                'street', 'place', 'road', 'drive', 'court', 'avenue', 'way', 'crescent',
                'lane', 'close', 'grove', 'boulevard', 'esplanade'
            ];

            const locations = subLocation.split(' ').filter((x) => {
                return !locationEndings.includes(x);
            });

            let locationMatches = false;
            for (const location of locations) {
                locationMatches = outageAddress.includes(location);
            }

            const coordsMatch = outage.hull ?
                subCoords && coordIsInOutageZone(subCoords, outage.hull as Coordinate[], outageCoords) :
                false;

            const filteredSub = Object.keys(subInfo).length > 0 ? subInfo.filter((x: NotifOutageInfo) => {
                return x.id === outage.id;
            })[0] : {};

            const outageStatusChanged = filteredSub && filteredSub.status &&
                filteredSub.status.toLowerCase() !== outageStatus;
            let shouldSendEmail = coordsMatch || locationMatches;

            if (shouldSendEmail && !!(filteredSub && filteredSub.status)) {
                if (!outageStatusChanged && filteredSub.emailSent) {
                    const currentDate = new Date();
                    const currentTime = currentDate.getTime() / 1000;

                    shouldSendEmail = currentTime - filteredSub.emailSent >= 86400 * 7;
                }
            }

            if (shouldSendEmail) {
                try {
                    const oldStatus = outageStatusChanged ? filteredSub.status : '';
                    await sendEmailNotification(sub as NotificationSub, outage as OutageDBData, oldStatus);

                    emailsSentForSub++;
                    totalEmailsSent++;

                    const emailedTime = Math.round(new Date().getTime() / 1000);

                    // If we've emailed them before, update the object values; otherwise create a new one and
                    // push it to subInfo
                    if (filteredSub && filteredSub.status) {
                        filteredSub.emailSent = emailedTime;
                        filteredSub.status = outage.statusText;
                    }
                    else {
                        subInfo.push({
                            id: outage.id,
                            emailSent: emailedTime,
                            status: outage.statusText
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                    return totalEmailsSent;
                }
            }
        }

        try {
            if (emailsSentForSub > 0 || oldEmailAlerts) {
                const res = await updateNotifOutageInfo(JSON.stringify(subInfo), sub.id);
                console.log(res ? 'Updated notification subscription' : 'Failed to update notification subscription');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return totalEmailsSent;
}
