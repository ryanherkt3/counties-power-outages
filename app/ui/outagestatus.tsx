'use client';

import clsx from "clsx";

export default function OutageStatus({ className, statusText }: { className: string; statusText: string; }) {
    return (
        <div 
            className={
                clsx(
                    className,
                    {
                        'bg-green-400': statusText === "Active",
                        'bg-blue-500 text-white': statusText === "Scheduled",
                        'bg-red-400 text-white': statusText === "Postponed",
                        'bg-orange-400': statusText === "Cancelled",
                    },
                )
            }
        >
            {statusText.toUpperCase()}
        </div>
    );
}
