'use client';

import { OutageData } from '../../lib/definitions';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LatestInfo from '../latest-info';
import { useState } from 'react';
import { getOutageSections } from '../../lib/outagesections';
import OutageStatus from './outage-status';
import CustomIcon from '../custom-icon';
import OutageOverlay from './outage-overlay';

export default function OutageCard({ data }: { data: OutageData; }) {
    const { id, address, statusText, latestInformation } = data;

    const [showContents, setShowContents] = useState(true);
    const outageSections = getOutageSections(false, true, data);

    const [hideOverlay, setHideOverlay] = useState(true);
    const showOutageOverlay = () => {
        setHideOverlay(!hideOverlay);
        document.querySelector('body')?.classList.toggle('no-scroll', hideOverlay);
    };

    const cardClasses = 'flex md:flex-row md:justify-between gap-2 flex-col text-lg font-normal';

    return (
        <>
            <div className='flex flex-col gap-4 shrink-0 p-4 rounded-lg border border-gray-700' >
                <div className='flex flex-row justify-between'>
                    <div
                        key={id}
                        onClick={
                            () => {
                                showOutageOverlay();
                            }
                        }
                        className="text-2xl font-semibold hover:text-red-400 cursor-pointer"
                    >
                        {address}
                    </div>
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
                    <div className={`${cardClasses} md:items-center`}>
                        <div className="flex flex-row gap-2">
                            <InformationCircleIcon className="w-7" />
                            <span className="font-semibold">Status</span>
                        </div>
                        <OutageStatus
                            className="font-medium px-2 py-1 rounded text-center"
                            statusText={statusText}
                            overrideBg={false}
                        />
                    </div>
                    {
                        outageSections.map((section) => {
                            const { key, icon, title, value } = section;

                            return (
                                <div
                                    key={key}
                                    className={`${cardClasses}`}
                                >
                                    <div className="flex flex-row gap-2">
                                        <CustomIcon icon={icon} iconClass={'w-7'} />
                                        <span className="font-semibold">{title}</span>
                                    </div>
                                    <span className={ clsx({ 'line-through': key === 'postponed-date' }) }>
                                        {value}
                                    </span>
                                </div>
                            );
                        })
                    }
                    <LatestInfo latestInformation={latestInformation} />
                </div>
            </div>
            <OutageOverlay data={data} hidden={hideOverlay} closeCallback={showOutageOverlay} />
        </>
    );
}
