import Link from "next/link"; // TODO link to id
import { OutageData } from "../lib/definitions";
import { getTimesAndActiveOutage } from "../lib/utils";
import clsx from "clsx";

export default function Outage({ data }: { data: OutageData; }) {
    const subHeadingStyles = "flex flex-row justify-between text-lg font-normal";

    const shutdownTimesAndActiveOutage = getTimesAndActiveOutage(data.shutdownTime1, data.ShutdownDateTime);
    const shutdownTimes = shutdownTimesAndActiveOutage.times;

    // Alert the user if the power outage is ongoing
    if (shutdownTimesAndActiveOutage.activeOutage) {
        data.statusText = 'Active';
    }

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
            <div className={subHeadingStyles}>
                <span className="font-semibold">Date</span>
                <span>{data.shutdownDate}</span>
            </div>
            <div className={subHeadingStyles}>
                <span className="font-semibold">Start Time</span>
                <span>{shutdownTimes[0]}</span>
            </div>
            <div className={subHeadingStyles}>
                <span className="font-semibold">End Time</span>
                <span>{shutdownTimes[1]}</span>
            </div>
            <div className={subHeadingStyles}>
                <span className="font-semibold">Customers Affected</span>
                <span>{data.affectedCustomers}</span>
            </div>
        </div>
    );
}
