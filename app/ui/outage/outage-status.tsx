'use client';

import clsx from "clsx";

export default function OutageStatus(
    {
        className,
        statusText,
        overrideBg
    }:
    {
        className: string;
        statusText: string;
        overrideBg: boolean
    }
) {
    return (
        <div
            className={
                clsx(
                    className,
                    {
                        'bg-green-400': statusText === "Active" && !overrideBg,
                        'bg-blue-500 text-white': statusText === "Scheduled" && !overrideBg,
                        'bg-red-400 text-white': statusText === "Postponed" && !overrideBg,
                        'bg-orange-400': statusText === "Cancelled" && !overrideBg,
                    },
                )
            }
        >
            {statusText.toUpperCase()}
        </div>
    );
}
