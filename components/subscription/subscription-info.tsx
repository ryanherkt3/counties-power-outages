'use client';

import { BoltSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import NotifSubForm from '@/components/notifications/notif-sub-form';
import { getSubById } from '@/lib/actions';
import { useEffect, useState } from 'react';

export default function SubscriptionInfo({ id }: { id: string }) {
    const [getSub, setGetSub] = useState(true);
    const [sub, setSub] = useState();

    useEffect(() => {
        const getSubCb = async() => {
            const subscription = await getSubById(id);
            setSub(subscription);
            setGetSub(false);
        };

        if (getSub) {
            getSubCb();
        }
    });

    if (getSub) {
        return (
            <div className="flex flex-col px-4 py-6 page-min-height">
                <div className="flex flex-col gap-12 py-12 my-auto items-center">
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex items-center justify-center text-red-600">
                            <div className="dots" aria-hidden>
                                <span className="dot dot-1" />
                                <span className="dot dot-2" />
                                <span className="dot dot-3" />
                            </div>
                        </div>
                        <div className="text-xl text-center">Getting subscription information...</div>
                    </div>
                </div>
            </div>
        );
    }

    // Early return if no subscription is found, or no ID is provided
    if (!sub || !id) {
        const buttonClasses = 'bg-red-600 hover:bg-red-800 text-white text-lg p-4 rounded-xl w-fit p-3 cursor-pointer';

        return (
            <div className="flex flex-col px-4 py-6 page-min-height">
                <div className="flex flex-col gap-12 py-12 my-auto items-center">
                    <div className="flex flex-col gap-6 items-center">
                        <BoltSlashIcon className="w-20 text-red-600" />
                        <div className="text-xl text-center">Could not find the requested subscription</div>
                    </div>
                    <div className="flex flex-row gap-8 items-center">
                        <Link href="/outages" className={buttonClasses}>Outages</Link>
                        <Link href="/notifications" className={buttonClasses}>Notifications</Link>
                    </div>
                </div>
            </div>
        );
    }

    const { lat, lng, location, email, datesubscribed } = sub;

    const notifFormValues = {
        id: id,
        latitude: lat,
        longtitude: lng,
        location: location,
        email: email,
        hasCoordinates: !!(lat && lng),
        datesubscribed: datesubscribed,
    };

    return (
        <div className="flex flex-col gap-4 px-4 py-6 page-min-height">
            <div className="text-xl text-center">Manage your subscription</div>
            <NotifSubForm values={notifFormValues} onSubPage={true} />
        </div>
    );
}
