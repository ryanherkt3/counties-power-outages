import { Resend } from 'resend';
import NotificationEmail from '../ui/notif-email';
import { NotificationSub, OutageData } from './definitions';
import { getTimesAndActiveOutage } from './utils';

/**
 * Send the email notification using Resend
 *
 * @param {NotificationSub} notifSub subscription details
 * @param {OutageData} outage outage details
 * @param {string} oldStatus if the outage has had a status update
 * @returns {Response}
 */
export async function sendEmailNotification(notifSub: NotificationSub, outage: OutageData, oldStatus: string) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const notifSubId = notifSub.id;

        const shutdownPeriods = outage.shutdownperiods[0];
        const outageTimes = getTimesAndActiveOutage(shutdownPeriods.start, shutdownPeriods.end);
        const { startTime, endTime } = outageTimes.times;

        const notifEmailPayload = {
            notifSubId: notifSubId,
            outage: outage,
            startTime: startTime,
            endTime: endTime,
            oldStatus: oldStatus
        };

        const { data, error } = await resend.emails.send({
            from: 'Counties Power Outages <notifications@outages.ryanherkt.com>',
            to: notifSub.email,
            subject: `Upcoming Power Outage - ${notifSub.location}`,
            react: NotificationEmail(notifEmailPayload),
        });

        if (error) {
            console.log(error);
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}
