/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

// TODO add function doc comments
import { db } from '@vercel/postgres';
import { sendEmailNotification } from '@/app/lib/emails';
import { NotificationSub, OutageData } from '@/app/lib/definitions';
import { coordIsInOutageZone } from '@/app/lib/utils';
import { NextRequest } from 'next/server';

async function getOutages(client: { sql: any; }) {
    // Get all notification subscriptions from DB
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

async function getNotifSubs(client: { sql: any; }) {
    // Get all notification subscriptions from DB
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

async function updateSubscriptionEmailSent(client: { sql: any; }, outageInfo: string, id: string) {
    // Update the outageInfo for the notification which had an email sent
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

async function trySendEmails(client: { sql: any; }, outages: Array<any>, subscriptions: Array<NotificationSub>) {
    let totalEmailsSent = 0;

    for (const sub of subscriptions) {
        let emailsSentForSub = 0;

        const subCoords = {
            lat: sub.lat,
            lng: sub.lng
        };

        // Check sub.outageinfo to see if an email has been sent within the last 7 days, and also if
        // the outage status has change compared to last time - if so send email anyway
        const subInfo = ['null', ''].includes(sub.outageinfo) ? [] : JSON.parse(sub.outageinfo);

        for (const outage of outages) {
            const outageCoords = {
                lat: outage.lat,
                lng: outage.lng
            };

            const subLocation = sub.location ? sub.location.toLowerCase() : '';
            const outageAddress = outage.address.toLowerCase();

            const locationMatches = subLocation && outageAddress.includes(subLocation);
            const coordsMatch = subCoords && coordIsInOutageZone(subCoords, outage.hull, outageCoords);

            const filteredSub = Object.keys(subInfo).length > 0 ? subInfo.filter((x: OutageData) => {
                return x.id === outage.id;
            })[0] : {};

            let shouldSendEmail = coordsMatch || locationMatches;

            if (shouldSendEmail && !!(filteredSub && filteredSub.status)) {
                if (filteredSub.status.toLowerCase() === outage.statustext.toLowerCase() && filteredSub.emailSent) {
                    const currentDate = new Date();
                    const currentTime = currentDate.getTime() / 1000;

                    shouldSendEmail = currentTime - filteredSub.emailSent >= 86400 * 7;
                }
            }

            if (shouldSendEmail) {
                try {
                    await sendEmailNotification(sub, outage);
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
                    return totalEmailsSent;
                }
            }
        }

        try {
            if (emailsSentForSub > 0) {
                await updateSubscriptionEmailSent(client, JSON.stringify(subInfo), sub.id);
            }
        }
        catch (error) {}
    }

    return totalEmailsSent;
}

// TODO try/catch blocks, or if statements (e.g. if (outagesList.outages)) to ensure we only proceed
// if the data we want is actually fetched
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

    const outages = outagesList.outages.rows.filter((outage: OutageData) => {
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

    console.log('Fetched subscriptions');

    const emailCount = await trySendEmails(client, outages, subscriptions);

    console.log(`Emails sent: ${emailCount}`);

    client.release();

    return new Response(JSON.stringify({ 'success': true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
