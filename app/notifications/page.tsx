
import Search from '../../components/search';
import NotifSubForm from '../../components/notif-sub-form';
import { Metadata } from 'next';
import { getSubscriptions } from '../../lib/actions';
import { NotificationSub, OutageData } from '../../lib/definitions';
import NotificationCard from '../../components/notif-sub-card';
import clsx from 'clsx';
import { coordIsInOutageZone, getActiveOutages } from '../../lib/utils';
import content from './../content.json';

export const metadata: Metadata = {
    title: 'Notifications | Counties Power Outages App',
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
                    key: 'how-notifs-work-1',
                    content: content['how-notifs-work-1']
                },
                {
                    key: 'how-notifs-work-2',
                    content: content['how-notifs-work-1']
                },
            ],
            note: null,
        },
        {
            key: 'subscribe-with-coords',
            title: 'How to subscribe to outages in your area (with coordinates)',
            listItems: [
                {
                    key: 'subscribe-with-coords-1',
                    content: content['subscribe-with-coords-1']
                },
                {
                    key: 'subscribe-with-coords-2',
                    content: content['subscribe-with-coords-2']
                },
                {
                    key: 'subscribe-with-coords-3',
                    content: content['subscribe-with-coords-3']
                },
                {
                    key: 'subscribe-with-coords-4',
                    content: content['subscribe-with-coords-4']
                }
            ],
            note: null,
        },
        {
            key: 'subscribe-without-coords',
            title: 'How to subscribe to outages in your area (without coordinates)',
            listItems: [
                {
                    key: 'subscribe-without-coords-1',
                    content: content['subscribe-without-coords-1']
                },
                {
                    key: 'subscribe-without-coords-2',
                    content: content['subscribe-without-coords-2']
                }
            ],
            note: null,
        },
        {
            key: 'unsubscribe',
            title: 'How to unsubscribe',
            listItems: [
                {
                    key: 'unsubscribe-1',
                    content: content['unsubscribe-1']
                },
                {
                    key: 'unsubscribe-2',
                    content: content['unsubscribe-2']
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
                                            if (listItem.content.includes('${mapsLink}')) {
                                                return (
                                                    <li key={listItem.key}>
                                                        {listItem.content.replace('${mapsLink}', '')} {mapsLink}
                                                    </li>
                                                );
                                            }

                                            return (
                                                <li key={listItem.key}>{listItem.content}</li>
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
