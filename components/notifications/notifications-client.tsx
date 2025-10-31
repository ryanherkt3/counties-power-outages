'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import content from '../../app/content.json';
import NotifSubChallengeOverlay from '@/components/notifications/notif-sub-challenge-overlay';
import NotifSubForm from '@/components/notifications/notif-sub-form';
import NotifSubs from '@/components/notifications/notif-subs';
import Search from '@/components/search';
import { getSubscriptions } from '@/lib/actions';
import { ChallengeOutcome, ChallengeVariables } from '@/lib/definitions';
import { useState, useEffect } from 'react';

export default function NotificationsClient() {
    const email = useSearchParams().get('email') || '';
    const router = useRouter();

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

    const [challengeOutcome, setChallengeOutcome] = useState<ChallengeOutcome>('pending');
    const challengeCb = (outcome: ChallengeOutcome) => {
        if (outcome === 'failed') {
            // Remove the email parameter
            router.push('/notifications');
            router.refresh();
        }

        setChallengeOutcome(outcome);
    };

    const [subscriptions, setSubscriptions] = useState([]);
    useEffect(() => {
        const checkForSubs = async () => {
            const subs = await getSubscriptions(email);
            setSubscriptions(subs);

            setChallengeOutcome('pending');
        };

        checkForSubs();
    }, [email]);

    if (subscriptions.length && challengeOutcome === 'pending') {
        const challengeVariables: ChallengeVariables = { subIdentifier: 'email', subParam: email };

        return (
            <NotifSubChallengeOverlay
                onSubPage={false}
                stateUpdate={challengeCb}
                challengeVariables={challengeVariables}
            />
        );
    }

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
                                            if (listItem.content.includes('$mapsLink')) {
                                                return (
                                                    <li key={listItem.key}>
                                                        {listItem.content.replace('$mapsLink', '')} {mapsLink}
                                                    </li>
                                                );
                                            }

                                            return (
                                                <li key={listItem.key}>{listItem.content}</li>
                                            );
                                        })
                                    }
                                    {
                                        item.note ?
                                            <span><span className="font-semibold">Note:</span>{item.note}</span> :
                                            null
                                    }
                                </ol>
                            </div>
                        );
                    })
                }
            </div>

            <div className="flex flex-col gap-4 relative">
                <div className="text-xl font-semibold">Active Subscriptions</div>
                <Search placeholder="Enter your email address"/>
            </div>

            {
                challengeOutcome === 'success' ? <NotifSubs subscriptions={subscriptions} /> : null
            }

            <div className="flex flex-col gap-4">
                <div className="text-xl font-semibold">Subscribe to Outages</div>
                <NotifSubForm values={notifFormValues} onSubPage={false} />
            </div>
        </div>
    );
}
