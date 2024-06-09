import Link from "next/link"; // TODO link to id
import { OutageData } from "../lib/definitions";
import { getTimesAndActiveOutage } from "../lib/utils";
import clsx from "clsx";

export default function Outage({ data }: { data: OutageData; }) {
    const timesAndActiveOutage = getTimesAndActiveOutage(data.shutdownTime1, data.ShutdownDateTime);
    const shutdownTimes = timesAndActiveOutage.times;

    // Alert the user if the power outage is ongoing
    if (timesAndActiveOutage.activeOutage) {
        data.statusText = 'Active';
    }

    // Dynamically create outage section segments
    const outageSections = [
        {
            title: 'Date',
            value: data.shutdownDate,
        },
        {
            title: 'Start Time',
            value: shutdownTimes.startTime,
        },
        {
            title: 'End Time',
            value: shutdownTimes.endTime,
        },
        {
            title: 'Customers Affected',
            value: data.affectedCustomers,
        }
    ];

    return (
        // TODO Link
        <div className='flex flex-col gap-4 shrink-0 p-4 rounded-lg border border-gray-700' >
            <span className="text-2xl font-semibold">{data.address}</span>
            <div className='flex flex-row justify-between items-center text-lg font-normal'>
                <span className="font-semibold">Status</span>
                <span 
                    className={
                        clsx(
                            'font-medium px-2 py-1 rounded',
                            {
                                'bg-green-400': data.statusText === "Active",
                                'bg-blue-500 text-white': data.statusText === "Scheduled",
                                'bg-red-400': data.statusText === "Postponed",
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
                            <span>{section.value}</span>
                        </div>
                    );
                })
            }
        </div>
    );
}
