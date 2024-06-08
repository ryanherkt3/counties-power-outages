'use client';

import Link from "next/link"; // TODO link to id
import { useState, useEffect } from 'react';

export default function Outage() {
    const subHeadingStyles = "flex flex-row justify-between text-lg font-normal";

    const [outages, setOutages] = useState([]);
    useEffect(() => {
        fetch("https://app.countiespower.com/api/v300/outages/range/current", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            // credentials: "same-origin",
            headers: {
                accept: 'application/vnd.api+json',
                "Access-Control-Allow-Origin": 'https://app.countiespower.com/',
                "Access-Control-Allow-Methods": 'OPTIONS,GET,POST',
                "Access-Control-Allow-Headers": '*',
                "Access-Control-Allow-Credentials": 'true',
            },
            referrerPolicy: "no-referrer",
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setOutages(data);
          });
      }, []);
    
    return (
        <div className="flex flex-col gap-4 shrink-0 p-4 rounded-lg border border-gray-700">
            <span className="text-2xl font-semibold">Location</span>
            {/* TODO iterate through these */}
            <div className={subHeadingStyles}>
                <span className="font-semibold">Status</span>
                <span>Scheduled/Cancelled/etc</span>
            </div>
            <div className={subHeadingStyles}>
                <span className="font-semibold">Date</span>
                <span>dd/mm/yy</span>
            </div>
            <div className={subHeadingStyles}>
                <span className="font-semibold">Start Time</span>
                <span>9 AM</span>
            </div>
            <div className={subHeadingStyles}>
                <span className="font-semibold">End Time</span>
                <span>9 PM</span>
            </div>

            <div>
                {
                    outages.map((outage) => {
                        return `
                          <div>
                            ${outage}
                          </div>
                        `
                    })
                }
            </div>
        </div>
    );
}
