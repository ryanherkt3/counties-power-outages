'use client';

import Link from "next/link";
import { OutageData } from "../lib/definitions";
import { getTimesAndActiveOutage } from "../lib/utils";
import { CalendarIcon, ClockIcon, InformationCircleIcon, MinusIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import getLatestInfo from "./latestinfo";
import { useState } from "react";

export default function OutageCard({ data }: { data: OutageData; }) {
    const timesAndActiveOutage = getTimesAndActiveOutage(data.shutdownTime1, data.ShutdownDateTime);

    const shutdownTimes = timesAndActiveOutage.times;
    const outageIsPostponed = data.statusText === 'Postponed';
    const [showContents, setShowContents] = useState(true);

    // Dynamically create outage section segments
    const outageSections = outageIsPostponed ? 
        [
            {
                key: 'postponed-date',
                icon: 'CalendarIcon',
                title: 'Original Date',
                value: data.originalShutdownDate,
            }
        ]:
        [];

    outageSections.push({
        key: 'outage-date',
        icon: 'CalendarIcon',
        title: `${outageIsPostponed ? 'New ' : ''}Date`,
        value: data.shutdownDate,
    });
    outageSections.push({
        key: 'outage-start',
        icon: 'ClockIcon',
        title: `${outageIsPostponed ? 'New ' : ''}Start Time`,
        value: shutdownTimes.startTime,
    });
    outageSections.push({
        key: 'outage-end',
        icon: 'ClockIcon',
        title: `${outageIsPostponed ? 'New ' : ''}End Time`,
        value: shutdownTimes.endTime,
    });


    const outageHref = `outage/${data.id}`;

    return (
        <div className='flex flex-col gap-4 shrink-0 p-4 rounded-lg border border-gray-700' >
            <div className='flex flex-row justify-between'>
                <Link 
                    key={data.id}
                    href={outageHref}
                    className="text-2xl font-semibold hover:text-red-400"
                >
                    {data.address}
                </Link>
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
                <div className='flex flex-row justify-between items-center text-lg font-normal'>
                    <div className="flex flex-row gap-2">
                        <InformationCircleIcon className="w-7" />
                        <span className="font-semibold">Status</span>
                    </div>
                    <span 
                        className={
                            clsx(
                                'font-medium px-2 py-1 rounded',
                                {
                                    'bg-green-400': data.statusText === "Active",
                                    'bg-blue-500 text-white': data.statusText === "Scheduled",
                                    'bg-red-400 text-white': data.statusText === "Postponed",
                                    'bg-orange-400': data.statusText === "Cancelled",
                                },
                            )
                        }>
                        {data.statusText.toUpperCase()}
                    </span>
                </div>
                {
                    outageSections.map((section) => {
                        return (
                            <div 
                                key={section.key} 
                                className='flex flex-row justify-between text-lg font-normal'
                            >
                                <div className="flex flex-row gap-2">
                                    {
                                        getCardIcon(section.icon)
                                    }
                                    <span className="font-semibold">{section.title}</span>
                                </div>
                                <span className={ clsx({ 'line-through': section.key === 'postponed-date' }) }>
                                    {section.value}
                                </span>
                            </div>
                        );
                    })
                }
                <div className='flex flex-row justify-between text-lg font-normal'>
                    <div className="flex flex-row gap-2">
                        <UserIcon className="w-7" />
                        <span className="font-semibold">Customers Affected</span>
                    </div>
                    <span>{data.affectedCustomers}</span>
                </div>
                {
                    getLatestInfo(data.latestInformation)
                }
            </div>            
        </div>
    );
}

function getPMIcon(showContents: boolean) {
    if (showContents) {
        return <MinusIcon className="w-8" />
    }

    return <PlusIcon className="w-8" />
}

function getCardIcon(icon: string) {
    if (icon === 'CalendarIcon') {
        return <CalendarIcon className="w-7" />
    }
    if (icon === 'ClockIcon') {
        return <ClockIcon className="w-7" />
    }

    return null;
}
