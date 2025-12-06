'use client';

import { Coordinate, NotificationSub, OutageData } from '@/lib/definitions';
import { coordIsInOutageZone } from '@/lib/utils';
import { getActiveOutages } from '@/lib/actions';
import NotificationCard from './notif-sub-card';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function NotifSubs({ subscriptions } : { subscriptions: Array<NotificationSub>; }) {
    const [subs, setSubs] = useState(subscriptions);
    const [show, setShow] = useState<boolean>(!!subscriptions);

    const removeSubCb = (subscription: NotificationSub) => {
        const indexToRemove = subs.indexOf(subscription);

        setSubs(subs.splice(indexToRemove, 1));
        setShow(!!subs.length);
    };

    useEffect(() => {
        setSubs(subscriptions);
        setShow(!!subscriptions);
    }, [subscriptions]);

    const [outages, setOutages] = useState<Array<OutageData>>([]);

    useEffect(() => {
        const getOutages = async () => {
            const outageList = await getActiveOutages();
            setOutages(outageList);
        };

        if (!outages.length) {
            getOutages();
        }
    });

    return (
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
                subs && subs.map((subscription: NotificationSub) => {
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
                        const locationMatches = location && outage.address && outage.address.includes(location);

                        const coordsMatch = subCoords && coordIsInOutageZone(subCoords, outage.hull as Coordinate[], outageCoords);

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
    );
}
