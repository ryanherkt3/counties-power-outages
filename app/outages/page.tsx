import Search from '../ui/search';
import Pagination from "../ui/pagination";
import { redirect } from "next/navigation";
import { getActiveOutages, getFilteredOutages } from "../lib/utils";
import CurrentOutages from "../ui/currentoutages";
import { Metadata } from "next";
import { BoltIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Outages List',
};

export default async function OutagesPage({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
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
            <main className="flex flex-col px-4 py-6 page-min-height">
                <Search placeholder="Search outages..." />
                <div className="flex flex-col gap-12 py-12 my-auto items-center justify-center">
                    <BoltIcon className="w-20 text-red-600" />
                    <div className="text-xl">Could not find the requested outage, try searching for something else</div>
                </div>
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
        <main className="flex flex-col gap-6 px-4 py-6 page-min-height">
            <Search placeholder="Search outages..." />
            <CurrentOutages 
                currentPage={currentPage}
                outages={filteredOutages}
                outagesPerPage={outagesPerPage}
                currentPageIsLast={currentPage === totalPages}
            />
            <Pagination totalPages={totalPages} />
        </main>
    );
}
