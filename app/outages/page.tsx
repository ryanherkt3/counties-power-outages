import Search from '../ui/search';
import Pagination from "../ui/pagination/pagination";
import { redirect } from "next/navigation";
import { getActiveOutages, getFilteredDate, getFilteredOutages } from "../lib/utils";
import CurrentOutages from "../ui/outage/current-outages";
import { Metadata } from "next";
import { BoltIcon } from '@heroicons/react/24/outline';
import FilterType from '../ui/filters/filter-type';

export const metadata: Metadata = {
    title: 'Outages List',
};

export default async function OutagesPage(
    {
        searchParams
    }: 
    {
        searchParams?: {
            query?: string;
            page?: string;
            status?: string;
            startdate?: string;
            enddate?: string;
        };
    }
) {
    const outages = await getActiveOutages();
    const currentPage = Number(searchParams?.page) || 1;

    const filteredNotSearchedOutages = getFilteredOutages(outages, {});
    const filteredOutages = getFilteredOutages(outages, searchParams);

    // Pagination values
    const outagesPerPage = 5;
    const totalPages = Math.ceil(filteredOutages.length / outagesPerPage);

    // Start and end dates for the filters
    const startDate = filteredNotSearchedOutages[0]?.ShutdownDateTime || '';
    const endDate = filteredNotSearchedOutages[filteredNotSearchedOutages.length - 1]?.ShutdownDateTime || '';
    const startDateEF = searchParams?.enddate ? getFilteredDate(searchParams?.enddate) : endDate;
    const endDateSF = searchParams?.startdate ? getFilteredDate(searchParams?.startdate) : startDate;
    
    const searchSection = getSearchSection(startDate, startDateEF, endDateSF, endDate);

    // Early return if there are no outages to report
    if (!filteredOutages.length) {
        return (
            <main className="flex flex-col px-4 py-6 page-min-height">
                {searchSection}
                <div className="flex flex-col gap-12 py-12 my-auto items-center justify-center">
                    <BoltIcon className="w-20 text-red-600" />
                    <div className="text-xl text-center">
                        Could not find the requested outage, try searching for something else
                    </div>
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
            {searchSection}
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

function getSearchSection(startDateSF: string, endDateSF: string, startDateEF: string, endDateEF: string) {
    return (
        <div className="flex flex-wrap flex-row gap-6">
            <FilterType type="Status" optionalDates={null} />
            <FilterType type="Start Date" optionalDates={[startDateSF, endDateSF]} />
            <FilterType type="End Date" optionalDates={[startDateEF, endDateEF]} />
            <div className="flex-grow min-w-full md:min-w-[unset]">
                <Search placeholder="Search outages..." />
            </div>
        </div>
    )
}
