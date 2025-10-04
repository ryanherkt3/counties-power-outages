'use client';

import { NotificationSub, OutageData } from '@/lib/definitions';
import { coordIsInOutageZone } from '@/lib/utils';
import NotificationCard from './notif-sub-card';
import clsx from 'clsx';
import { useState } from 'react';
import Search from '../search';

export default function NotifSubs(
    {
        subscriptions,
        outages
    } :
    {
        subscriptions: Array<NotificationSub>;
        outages: Array<OutageData>
    }
) {
    const [subs, setSubs] = useState(subscriptions);
    const [totalSubs, setTotalSubs] = useState(subs.length);
    const [show, setShow] = useState<boolean>(!!subs.length);

    const removeSubCb = (subscription: NotificationSub) => {
        const indexToRemove = subs.indexOf(subscription);

        setSubs(subs.splice(indexToRemove, 1));
        setShow(!!subs.length);
        setTotalSubs(subs.length);
    };

    return (
        <>
            <div className="flex flex-col gap-4 relative">
                <div className="text-xl font-semibold">Active Subscriptions ({totalSubs})</div>
                <Search placeholder="Enter your email address"/>
            </div>
            
            <div
                className={
                    clsx(
                        'flex flex-col gap-4',
                        {
                            'hidden': !show
                        }
                    )
                }
            >
                {
                    subs.map((subscription: NotificationSub) => {
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
                                removeSubCb={() => removeSubCb(subscription)}
                            />
                        );
                    })
                }
            </div>
        </>
    );
}
