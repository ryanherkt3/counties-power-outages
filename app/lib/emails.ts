'use server';

import { Resend } from 'resend';
import NotificationEmail from '../ui/notif-email';
import { NotificationSub } from './definitions';

// TODO integrate with cron job
export async function sendEmailNotification(data: NotificationSub) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        // TODO
        // 1. tidy up subject
        // 2. update subscription info when done
        await resend.emails.send({
            from: 'Counties Power Outages <notifications@outages.ryanherkt.com>',
            to: data.email,
            subject: 'Upcoming Power Outage',
            react: NotificationEmail({data})
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
