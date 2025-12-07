'use client';

import LatestInfo from '@/components/latest-info';
import { getOutageSections } from '@/lib/outagesections';
import OutageStatus from '@/components/outage/outage-status';
import CustomIcon from '../custom-icon';
import clsx from 'clsx';
import { RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import { resetAfterView } from '@/state/outage-overlay-view/outageOverlayView';
import { useEffect, useState } from 'react';
import { update } from '@/state/no-scroll/noScroll';

export default function OutageOverlay() {
    const outageOverlayView = useSelector((state: RootState) => state.outageOverlayView.value);
    const dispatch = useDispatch();

    const { data } = outageOverlayView;

    const { statusText, address, latestInformation } = data;

    const outageSections = getOutageSections(true, false, data);

    const canSeeOverlay = outageOverlayView.cardClickShow || outageOverlayView.isVisible === 'Open';

    const [embedLink, setEmbedLink] = useState<string | null>(null);
    useEffect(() => {
        // Set the no-scroll class for the document body as appropriate
        dispatch(update(outageOverlayView.data.address));

        if (outageOverlayView.data.address) {
            const { lat: outageLat, lng: outageLng } = outageOverlayView.data;
            setEmbedLink(
                `https://maps.google.com/maps?q=${outageLat.toString()},${outageLng.toString()}&hl=en&z=16&output=embed`
            );
        }
        else {
            setEmbedLink(null);
        }
    }, [outageOverlayView]);

    return (
        <div
            className={
                clsx(
                    `fixed flex flex-col gap-8 px-4 py-6 text-center
                    top-0 left-0 bottom-0 overflow-y-auto w-full h-full z-20
                    bg-linear-to-b from-red-200 to-slate-500`,
                    {
                        'hidden': !canSeeOverlay
                    }
                )
            }
        >
            <div className="flex flex-row gap-8 justify-between items-center">
                <div className="text-2xl font-semibold text-black grow text-center">{address}</div>
                <button onClick={
                    () => {
                        dispatch(resetAfterView());
                    }
                }>
                    <CustomIcon icon={'XMarkIcon'} iconClass={'w-10 cursor-pointer hover:text-black/60'} />
                </button>
            </div>
            <OutageStatus
                className="text-xl p-3 font-semibold rounded-xl"
                statusText={statusText}
                overrideBg={false}
            />
            <LatestInfo latestInformation={latestInformation} />
            <div className="flex md:flex-row md:justify-between flex-col gap-4">
                {
                    outageSections.map((section) => {
                        const { key, title, value } = section;

                        return (
                            <div
                                key={key}
                                className='flex md:flex-col gap-4 flex-row justify-between text-lg font-normal'
                            >
                                <span className="font-semibold text-left">{title}</span>
                                {
                                    typeof value === 'string' ? <span>{value}</span> : null
                                }
                            </div>
                        );
                    })
                }
            </div>
            {
                embedLink ?
                    <iframe className="self-center map-size" src={embedLink} width="80%" loading="lazy"></iframe> :
                    null
            }
        </div>
    );
}
