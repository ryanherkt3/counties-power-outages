'use client';

import Search from './search';
import Pagination from './pagination/pagination';
import { redirect } from 'next/navigation';
import { getFilteredDate, getFilteredOutages } from '../lib/utils';
import CurrentOutages from './outage/current-outages';
import { BoltIcon } from '@heroicons/react/24/outline';
import FilterType from './filters/filter-type';
import { useDispatch, useSelector } from 'react-redux';
import OutageOverlay from './outage/outage-overlay';
import FilterOverlay from './filters/filter-overlay';
import { update as outageOverlayUpdate } from '@/state/outage-overlay-view/outageOverlayView';
import { update as filterOverlayUpdate } from '@/state/filter-overlay-view/filterOverlayView';
import { OutageData, SearchParams, SelectedFilterOverlayValues } from '../lib/definitions';
import { RootState } from '../state/store';
import { useEffect } from 'react';

export default function OutagesList(
    {
        searchParams,
        outages
    } :
    {
        searchParams: SearchParams,
        outages: OutageData[]
    }
) {
    const currentPage = Number(searchParams.page) || 1;

    const filteredNotSearchedOutages = getFilteredOutages(outages, null);
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

    const outageOverlayView = useSelector((state: RootState) => state.outageOverlayView.value);
    const dispatch = useDispatch();

    // Show the outage overlay after the page loads if we can do so
    if (searchParams.outage && outageOverlayView.isVisible === 'Hidden') {
        const outageOverlayViewData = outages.filter((outage) => {
            return outage.id === searchParams.outage;
        })[0];

        // Dispatch the events to show the outage overlay, otherwise ignore it
        if (outageOverlayViewData) {
            dispatch(
                outageOverlayUpdate(
                    { cardClickShow: false, isVisible: 'Open', data: outageOverlayViewData }
                )
            );
        }
    }

    // Update the set filter values if visiting the outages page with filters set in the URL
    const filterOverlayView = useSelector((state: RootState) => state.filterOverlayView.value);
    useEffect(() => {
        if (searchParams.startdate !== '' || searchParams.enddate !== '' || searchParams.status !== '') {
            if ((searchParams.startdate && filterOverlayView.filterValues.startdate === '') ||
                (searchParams.enddate && filterOverlayView.filterValues.enddate === '') ||
                (searchParams.status && filterOverlayView.filterValues.status === '')) {
                const newFilterValues: SelectedFilterOverlayValues = {
                    status: searchParams.status || '',
                    startdate: searchParams.startdate || '',
                    enddate: searchParams.enddate || ''
                };

                dispatch(
                    filterOverlayUpdate(
                        {
                            type: 'none',
                            isVisible: false,
                            data: { type: 'none', optionalDates: null },
                            filterValues: newFilterValues
                        }
                    )
                );
            }
        }
    }, [searchParams, filterOverlayView]);


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
                <FilterOverlay />
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
            <OutageOverlay />
            <FilterOverlay />
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
