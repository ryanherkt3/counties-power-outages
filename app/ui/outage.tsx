import Link from "next/link";
import { OutageData } from "../lib/definitions";
import { getTimeStrings, getTimesAndActiveOutage } from "../lib/utils";
import clsx from "clsx";
import getLatestInfo from "./latestinfo";

export default function Outage({ data }: { data: OutageData; }) {
    const timesAndActiveOutage = getTimesAndActiveOutage(data.shutdownTime1, data.ShutdownDateTime);

    const shutdownTimes = timesAndActiveOutage.times;

    const outageIsPostponed = data.statusText === 'Postponed';

    // Dynamically create outage section segments
    const outageSections = outageIsPostponed ? 
        [
            {
                key: 'postponed-date',
                title: 'Original Date',
                value: data.originalShutdownDate,
            }
        ]:
        [];

    outageSections.push({
        key: 'outage-date',
        title: `${outageIsPostponed ? 'New ' : ''}Date`,
        value: data.shutdownDate,
    });
    outageSections.push({
        key: 'outage-start',
        title: `${outageIsPostponed ? 'New ' : ''}Start Time`,
        value: shutdownTimes.startTime,
    });
    outageSections.push({
        key: 'outage-end',
        title: `${outageIsPostponed ? 'New ' : ''}End Time`,
        value: shutdownTimes.endTime,
    });


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
                            key={section.key} 
                            className='flex flex-row justify-between text-lg font-normal'
                        >
                            <span className="font-semibold">{section.title}</span>
                            <span className={ clsx({ 'line-through': section.key === 'postponed-date' }) }>
                                {section.value}
                            </span>
                        </div>
                    );
                })
            }
            <div className='flex flex-row justify-between text-lg font-normal'>
                <span className="font-semibold">Customers Affected</span>
                <span>{data.affectedCustomers}</span>
            </div>
            {
                getLatestInfo(data.latestInformation)
            }
        </div>
    );
}
