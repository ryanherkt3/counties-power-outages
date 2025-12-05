'use client';

import { OutageData } from '../../lib/definitions';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LatestInfo from '../latest-info';
import { useState } from 'react';
import { getOutageSections } from '../../lib/outagesections';
import OutageStatus from './outage-status';
import CustomIcon from '../custom-icon';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '@/state/outage-overlay-view/outageOverlayView';
import { RootState } from '@/state/store';

export default function OutageCard({ data }: { data: OutageData; }) {
    const { id, address, statustext, latestinformation } = data;

    const [showContents, setShowContents] = useState(true);
    const outageSections = getOutageSections(false, true, data);

    const outageOverlayView = useSelector((state: RootState) => state.outageOverlayView.value);
    const dispatch = useDispatch();

    const cardClasses = 'flex md:flex-row md:justify-between gap-2 flex-col text-lg font-normal';

    return (
        <>
            <div
                className={
                    clsx(
                        'flex flex-col gap-4 shrink-0 p-4 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer',
                        {
                            'bg-green-400/40 hover:bg-green-400/55': statustext === 'Active',
                            'bg-blue-500/40 hover:bg-blue-500/55': statustext === 'Scheduled',
                            'bg-red-400/40 hover:bg-red-400/55': statustext === 'Postponed',
                            'bg-orange-400/40 hover:bg-orange-400/55': statustext === 'Cancelled',
                        },
                    )
                }
                onClick={
                    (e) => {
                        const clickedElement = e.target as HTMLElement;
                        if (!clickedElement.classList.contains('card-toggle')) {
                            dispatch(
                                update({ cardClickShow: true, isVisible: outageOverlayView.isVisible, data: data })
                            );
                        }
                    }
                }
            >
                <div className='flex flex-row justify-between'>
                    <div key={id} className='text-2xl font-semibold'>
                        {address}
                    </div>
                    <div className="cursor-pointer" onClick={
                        () => setShowContents(!showContents)
                    }>
                        <CustomIcon icon={showContents ? 'MinusIcon' : 'PlusIcon' } iconClass={'card-toggle w-8'} />
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
                            statusText={statustext}
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
                                    {
                                        typeof value === 'string' ?
                                            (
                                                <span className={ clsx({ 'line-through': key === 'postponed-date' }) }>
                                                    {value}
                                                </span>
                                            ) :
                                            null
                                    }
                                </div>
                            );
                        })
                    }
                    <LatestInfo latestInformation={latestinformation} />
                </div>
            </div>
        </>
    );
}
