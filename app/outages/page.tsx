import { Suspense } from "react";
import Search from '../ui/search';
import Pagination from "../ui/pagination";
import { redirect } from "next/navigation";
import { getActiveOutages, getFilteredOutages } from "../lib/utils";
import CurrentOutages from "../ui/currentoutages";

export default async function OutagesPage({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    // TODO add app/ui/search.tsx

    const outages = await getActiveOutages();    
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const filteredOutages = getFilteredOutages(outages, query);

    // Pagination values
    const outagesPerPage = 5;
    const totalPages = Math.ceil(filteredOutages.length / outagesPerPage);

    // Early return if there are no outages to report
    if (!filteredOutages.length) {
        return (
            <main className="flex min-h-screen flex-col gap-6 px-4 py-6">
                <Search placeholder="Search outages..." />
                <p className="text-center">No current outages, try searching for something else...</p>
            </main>
        )
    }

    // Redirect user to first page if they enter an invalid (or no) page number
    if (currentPage > totalPages || currentPage <= 0) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1'); // reset to page 1
        
        redirect(`/outages/?${params.toString()}`);
    }
    
    return (
        <main className="flex min-h-screen flex-col gap-6 px-4 py-6">
            <Search placeholder="Search outages..." />
            <Suspense fallback={<p>Loading...</p>}>
                <CurrentOutages 
                    currentPage={currentPage}
                    outages={filteredOutages}
                    outagesPerPage={outagesPerPage}
                    currentPageIsLast={currentPage === totalPages}
                />
            </Suspense>
            <Pagination totalPages={totalPages} />
        </main>
    );
}
