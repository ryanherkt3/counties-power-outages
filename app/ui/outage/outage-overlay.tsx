'use client';

import LatestInfo from '@/app/ui/latest-info';
import { getOutageSections } from '@/app/lib/outagesections';
import OutageStatus from '@/app/ui/outage/outage-status';
import CustomIcon from '../custom-icon';
import clsx from 'clsx';
import { RootState } from '@/app/state/store';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '@/app/state/overlay-view/overlayView';
import { remove } from '@/app/state/overlay-data/overlayData';

export default function OutageOverlay() {
    const layoutClasses = 'fixed flex flex-col gap-8';
    const positionScrollClasses = 'top-0 left-0 bottom-0 overflow-y-auto';

    const overlayView = useSelector((state: RootState) => state.overlayView.value);
    const data = useSelector((state: RootState) => state.overlayData.value);
    const dispatch = useDispatch();

    const { statustext, lat: outageLat, lng: outageLng, address, latestinformation } = data;

    const outageSections = getOutageSections(true, false, data);

    const canSeeOverlay = overlayView.cardClickShow || overlayView.showOnLoad === 1;

    document.querySelector('body')?.classList.toggle('no-scroll', canSeeOverlay);

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
                        const showOnLoadValue = overlayView.showOnLoad === 1 ? 2 : overlayView.showOnLoad;

                        dispatch(update({ cardClickShow: false, showOnLoad: showOnLoadValue }));
                        dispatch(remove());
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
                // TODO reset iframe link after closing the overlay then reopening it
                getOutageIFrame(outageLat, outageLng)
            }
        </div>
    );
}

/**
 * Get the iframe of the map showing roughly where the outage is happening
 *
 * @param {number} lat the latitude
 * @param {number} lng the longtitude
 * @returns HTML object (or nothing if coordinates are not provided)
 */
function getOutageIFrame(lat: number, lng: number) {
    if (lat && lng) {
        const embedLink = `https://maps.google.com/maps?q=${lat.toString()},${lng.toString()}&hl=en&z=16&output=embed`;

        return (
            <iframe className="self-center map-size" src={embedLink} width="80%" loading="lazy"></iframe>
        );
    }

    return null;
}
