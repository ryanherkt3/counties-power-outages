'use client';

import { Suspense, useEffect, useState } from "react";
// import Search from '@/app/ui/search';
import Outage from "./ui/outage";
import { OutageData } from "./lib/definitions";
import Pagination from "./ui/pagination";
import { redirect } from "next/navigation";

export default function Home({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const [outages, setOutages] = useState([]);
    const [fetched, setFetched] = useState(false);
    
    // TODO add app/ui/search.tsx

    useEffect(() => {
        const fetchOutages = async() => {
            try {
                // TODO figure out a way to request data without using corsproxy.io
                const apiUrl = "https://corsproxy.io/?https://app.countiespower.com/api/v300/outages/range/current";
                const outagesReq = await fetch(apiUrl, {  
                     cache: 'no-store'
                });
                const outagesJson = await outagesReq.json();
                setOutages(outagesJson.planned_outages);
                setFetched(true);
            }
            catch (ex) {
                console.log(ex);
            }
        }
        fetchOutages();        
    }, []);

    // Pagination values
    const [outagesPerPage, setOutagesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(Number(searchParams?.page) || 1);
    
    // Redirect user to first page if they enter an invalid (or no) page number
    if (fetched) {
        const numOfPages = Math.ceil(outages.length / outagesPerPage); // 50 / 5 = 10;
        const pageParam = currentPage;

        if (pageParam > numOfPages || pageParam <= 0) {
            const params = new URLSearchParams(searchParams);
            params.set('page', '1'); // reset to page 1
            
            redirect(`/?${params.toString()}`);
        }
    }

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
