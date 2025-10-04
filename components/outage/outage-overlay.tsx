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

export default function OutageOverlay() {
    const layoutClasses = 'fixed flex flex-col gap-8';
    const positionScrollClasses = 'top-0 left-0 bottom-0 overflow-y-auto';

    const outageOverlayView = useSelector((state: RootState) => state.outageOverlayView.value);
    const dispatch = useDispatch();

    const { data } = outageOverlayView;

    const { statustext, address, latestinformation } = data;

    const outageSections = getOutageSections(true, false, data);

    const canSeeOverlay = outageOverlayView.cardClickShow || outageOverlayView.isVisible === 'Open';

    // document.querySelector('body')?.classList.toggle('no-scroll', canSeeOverlay);

    const [embedLink, setEmbedLink] = useState<string | null>(null);
    useEffect(() => {
        if (outageOverlayView.data.address) {
            const { lat: outageLat, lng: outageLng } = outageOverlayView.data;
            setEmbedLink(`https://maps.google.com/maps?q=${outageLat},${outageLng}&hl=en&z=16&output=embed`);
        }
        else {
            setEmbedLink(null);
        }
    }, [outageOverlayView]);

    return (
        <div
            className={
                clsx(
                    `${layoutClasses} px-4 py-6 text-center ${positionScrollClasses} w-[100%] h-[100%] z-20 bg-white`,
                    {
                        'hidden': !canSeeOverlay
                    }
                )
            }
        >
            <div className="flex flex-row gap-2 justify-between">
                <div className="text-2xl font-semibold text-black">{address}</div>
                <button onClick={
                    () => {
                        dispatch(resetAfterView());
                    }
                }>
                    <CustomIcon icon={'XMarkIcon'} iconClass={'w-7 cursor-pointer'} />
                </button>
            </div>
            <OutageStatus
                className="text-xl p-3 font-semibold rounded-xl"
                statusText={statustext}
                overrideBg={false}
            />
            <LatestInfo latestInformation={latestinformation} />
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
                                <span>{value}</span>
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
