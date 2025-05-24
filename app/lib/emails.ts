import { Resend } from 'resend';
import NotificationEmail from '../ui/notif-email';
import { NotificationSub, OutageData } from './definitions';

export async function sendEmailNotification(notifSub: NotificationSub, outage: OutageData) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const notifSubId = notifSub.id;

        await resend.emails.send({
            from: 'Counties Power Outages <notifications@outages.ryanherkt.com>',
            to: notifSub.email,
            subject: `Upcoming Power Outage - ${notifSub.location}`,
            react: NotificationEmail({notifSubId: notifSubId, outage: outage})
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
