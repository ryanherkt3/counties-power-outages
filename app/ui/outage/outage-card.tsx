'use client';

import Link from 'next/link';
import { OutageData } from '../../lib/definitions';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LatestInfo from '../latest-info';
import { useState } from 'react';
import { getOutageSections } from '../../lib/outagesections';
import OutageStatus from './outage-status';
import CustomIcon from '../custom-icon';

export default function OutageCard({ data }: { data: OutageData; }) {
    const [showContents, setShowContents] = useState(true);
    const outageSections = getOutageSections(false, true, data);
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
                    <CustomIcon icon={showContents ? 'MinusIcon' : 'PlusIcon' } iconClass={'w-8'} />
                </div>
            </div>

            <div className={
                clsx(
                    'flex flex-col gap-4 shrink-0',
                    { 'hidden': !showContents }
                )
            }>
                <div className='flex md:flex-row md:justify-between gap-2 md:items-center flex-col text-lg font-normal'>
                    <div className="flex flex-row gap-2">
                        <InformationCircleIcon className="w-7" />
                        <span className="font-semibold">Status</span>
                    </div>
                    <OutageStatus
                        className="font-medium px-2 py-1 rounded text-center"
                        statusText={data.statusText}
                        overrideBg={false}
                    />
                </div>
                {
                    outageSections.map((section) => {
                        return (
                            <div
                                key={section.key}
                                className='flex md:flex-row md:justify-between gap-2 flex-col text-lg font-normal'
                            >
                                <div className="flex flex-row gap-2">
                                    <CustomIcon icon={section.icon} iconClass={'w-7'} />
                                    <span className="font-semibold">{section.title}</span>
                                </div>
                                <span className={ clsx({ 'line-through': section.key === 'postponed-date' }) }>
                                    {section.value}
                                </span>
                            </div>
                        );
                    })
                }
                <LatestInfo latestInformation={data.latestInformation} />
            </div>
        </div>
    );
}
