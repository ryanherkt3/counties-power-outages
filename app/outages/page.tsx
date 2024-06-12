import { Suspense } from "react";
// import Search from '@/app/ui/search';
import Pagination from "../ui/pagination";
import { redirect } from "next/navigation";
import { getFilteredOutages } from "../lib/utils";
import CurrentOutages from "../ui/currentoutages";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    // TODO add app/ui/search.tsx

    const outages = await getFilteredOutages();
    const currentPage = Number(searchParams?.page) || 1;

    // Early return if there are no outages to report
    if (!outages.length) {
        return (
            <p>No current outages!</p>
        )
    }

    // Pagination values
    const outagesPerPage = 5;
    const totalPages = Math.ceil(outages.length / outagesPerPage);

    // Redirect user to first page if they enter an invalid (or no) page number
    if (currentPage > totalPages || currentPage <= 0) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1'); // reset to page 1
        
        redirect(`/outages/?${params.toString()}`);
    }
    
    return (
        <main className="flex min-h-screen flex-col gap-6 px-4 py-6">
            <Suspense fallback={<p>Loading...</p>}>
                <CurrentOutages 
                    currentPage={currentPage}
                    outages={outages}
                    outagesPerPage={outagesPerPage}
                    currentPageIsLast={currentPage === totalPages}
                />
            </Suspense>
            <Pagination totalPages={totalPages} />
        </main>
    );
}
