/* eslint-disable max-len */
import { OutageData } from '../lib/definitions';

export default function NotificationEmail(
    {
        notifSubId,
        outage,
        startTime,
        endTime
    }:
    {
        notifSubId: string;
        outage: OutageData;
        startTime: string,
        endTime: string
    }
) {
    console.log(notifSubId, startTime, endTime);

    // TODO different email for when the outage status has changed (to Postponed/Cancelled)
    return (
        `<div style="background-color: #dbddde: font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif>
            <div style="margin: 0 auto; background-color: #fff; overflow: hidden;">
                <div style="padding: 0 12px;">
                    <div style="color: red; font-size: 20px; line-height: 28px; font-weight: 700;">Counties Power Outages</div>
                    <div style="font-size: 14px; line-height: 22px;">There is a upcoming planned power outage which may be in the location you subscribed to notifications for.</div>
                </div>

                <div style="padding: 0 12px;">
                    <div style="font-size: 14px; line-height: 22px;"><b>Outage ID:</b> ${outage.id}</div>
                    <div style="font-size: 14px; line-height: 22px;"><b>Status:</b> ${outage.statustext}</div>
                    <div style="font-size: 14px; line-height: 22px;"><b>Location:</b> ${outage.address}</div>
                    <div style="font-size: 14px; line-height: 22px;"><b>Date:</b> ${outage.shutdowndate}</div>
                    <div style="font-size: 14px; line-height: 22px;"><b>Start Time:</b> ${startTime}</div>
                    <div style="font-size: 14px; line-height: 22px;"><b>End Time:</b> ${endTime}</div>
                </div>

                {/* TODO add link/functionality to view the outage w/o messing with the search params functionality */}
                <div style="padding: 0 12px;">
                    <div style="font-size: 14px; line-height: 22px;">To unsubscribe from these notifications, click <a href='https://outages.ryanherkt.com/unsubscribe?id=${notifSubId}'}>here</a>.</div>
                </div>
            </div>
        </div>`
    );
}
