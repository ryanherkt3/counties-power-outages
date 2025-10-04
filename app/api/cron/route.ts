import { db, QueryResultRow, VercelPoolClient } from '@vercel/postgres';
import { sendEmailNotification } from '@/lib/emails';
import { NotificationSub, NotifOutageInfo, OutageData } from '@/lib/definitions';
import { coordIsInOutageZone } from '@/lib/utils';
import { NextRequest } from 'next/server';
import content from './../../content.json';

/**
 * Get all outages from database.
 *
 * @param client
 * @returns {Object}
 */
async function getOutages(client: VercelPoolClient) {
    try {
        const outages = await client.sql`SELECT * FROM outages`;
        return {
            outages
        };
    }
    catch (error) {
        console.error('Error getting outages:', error);
        throw error;
    }
}

/**
 * Get all notification subscriptions from database.
 *
 * @param client
 * @returns {Object}
 */
async function getNotifSubs(client: VercelPoolClient) {
    try {
        const subs = await client.sql`SELECT * FROM notifications`;
        return {
            subs
        };
    }
    catch (error) {
        console.error('Error getting subscriptions:', error);
        throw error;
    }
}

/**
 * Update the outageInfo for the notification which had an email sent,
 * or which had no emails sent for a specific ID within the last 14 days
 *
 * @param client
 * @param {string} outageInfo
 * @param {string} id
 * @returns {Object}
 */
async function updateSubInfo(client: VercelPoolClient, outageInfo: string, id: string) {
    try {
        const updateSub = await client.sql`
            UPDATE notifications
            SET outageinfo = ${outageInfo}
            WHERE id = ${id}
        `;

        console.log('Updated notification subscription');

        return {
            updateSub
        };
    }
    catch (error) {
        console.error('Error updating notification subscription:', error);
        throw error;
    }
}

/**
 * Attempt to send notification emails to users if required.
 *
 * @param client
 * @param {Array<QueryResultRow>} outages
 * @param {Array<QueryResultRow>} subscriptions
 * @returns {Object}
 */
async function trySendEmails(
    client: VercelPoolClient,
    outages: Array<QueryResultRow>,
    subscriptions: Array<QueryResultRow>
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
        let subInfo = ['null', null, ''].includes(sub.outageinfo) ? [] : JSON.parse(sub.outageinfo);

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
            const outageAddress = outage.address.toLowerCase();

            const locationMatches = subLocation && outageAddress.includes(subLocation);
            const coordsMatch = subCoords && coordIsInOutageZone(subCoords, outage.hull, outageCoords);

            const filteredSub = Object.keys(subInfo).length > 0 ? subInfo.filter((x: NotifOutageInfo) => {
                return x.id === outage.id;
            })[0] : {};

            const outageStatusChanged = filteredSub && filteredSub.status &&
                filteredSub.status.toLowerCase() !== outage.statustext.toLowerCase();
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
                    if (!!(filteredSub && filteredSub.status)) {
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
                await updateSubInfo(client, JSON.stringify(subInfo), sub.id);
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

    const client = await db.connect();

    const outagesList = await getOutages(client);

    // Early return if no outages have been reported
    if (outagesList.outages.rowCount === 0) {
        client.release();

        return new Response(
            JSON.stringify(
                {
                    'success': true,
                    'note': content['cron-no-outages'],
                }
            ), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
    }

    const outages = outagesList.outages.rows.filter((outage) => {
        // Remove outages whose scheduled start date is more than seven days away
        const currentDate = new Date();
        const currentTime = currentDate.getTime() / 1000;

        const outageStartDateTime = new Date(outage.shutdowndatetime).getTime() / 1000;

        return outageStartDateTime - currentTime <= 86400 * 7;
    });

    // Manipulate outage fields (TODO have this and section in /getoutages route be one function)
    for (const outage of outages) {
        outage.hull = outage.hull ? JSON.parse(outage.hull) : [];

        // Convert shutdowndate to a string
        const year = outage.shutdowndate.getFullYear();
        const month = outage.shutdowndate.getMonth() + 1;
        const day = outage.shutdowndate.getDate();
        outage.shutdowndate = `${day}/${month}/${year}`;

        // Convert originalshutdowndate to a string
        if (outage.originalshutdowndate) {
            const year = outage.originalshutdowndate.getFullYear();
            const month = outage.originalshutdowndate.getMonth() + 1;
            const day = outage.originalshutdowndate.getDate();
            outage.originalshutdowndate = `${day}/${month}/${year}`;
        }

        outage.shutdownperiods = [
            {
                start: outage.shutdownperiodstart,
                end: outage.shutdownperiodend,
            }
        ];

        outage.originalshutdownperiods = [
            {
                start: outage.originalshutdownperiodstart,
                end: outage.originalshutdownperiodstart,
            }
        ];

        delete outage.shutdownperiodstart;
        delete outage.shutdownperiodend;
        delete outage.originalshutdownperiodstart;
        delete outage.originalshutdownperiodstart;
    }

    console.log('Fetched outages');

    const notifSubs = await getNotifSubs(client);
    const subscriptions = notifSubs.subs.rows;

    // Early return if there are no active subscriptions
    if (notifSubs.subs.rowCount === 0) {
        client.release();

        return new Response(JSON.stringify({ 'success': true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    console.log('Fetched subscriptions');

    const emailCount = await trySendEmails(client, outages, subscriptions);

    console.log(`Emails sent: ${emailCount}`);

    client.release();

    return new Response(JSON.stringify({ 'success': true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
