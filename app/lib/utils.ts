import { OutageData } from './definitions';

/**
 * Return if an outage is active or not by checking if the current time is greater than
 * the outage's start time
 *
 * @param {string} dateStr
 * @param {number} startHour
 * @returns {Boolean}
 */
export function isOutageActive(dateStr: string, startHour: number) {
    const outageStartDate = new Date(dateStr);
    outageStartDate.setHours(startHour);

    const currentDate = new Date();

    return currentDate.getTime() >= outageStartDate.getTime();
}

/**
 * Return whether the outage has expired or not by checking if the current time is greater than
 * the outage's end time
 *
 * @param {string} dateStr the date in string format (e.g. TODO add example)
 * @param {number} startHour e.g. 9
 * @param {number} endHour e.g. 15
 * @param {number} endMinute e.g. 45
 * @returns {boolean}
 */
export function isOutageExpired(dateStr: string, startHour: number, endHour: number, endMinute: number) {
    const outageEndDate = new Date(dateStr);
    outageEndDate.setHours(endHour);
    outageEndDate.setMinutes(endMinute);

    // Set end date to next day if start hour is greater than the end hour,
    // and the end hour is the next morning
    if (startHour >= 12 && endHour < 12) {
        outageEndDate.setDate(outageEndDate.getDate() + 1);
    }

    const currentDate = new Date();

    return currentDate.getTime() >= outageEndDate.getTime();
}

/**
 * Get the time strings (e.g. 9:00 AM, 3:00 PM)
 *
 * @param {Array<string>} splitTime [hour, minute]
 * @returns {string} the time string
 */
export function getTimeStrings(splitTime: Array<string>) {
    let hourlySegment = splitTime[0];
    const minuteSegment = splitTime[1];

    if (parseInt(hourlySegment) >= 12) {
        hourlySegment = parseInt(hourlySegment) === 12 ? '12' : `${parseInt(hourlySegment) - 12}`;
        return `${hourlySegment}:${minuteSegment} PM`;
    }

    hourlySegment = parseInt(hourlySegment) === 0 ? '12' : `${parseInt(hourlySegment)}`;
    return `${hourlySegment}:${minuteSegment} AM`;
}

/**
 * Return an object containing the outage's start and end times, if it is active, if it is expired
 *
 * @param {string} time TODO add explanation
 * @param {string} shutdownDate TODO add explanation
 * @returns {Object} the outage's start and end times, if it is active, if it is expired
 */
export function getTimesAndActiveOutage(time: string, shutdownDate: string) {
    const newTimes: string[] = [];
    const newTimeString = time.split(' - ');

    // Get start hour and check if outage is accurate
    const startHour = newTimeString[0].split(':')[0];
    const endHour = newTimeString[1].split(':')[0];
    const endMinute = newTimeString[1].split(':')[1];

    // Get formatted times (e.g. 8:30 AM)
    newTimeString.map((newTime : string) => {
        const timeSegments = newTime.split(':');
        newTimes.push(getTimeStrings(timeSegments));
    });

    // If the outage has passed, do not show it
    if (isOutageExpired(shutdownDate, parseInt(startHour), parseInt(endHour), parseInt(endMinute))) {
        return {
            activeOutage: false,
            expiredOutage: true,
            times: {
                startTime: newTimes[0],
                endTime: newTimes[1],
            }
        };
    }

    return {
        activeOutage: isOutageActive(shutdownDate, parseInt(startHour)),
        expiredOutage: false,
        times: {
            startTime: newTimes[0],
            endTime: newTimes[1],
        }
    };
}

/**
 * Return the active outages
 *
 * @returns {Object} outages
 */
export async function getActiveOutages() {
    const apiUrl = 'https://outages.ryanherkt.com/api/getoutages';
    const outagesReq = await fetch(apiUrl, {cache: 'no-store'});
    const outagesJson = await outagesReq.json();
    let outages = outagesJson.planned_outages;

    outages.map((outage: OutageData) => {
        const timesAndIsActiveOutage = getTimesAndActiveOutage(outage.shutdownTime1, outage.ShutdownDateTime);
        outage.expiredOutage = timesAndIsActiveOutage.expiredOutage;

        // TODO test this change works
        if (timesAndIsActiveOutage.activeOutage && outage.statusText !== 'Cancelled') {
            outage.statusText = 'Active';
        }
    });

    outages = outages.filter((outage: { expiredOutage: boolean; }) => {
        return outage.expiredOutage === false;
    });

    return outages;
}

/**
 * Return a date in the DD/MM/YYYY format
 *
 * @param {string} date the date to filter (e.g. TODO add example)
 * @returns {string}
 */
export function getFilteredDate(date: string) {
    const dateYear = date.slice(4); // "/2024"
    const dateArr = date.replace(dateYear, '').split('/'); // [Day, Month]
    return `${dateArr[1]}/${dateArr[0]}/${dateYear}`;
}

/**
 * Return a list of outages based on the user's search parameters
 *
 * @param {Array<OutageData>} outages original list of outages
 * @param {any} searchParams address / status / start date / end date (TODO fix type?)
 * @returns {Array<OutageData>} new filtered list of outages
 */
export function getFilteredOutages(outages: Array<OutageData>, searchParams: any) {
    const address = searchParams?.query;
    const status = searchParams?.status;
    const startDate = searchParams?.startdate;
    const endDate = searchParams?.enddate;

    // Return original list if no search parameters
    if (!address && !status && !startDate && !endDate) {
        return outages;
    }

    const getDateMatch = (outage: OutageData, date: string, isStartDate: boolean) => {
        date = getFilteredDate(date);

        if (isStartDate) {
            return new Date(outage.ShutdownDateTime).getTime() >= new Date(date).getTime();
        }
        return new Date(outage.ShutdownDateTime).getTime() <= new Date(date).getTime();
    };

    // Otherwise return filtered outages
    const filteredOutages = outages.filter((outage: OutageData) => {
        const matchesAddress = address ? outage.address.toLowerCase().includes(address) : true;
        const matchesStatus = status ? outage.statusText.toLowerCase().includes(status) : true;
        const onOrAfterStartDate = startDate ? getDateMatch(outage, startDate, true) : true;
        const onOrBeforeEndDate = endDate ? getDateMatch(outage, endDate, false) : true;

        return matchesAddress && matchesStatus && onOrAfterStartDate && onOrBeforeEndDate;
    });

    return filteredOutages;
}

/**
 * Return a specific outages by ID
 *
 * @param {Array<OutageData>} outages original list of outages
 * @param {string} id outage ID to filter by
 * @returns {OutageData | undefined} the outage data (or nothing if it cannot be found)
 */
export function getOutageByID(outages: Array<OutageData>, id: string) {
    const outage = outages.filter((outage: OutageData) => {
        return outage.id === id;
    });

    return outage;
}

/**
 * Return a pagination object
 *
 * @param {number} currentPage
 * @param {number} totalPages
 * @returns {Array<number | string>} pagination object
 */
export function generatePagination(currentPage: number, totalPages: number) {
    // If the total number of pages is 7 or less, display all pages without any ellipsis
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 2 pages, show the first 3, an ellipsis, and the last page
    if (currentPage <= 2) {
        return [1, 2, 3, '...', totalPages];
    }

    // If the current page is the 3rd or more (up to the 3rd last page),
    // show the first 3, an ellipsis, and the last page
    if (currentPage >= 3 && currentPage < totalPages - 2) {
        return [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages,
        ];
    }

    // If the current page is among the last 3 pages, show the first 2, an ellipsis, and the last 3 pages
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
}
