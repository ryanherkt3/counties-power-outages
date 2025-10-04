
'use client';

import {
    AtSymbolIcon, BoltIcon, CalendarIcon, MapPinIcon, MinusIcon, PlusIcon, TrashIcon
} from '@heroicons/react/24/outline';
import { NotificationSub } from '../../lib/definitions';
import { useState } from 'react';
import clsx from 'clsx';
import { getCardSections } from '../../lib/outagesections';
import { deleteSubscription } from '../../lib/actions';
import Link from 'next/link';

export default function NotificationCard(
    {
        data,
        plannedOutages,
        removeSubCb
    } :
    {
        data: NotificationSub;
        plannedOutages: string;
        removeSubCb: Function;
    }
) {
    const [showContents, setShowContents] = useState(true);
    const cardSections = getCardSections(data);
    const outagesArray = plannedOutages.length ? plannedOutages.split(',') : [];

    const unsubCSS = 'flex flex-row gap-2 bg-red-600 hover:bg-red-800 text-white rounded-xl w-fit p-3 cursor-pointer';

    return (
        <div className='flex flex-col gap-4 shrink-0 p-4 rounded-lg border border-gray-700' >
            <div className='flex flex-row justify-between'>
                <div className="text-2xl font-semibold">{data.location}</div>
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
                                <div className={
                                    clsx(
                                        'flex flex-row gap-2',
                                        {
                                            'items-center': section.key === 'location-planned-outage'
                                        }
                                    )
                                }>
                                    {
                                        getSectionIcon(section.icon)
                                    }
                                    <span className="font-semibold">{section.title}</span>
                                </div>
                                <div className="flex flex-col">
                                    {
                                        section.key === 'location-planned-outage' ?
                                            (
                                                outagesArray.length > 0 ?
                                                    outagesArray.map((outage) => {
                                                        return (
                                                            <Link
                                                                key={outage}
                                                                href={`/outages?outage=${outage}`}
                                                                className='hover:text-red-400 text-red-600'
                                                            >
                                                                {outage}
                                                            </Link>
                                                        );
                                                    }) :
                                                    <span>None</span>
                                            ) :
                                            <span>{section.value}</span>
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <button
                className={
                    clsx(
                        unsubCSS,
                        {
                            'mt-4': showContents
                        }
                    )
                }
                onClick={
                    () => {
                        removeSubCb();
                        deleteSubscription(data.id);
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
    if (icon === 'BoltIcon') {
        return <BoltIcon className="w-7" />;
    }

    return null;
}
