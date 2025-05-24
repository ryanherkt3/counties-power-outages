import { Resend } from 'resend';
import { NotificationEmail } from '../ui/notif-email';
import { NotificationSub, OutageData } from './definitions';
import { getTimesAndActiveOutage } from './utils';
import { ReactNode } from 'react';

export async function sendEmailNotification(notifSub: NotificationSub, outage: OutageData) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const notifSubId = notifSub.id;

        const shutdownPeriods = outage.shutdownperiods[0];
        const outageTimes = getTimesAndActiveOutage(shutdownPeriods.start, shutdownPeriods.end);
        const { startTime, endTime } = outageTimes.times;

        await resend.emails.send({
            from: 'Counties Power Outages <notifications@outages.ryanherkt.com>',
            to: notifSub.email,
            subject: `Upcoming Power Outage - ${notifSub.location}`,
            // eslint-disable-next-line max-len
            react: (NotificationEmail({notifSubId: notifSubId, outage: outage, startTime: startTime, endTime: endTime}) as ReactNode)
        });
        return {
            error: null,
            success: true
        };
    }
    catch (error) {
        console.log(error);
        return {
            error: (error as Error).message,
            success: false
        };
    }
}
