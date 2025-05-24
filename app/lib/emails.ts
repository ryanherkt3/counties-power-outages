import { Resend } from 'resend';
import NotificationEmail from '../ui/notif-email';
import { NotificationSub, OutageData } from './definitions';
import { getTimesAndActiveOutage } from './utils';

export async function sendEmailNotification(notifSub: NotificationSub, outage: OutageData) {
    console.log('about to send email');

    try {
        console.log('get resend key');

        const resend = new Resend(process.env.RESEND_API_KEY);
        const notifSubId = notifSub.id;

        console.log(resend, notifSubId, outage);
        console.log(outage.shutdownperiods);

        const shutdownPeriods = outage.shutdownperiods[0];
        const outageTimes = getTimesAndActiveOutage(shutdownPeriods.start, shutdownPeriods.end);
        const { startTime, endTime } = outageTimes.times;

        console.log(notifSubId, startTime, endTime);

        const { data, error } = await resend.emails.send({
            from: 'Counties Power Outages <notifications@outages.ryanherkt.com>',
            to: notifSub.email,
            subject: `Upcoming Power Outage - ${notifSub.location}`,
            react: NotificationEmail({notifSubId: notifSubId, outage: outage, startTime: startTime, endTime: endTime}),
        });

        console.log(data);

        if (error) {
            console.log(error);
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    }
    catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}
