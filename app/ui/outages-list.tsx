'use client';

import Search from './search';
import Pagination from './pagination/pagination';
import { redirect } from 'next/navigation';
import { getFilteredDate, getFilteredOutages } from '../lib/utils';
import CurrentOutages from './outage/current-outages';
import { BoltIcon } from '@heroicons/react/24/outline';
import FilterType from './filters/filter-type';
import OutageOverlay from './outage/outage-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '@/app/state/overlay-view/overlayView';
import { populate } from '@/app/state/overlay-data/overlayData';
import { OutageData, SearchParams } from '../lib/definitions';
import { RootState } from '../state/store';

export default function OutagesList({searchParams, outages} : {searchParams: SearchParams, outages: OutageData[]}) {
    const currentPage = Number(searchParams.page) || 1;

    const filteredNotSearchedOutages = getFilteredOutages(outages, {});
    const filteredOutages = getFilteredOutages(outages, searchParams);

    // Pagination values
    const outagesPerPage = 5;
    const totalPages = Math.ceil(filteredOutages.length / outagesPerPage);

    // Start and end dates for the filters
    const startDate = filteredNotSearchedOutages[0]?.shutdowndatetime || '';
    const endDate = filteredNotSearchedOutages[filteredNotSearchedOutages.length - 1]?.shutdowndatetime || '';
    const startDateEF = searchParams.enddate ? getFilteredDate(searchParams.enddate) : endDate;
    const endDateSF = searchParams.startdate ? getFilteredDate(searchParams.startdate) : startDate;

    const searchSection = getSearchSection(startDate, startDateEF, endDateSF, endDate);

    const overlayView = useSelector((state: RootState) => state.overlayView.value);
    const dispatch = useDispatch();

    // Show the outage overlay after the page loads if we can do so
    if (searchParams.outage && overlayView.showOnLoad === 0) {
        const overlayViewData = outages.filter((outage) => {
            return outage.id === searchParams.outage;
        })[0];

        console.log(overlayViewData);
        console.log(searchParams.outage);

        // Dispatch the events to show the outage overlay, otherwise ignore it
        if (overlayViewData) {
            console.log('show overlay');
            dispatch(populate(overlayViewData));
            dispatch(update({ cardClickShow: false, showOnLoad: 1 }));
        }
    }

    // Early return if there are no outages to report
    if (!filteredOutages.length) {
        return (
            <div className="flex flex-col px-4 py-6 page-min-height">
                {searchSection}
                <div className="flex flex-col gap-12 py-12 my-auto items-center justify-center">
                    <BoltIcon className="w-20 text-red-600" />
                    <div className="text-xl text-center">
                        Could not find the requested outage, try searching for something else
                    </div>
                </div>
            </div>
        );
    }

    // Redirect user to first page if they enter an invalid (or no) page number
    if (currentPage > totalPages || currentPage <= 0) {
        const queryString = getQueryString(searchParams);
        const params = new URLSearchParams(queryString);
        params.set('page', '1'); // reset to page 1

        redirect(`/outages/?${params.toString()}`);
    }

    return (
        <div className="flex flex-col gap-6 px-4 py-6 page-min-height">
            <div className="text-xl text-center">
                Click on an outage to display more information, or use the search functions to find a specific outage
            </div>
            {searchSection}
            <CurrentOutages
                currentPage={currentPage}
                outages={filteredOutages}
                outagesPerPage={outagesPerPage}
                currentPageIsLast={currentPage === totalPages}
            />
            {/* TODO use state management tools to (1) provide the data and (2) determine if OO should be shown */}
            <OutageOverlay />
            <Pagination totalPages={totalPages} />
        </div>
    );
}

/**
 * Get the query string to be used in the new URL
 *
 * @param {SearchParams} searchParams
 * @returns string
 */
function getQueryString(searchParams: SearchParams) {
    let queryString = `page=${searchParams.page}`;

    if (searchParams.query) {
        queryString += `&query=${searchParams.query}`;
    }
    if (searchParams.status) {
        queryString += `&status=${searchParams.status}`;
    }
    if (searchParams.startdate) {
        queryString += `&startdate=${searchParams.startdate}`;
    }
    if (searchParams.enddate) {
        queryString += `&enddate=${searchParams.enddate}`;
    }

    return queryString;
}

/**
 * Get the search section component contaning the various filter types
 *
 * @param {string} startDateSF start date for the start date filter
 * @param {string} endDateSF end date for the start date filter
 * @param {string} startDateEF start date for the end date filter
 * @param {string} endDateEF end date for the end date filter
 * @returns HTML object
 */
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
    );
}
