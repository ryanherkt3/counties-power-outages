/* eslint-disable max-len */
import Search from '../ui/search';
import NotifSubForm from '../ui/notif-sub-form';
import { Metadata } from 'next';
import { getSubscriptions } from '../lib/actions';
import { NotificationSub, OutageData } from '../lib/definitions';
import NotificationCard from '../ui/notif-sub-card';
import clsx from 'clsx';
import { coordIsInOutageZone, getActiveOutages } from '../lib/utils';

export const metadata: Metadata = {
    title: 'Notifications',
};

type SearchParams = Promise<{
    email: string | undefined
}>

export default async function NotificationsPage(props: {
    searchParams: SearchParams
}) {
    const searchParams = await props.searchParams;
    const query = searchParams.email || '';

    const subscriptions = await getSubscriptions(query);
    const outages = await getActiveOutages();

    const mapsLink = (
        <span>
            <a
                className="visited:text-purple-500 hover:text-blue-500 text-blue-500"
                href="https://www.google.com/maps/"
                target="_blank"
            >
                Google Maps
            </a>.</span>
    );

    const notifsInfo = [
        {
            key: 'how-notifs-work',
            title: 'How this notification system works',
            listItems: [
                {
                    key: 'hnw-step-1',
                    text: 'Every day, at 12PM NZ time, the system checks if an outage is planned in the area you subscribed to within the next seven days.'
                },
                {
                    key: 'hnw-step-2',
                    text: 'If one is, you will receive an email with details about the outage - when it is, the start and end times, and how many customers are affected. You may also receive future emails if the status of the outage changes.'
                },
            ],
            note: null,
        },
        {
            key: 'subscribe-with-coords',
            title: 'How to subscribe to outages in your area (with coordinates)',
            listItems: [
                {
                    key: 'sub-step-coordy-1',
                    text: 'Search for your address on ${mapsLink}'
                },
                {
                    key: 'sub-step-coordy-2',
                    text: 'Right click your address and click the first option to copy the coordinates.'
                },
                {
                    key: 'sub-step-coordy-3',
                    text: 'In the "Subscribe to Outages" form below, ensure the "Yes" option in the question is clicked, and paste the coordinates in the form below with your email address.'
                },
                // TODO implement confirmation email, use same template as notif-email
                // Move both email templates to a new folder called email-templates
                // {
                //     key: 'sub-step-coordy-4',
                //     text: 'You should then get a confirmation email with details of your notification.'
                // }
            ],
            note: null,
        },
        {
            key: 'subscribe-without-coords',
            title: 'How to subscribe to outages in your area (without coordinates)',
            listItems: [
                {
                    key: 'sub-step-coordn-1',
                    text: 'In the "Subscribe to Outages" form below, ensure the "No" option in the question is clicked and enter your street address in the "Location" field.'
                },
                // {
                //     key: 'sub-step-coordn-2',
                //     text: 'You should then get a confirmation email with details of your notification.'
                // }
            ],
            note: null,
        },
        {
            // TODO add support for un-subbing via email
            // By link: /notifications?email={email-address} or create a dedicated page
            key: 'unsubscribe',
            title: 'How to unsubscribe',
            listItems: [
                {
                    key: 'unsub-step-1',
                    text: 'In the "Active Notifications" section below, search for any notification subscriptions associated to your email address.'
                },
                {
                    key: 'unsub-step-2',
                    text: 'Click the "Unsubscribe" button in the subscription you want to unsubscribe from.'
                }
            ],
            note: null,
        },
    ];

    // Create empty object as only new subscriptions get created on this page
    const notifFormValues = {
        id: '',
        latitude: null,
        longtitude: null,
        location: '',
        email: '',
        hasCoordinates: true,
        datesubscribed: '',
    };

    return (
        <div className="flex flex-col gap-8 px-4 py-6 page-min-height">
            <div className="flex flex-col gap-4">
                {
                    notifsInfo.map((item) => {
                        return (
                            <div
                                key={item.key}
                                className="flex flex-col gap-2"
                            >
                                <div className="text-lg font-semibold">{item.title}</div>
                                <ol type="1" className="list-decimal list-inside">
                                    {
                                        item.listItems.map((listItem) => {
                                            if (listItem.text.includes('${mapsLink}')) {
                                                return (
                                                    <li key={listItem.key}>
                                                        {listItem.text.replace('${mapsLink}', '')} {mapsLink}
                                                    </li>
                                                );
                                            }

                                            return (
                                                <li key={listItem.key}>
                                                    {listItem.text}
                                                </li>
                                            );
                                        })
                                    }
                                    {
                                        getNote(item.note)
                                    }
                                </ol>
                            </div>
                        );
                    })
                }
            </div>

            <div className="flex flex-col gap-4 relative">
                <div className="text-xl font-semibold">Active Subscriptions ({subscriptions.length})</div>
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
                        const subCoords = {
                            lat: subscription.lat,
                            lng: subscription.lng
                        };

                        let outageIds = '';
                        outages.map((outage: OutageData) => {
                            const outageCoords = {
                                lat: outage.lat,
                                lng: outage.lng
                            };

                            const { location } = subscription;
                            const locationMatches = location && outage.address.includes(location);

                            const coordsMatch = subCoords && coordIsInOutageZone(subCoords, outage.hull, outageCoords);

                            if (coordsMatch || locationMatches) {
                                outageIds = `${outageIds.length ? `${outageIds},` : ''}${outage.id}`;
                            }
                        });

                        return (
                            <NotificationCard
                                key={subscriptions.indexOf(subscription)}
                                data={subscription}
                                plannedOutages={outageIds}
                            />
                        );
                    })
                }
            </div>

            <div className="flex flex-col gap-4">
                <div className="text-xl font-semibold">Subscribe to Outages</div>
                <NotifSubForm values={notifFormValues} onSubPage={false} />
            </div>
        </div>
    );
}

function getNote(itemNote: string | null) {
    if (itemNote) {
        return <span><span className="font-semibold">Note:</span> {itemNote}</span>;
    }

    return null;
}
