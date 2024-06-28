import Search from "../ui/search";
import NotifSubForm from "../ui/notif-sub-form";
import { Metadata } from "next";
import { getSubscriptions } from "../lib/actions";
import { NotificationSub } from "../lib/definitions";
import NotificationCard from "../ui/notif-sub-card";
import clsx from "clsx";

export const metadata: Metadata = {
    title: 'Notifications',
};

export default async function NotificationsPage({searchParams}: {
    searchParams?: {
        email?: string;
    };
}) {
    const query = searchParams?.email || '';
    const subscriptions = await getSubscriptions(query);
    
    const mapsLink = <a 
        className="visited:text-purple-500 hover:text-blue-500 text-blue-500"
        href="https://www.google.com/maps/"
        target="_blank"
    >
        Google Maps
    </a>;

    const notifsInfo = [
        {
            title: 'How this notification system works',
            listItems: [
                'Every day, at 12PM NZ time, the system checks if an outage is planned in the area you subscribed to',
                'If one is, you will receive an email with details about the outage - when it is, the start and end times, and how many customers are affected',
                'Emails will then be sent three and one days prior to the outage',
            ],
            note: null,
        },
        {
            title: 'How to subscribe to outages in your area',
            listItems: [
                'Search for your address on ${mapsLink}',
                'Right click your address and click the first option to copy the coordinates',
                'In the "Subscribe to Outages" form below, paste the coordinates in the form below with your email address',
                'You should then get a confirmation email with details of your notification',
            ],
            note: 'For the latitude, remove the minus sign from the input',
        },
        {
            // TODO add support for un-subbing via email
            // By link: /notifications?email={email-address} or create a dedicated page
            title: 'How to unsubscribe',
            listItems: [
                'In the "Active Notifications" section below, search for any notification subscriptions associated to your email address',
                'Click the "rubbish bin" icon next to the subscription you want to unsubscribe from',
            ],
            note: null,
        },
    ]
    
    return (
        <main className="flex flex-col gap-8 px-4 py-6 page-min-height">
            <div className="flex flex-col gap-4">
                {
                    notifsInfo.map((item) => {
                        return (
                            <div className="flex flex-col gap-2">
                                <div className="text-lg font-semibold">{item.title}</div>
                                <ol type="1" className="list-decimal list-inside">
                                    {
                                        item.listItems.map((listItem) => {
                                            if (listItem.includes('${mapsLink}')) {
                                                return (
                                                    <li>{listItem.replace('${mapsLink}', '')} {mapsLink}</li>
                                                )
                                            }

                                            return (
                                                <li>{listItem}</li>
                                            )
                                        })
                                    }
                                    {
                                        getNote(item.note)
                                    }
                                </ol>
                            </div>
                        )
                    })
                }
            </div>
            
            <div className="flex flex-col gap-4 relative">
                <div className="text-xl font-semibold">Active Notifications ({subscriptions.length})</div>
                <Search placeholder="Enter your email address"/>
            </div>

            <div 
                className={
                    clsx(
                        'flex flex-col gap-4',
                        {
                            'hidden': !subscriptions.length
                        }
                    )
                }
            >
                {
                    subscriptions.map((subscription: NotificationSub) => {
                        return <NotificationCard data={subscription} />
                    })
                }
            </div>

            <div className="flex flex-col gap-4">
                <div className="text-xl font-semibold">Subscribe to Outages</div>
                <NotifSubForm />
            </div>
        </main>
    );
}

function getNote(itemNote: string | null) {
    if (itemNote) {
        return (
            <div>
                <span className="font-semibold">Note:</span> {itemNote}
            </div>
        )
    }

    return null;
}