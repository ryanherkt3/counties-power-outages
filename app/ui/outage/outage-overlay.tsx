/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import LatestInfo from '@/app/ui/latest-info';
import { getOutageSections } from '@/app/lib/outagesections';
import OutageStatus from '@/app/ui/outage/outage-status';
import { OutageData } from '@/app/lib/definitions';
import CustomIcon from '../custom-icon';
import clsx from 'clsx';

export default function OutageOverlay(
    {
        data,
        hidden,
        closeCallback
    }:
    {
        data: OutageData;
        hidden: boolean;
        closeCallback: Function
    }
) {
    const { statustext, lat: outageLat, lng: outageLng, address, latestinformation } = data;

    const outageSections = getOutageSections(true, false, data);

    const layoutClasses = 'fixed flex flex-col gap-8';
    const positionScrollClasses = 'top-0 left-0 bottom-0 overflow-y-auto';

    return (
        <div
            className={
                clsx(
                    `${layoutClasses} px-4 py-6 text-center ${positionScrollClasses} w-[100%] h-[100%] z-20 bg-white`,
                    {
                        'hidden': hidden
                    }
                )
            }
        >
            <div className="flex flex-row gap-2 justify-between">
                <div className="text-2xl font-semibold text-black">{address}</div>
                <button onClick={ closeCallback.bind(null) }>
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
 * @returns HTML object (or nothing if co-ordinates are not provided)
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
