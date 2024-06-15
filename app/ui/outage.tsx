import Link from "next/link"; // TODO link to id
import { OutageData } from "../lib/definitions";
import { getTimeStrings, getTimesAndActiveOutage } from "../lib/utils";
import clsx from "clsx";

export default function Outage({ data }: { data: OutageData; }) {
    const timesAndActiveOutage = getTimesAndActiveOutage(data.shutdownTime1, data.ShutdownDateTime);

    const shutdownTimes = timesAndActiveOutage.times;

    // Alert the user if the power outage is ongoing
    if (timesAndActiveOutage.activeOutage && data.statusText !== 'Cancelled') {
        data.statusText = 'Active';
    }

    const outageIsPostponed = data.statusText === 'Postponed';

    // Dynamically create outage section segments
    // TODO if postponed do not show OG start/end time (add keys here and check those)
    const outageSections = [
        {
            title: `${outageIsPostponed ? 'Original' : ''} Date`,
            value: outageIsPostponed ? data.originalShutdownDate : data.shutdownDate,
        },
        {
            title: `${outageIsPostponed ? 'Original' : ''} Start Time`,
            value: shutdownTimes.startTime,
        },
        {
            title: `${outageIsPostponed ? 'Original' : ''} End Time`,
            value: shutdownTimes.endTime,
        },
    ];

    // TODO fix
    let postponedSections: any[] = [];
    if (outageIsPostponed) {
        let originalPostponedTimes: String[] = [];
        const originalPostponedTime = data.originalShutdownTime1.split(' - ');

        originalPostponedTime.map((newTime : string) => {
            const timeSegments = newTime.split(':');
            originalPostponedTimes.push(getTimeStrings(timeSegments));
        });

        postponedSections = [
            {
                title: 'New Date',
                value: data.shutdownDate,
            },
            {
                title: 'New Start Time',
                value: originalPostponedTimes[0],
            },
            {
                title: 'New End Time',
                value: originalPostponedTimes[1],
            },
        ];
    }

    const outageHref = `outage/${data.id}`;

    return (
        <div className='flex flex-col gap-4 shrink-0 p-4 rounded-lg border border-gray-700' >
            <Link 
                key={data.id}
                href={outageHref}
                className="text-2xl font-semibold hover:text-red-400"
            >
                {data.address}
            </Link>
            <div className='flex flex-row justify-between items-center text-lg font-normal'>
                <span className="font-semibold">Status</span>
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
                            key={outageSections.indexOf(section)} 
                            className='flex flex-row justify-between text-lg font-normal'
                        >
                            <span className="font-semibold">{section.title}</span>
                            <span className={ clsx({ 'line-through': outageIsPostponed }) }>
                                {section.value}
                            </span>
                        </div>
                    );
                })
            }
            {
                postponedSections.map((section) => {
                    return (
                        <div 
                            key={postponedSections.indexOf(section)} 
                            className='flex flex-row justify-between text-lg font-normal'
                        >
                            <span className="font-semibold">{section.title}</span>
                            <span>{section.value}</span>
                        </div>
                    );
                })
            }
            <div className='flex flex-row justify-between text-lg font-normal'>
                <span className="font-semibold">Customers Affected</span>
                <span>{data.affectedCustomers}</span>
            </div>
        </div>
    );
}
