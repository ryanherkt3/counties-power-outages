import { getActiveOutages, getOutageByID, getTimesAndActiveOutage } from "@/app/lib/utils";
import notFound from "./not-found";
import clsx from "clsx";
import getLatestInfo from "@/app/ui/latestinfo";
import { Metadata } from "next";

type Props = {
    params: { id: string }
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    return {
        title: `Outage ${params.id}`,
    }
}

export default async function OutagePage({ params }: { params: { id: string } }) {
    const id = params.id;

    const outages = await getActiveOutages();
    const thisOutage = getOutageByID(outages, id)[0];

    // Show "not found" page if this specific outage doesn't exist
    if (!thisOutage) {
        return notFound();
    }

    // TODO put code here and in outagecard.tsx into active outage util function
    const timesAndActiveOutage = getTimesAndActiveOutage(thisOutage.shutdownTime1, thisOutage.ShutdownDateTime);
    
    const status = thisOutage.statusText;
    const shutdownTimes = timesAndActiveOutage.times;

    const outageIsPostponed = status === 'Postponed';
    const outageSections = outageIsPostponed ? 
        [
            {
                title: 'ORIGINAL DATE',
                value: thisOutage.originalShutdownDate,
            }
        ]:
        [];

    outageSections.push({
        title: `${outageIsPostponed ? 'NEW ' : ''}DATE`,
        value: thisOutage.shutdownDate,
    });
    outageSections.push({
        title: 'START TIME',
        value: shutdownTimes.startTime,
    });
    outageSections.push({
        title: 'END TIME',
        value: shutdownTimes.endTime,
    });

    const outageLat = thisOutage.lat;
    const outageLng = thisOutage.lng;

    return (
        <main className="flex flex-col gap-8 px-4 py-6 text-center">
            <div className= "text-2xl font-semibold text-black">{thisOutage.address}</div>
            <div 
                className={
                    clsx(
                        'text-xl p-3 font-semibold rounded-xl',
                        {
                            'bg-green-400': status === "Active",
                            'bg-blue-500 text-white': status === "Scheduled",
                            'bg-red-400 text-white': status === "Postponed",
                            'bg-orange-400': status === "Cancelled",
                        },
                    )
                }>
                {thisOutage.statusText.toUpperCase()}
            </div>
            {
                getLatestInfo(thisOutage.latestInformation)
            }
            <div className="flex flex-row justify-between">
                {
                    outageSections.map((section) => {
                        return (
                            <div 
                                key={outageSections.indexOf(section)} 
                                className='flex flex-col gap-3 text-lg font-normal'
                            >
                                <span className="font-semibold">{section.title}</span>
                                <span>{section.value}</span>
                            </div>
                        );
                    })
                }
            </div>
            {
                getOutageIFrame(outageLat, outageLng)
            }
        </main>
    );
}

function getOutageIFrame(lat: number, lng: number) {
    if (lat && lng) {
        const embedLink = `https://maps.google.com/maps?q=${lat.toString()},${lng.toString()}&hl=en&z=16&output=embed`
        
        return (
            <iframe className="self-center" src={embedLink} width="800" height="600" loading="lazy"></iframe>
        )
    }

    else return null;
}
