'use client';

import { Suspense, useEffect, useState } from "react";
import Outage from "./ui/outage";
import { OutageData } from "./lib/definitions";
import Pagination from "./ui/pagination";

export default function Home() {
    // Pagination values
    const [outages, setOutages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [outagesPerPage, setOutagesPerPage] = useState(5);
    
    useEffect(() => {
        const fetchOutages = async() => {
            try {
                // TODO figure out a way to request data without using corsproxy.io
                const apiUrl = "https://corsproxy.io/?https://app.countiespower.com/api/v300/outages/range/current";
                const outagesReq = await fetch(apiUrl, {  
                    next: {
                        revalidate: false
                    }
                });
                const outagesJson = await outagesReq.json();
                setOutages(outagesJson.planned_outages);
            }
            catch (ex) {
                console.log(ex);
            }
        }
        fetchOutages();        
    }, []);

    // Indices of outages array items to show
    const indexOfLastOutage = currentPage * outagesPerPage; // 1 * 5 = 5
    const indexOfFirstOutage = indexOfLastOutage - outagesPerPage; // (1 * 5) - 5 = 0
    const currentOutages = outages.slice(indexOfFirstOutage, indexOfLastOutage); // outages[1] to outages[4]

    // Inline function to set the current page number
    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    
    return (
        <main className="flex min-h-screen flex-col gap-6 px-4 py-6">
            <Suspense fallback={<p>Loading...</p>}>
                {
                    currentOutages.map((outage : OutageData) => {
                        return (
                            <Outage key={outage.id} data={outage} />
                        )
                    })
                }
            </Suspense>
            <Pagination 
                length={outages.length} // length of array
                outagesPerPage={outagesPerPage}
                handlePagination={handlePagination} // pass inline function as prop
                currentPage={currentPage}  // the current page number, e.g. 5
            />
        </main>
    );
}
