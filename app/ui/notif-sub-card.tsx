'use client';

import { AtSymbolIcon, CalendarIcon, MapPinIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { NotificationSub } from "../lib/definitions";
import { useState } from "react";
import clsx from "clsx";
import { sendEmailNotification } from '../lib/actions';

export default function NotificationCard({ data }: { data: NotificationSub; }) {
    const [showContents, setShowContents] = useState(true);

    const { lat, lng, datesubscribed, email } = data;
    const cardSections = [
        {
            key: 'email',
            icon: 'AtSymbolIcon',
            title: 'Email',
            value: email
        },
        {
            key: 'coordinates',
            icon: 'MapPinIcon',
            title: 'Coordinates',
            value: `${lat}, ${lng}`
        },
        {
            key: 'date-subbed',
            icon: 'CalendarIcon',
            title: 'Date Subscribed',
            value: datesubscribed
        }
    ];

    return (
        <div className='flex flex-col gap-4 shrink-0 p-4 rounded-lg border border-gray-700' >
            <div className='flex flex-row justify-between'>
                <div className="text-2xl font-semibold">{data.outagename}</div>
                <div className="cursor-pointer" onClick={
                    () => setShowContents(!showContents)
                }>
                    {
                        getPMIcon(showContents)
                    }
                </div>
            </div>

            <div className={ 
                clsx(
                    'flex flex-col gap-4 shrink-0',
                    { 'hidden': !showContents }
                ) 
            }>
                {
                    cardSections.map((section) => {
                        return (
                            <div 
                                key={section.key} 
                                className='flex md:flex-row md:justify-between gap-2 flex-col text-lg font-normal'
                            >
                                <div className="flex flex-row gap-2">
                                    {
                                        getSectionIcon(section.icon)
                                    }
                                    <span className="font-semibold">{section.title}</span>
                                </div>
                                <span>{section.value}</span>
                            </div>
                        );
                    })
                }
            </div>

            {/* TODO delete individual outage from DB and re-search */}
            <button 
                className={
                    clsx(
                        'flex flex-row gap-2 bg-red-600 hover:bg-red-800 text-white rounded-xl w-fit p-3',
                        {
                            'mt-4': showContents
                        }
                    )
                }
                onClick={
                    () => {
                        console.log('remove notif');
                    }
                }
            >
                <TrashIcon className="w-7"></TrashIcon>
                <span>Unsubscribe</span>
            </button>
        </div>
    );
}

function getPMIcon(showContents: boolean) {
    if (showContents) {
        return <MinusIcon className="w-8" />;
    }

    return <PlusIcon className="w-8" />;
}

function getSectionIcon(icon: string) {
    if (icon === 'AtSymbolIcon') {
        return <AtSymbolIcon className="w-7" />;
    }
    if (icon === 'CalendarIcon') {
        return <CalendarIcon className="w-7" />;
    }
    if (icon === 'MapPinIcon') {
        return <MapPinIcon className="w-7" />;
    }

    return null;
}
