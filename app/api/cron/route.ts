import { sendEmailNotification } from '@/lib/emails';
import { NotificationSub, NotifOutageInfo, OutageData } from '@/lib/definitions';
import { coordIsInOutageZone, getManipulatedOutages } from '@/lib/utils';
import { NextRequest } from 'next/server';
import content from './../../content.json';
import { getAllNotifications, getAllOutages, updateNotifOutageInfo } from '@/lib/database';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Attempt to send notification emails to users if required.
 *
 * @param {Array<OutageData>} outages
 * @param {Array<NotificationSub>} subscriptions
 * @returns {Object}
 */
async function trySendEmails(
    outages: Array<OutageData>,
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
            const outageStatus = outage.statustext ? outage.statustext.toLowerCase() : '';

            const locationMatches = subLocation && outageAddress.includes(subLocation);
            const coordsMatch = outage.hull ?
                subCoords && coordIsInOutageZone(subCoords, outage.hull, outageCoords) :
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
                    await sendEmailNotification(sub as NotificationSub, outage as OutageData, oldStatus);

                    emailsSentForSub++;
                    totalEmailsSent++;

                    const emailedTime = Math.round(new Date().getTime() / 1000);

                    // If we've emailed them before, update the object values; otherwise create a new one and
                    // push it to subInfo
                    if (filteredSub && filteredSub.status) {
                        filteredSub.emailSent = emailedTime;
                        filteredSub.status = outage.statustext;
                    }
                    else {
                        subInfo.push({
                            id: outage.id,
                            emailSent: emailedTime,
                            status: outage.statustext
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

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    // TODO use proxy server to update outages (?)

    const outages = getManipulatedOutages(await getAllOutages());

    console.log('Fetched outages');

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

    const emailCount = await trySendEmails(outages, subscriptions);

    console.log(`Emails sent: ${emailCount}`);

    await prisma.$disconnect();

    return new Response(JSON.stringify({ 'success': true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
