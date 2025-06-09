/* eslint-disable @typescript-eslint/no-explicit-any */
import { Coordinate, OutageData } from './definitions';
import { z } from 'zod';

/**
 * Return if an outage is active or not by checking if the current time is greater than
 * the outage's start time
 *
 * @param {string} dateStr
 * @param {number} startHour
 * @param {number} startMinute
 * @returns {Boolean}
 */
export function isOutageActive(dateStr: string, startHour: number, startMinute: number) {
    const outageStartDate = new Date(dateStr);
    outageStartDate.setHours(startHour);
    outageStartDate.setMinutes(startMinute);

    const currentDate = new Date();

    return currentDate.getTime() >= outageStartDate.getTime();
}

/**
 * Return whether the outage has expired or not by checking if the current time is greater than
 * the outage's end time
 *
 * @param {string} dateStr string representation of the shutdown date e.g. 2025-01-13T00:00:00+13:00
 * @param {number} startHour 0 (12 AM) to 23 (11 PM) e.g. 9
 * @param {number} endHour 0 (12 AM) to 23 (11 PM) e.g. 15
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
 * @param {string} startTime string representation of the shutdown start date e.g. 2025-01-13T00:00:00+13:00
 * @param {string} endTime string representation of the shutdown end date e.g. 2025-01-13T00:00:00+13:00
 * @returns {Object} the outage's start and end times, if it is active, if it is expired
 */
export function getTimesAndActiveOutage(startTime: string, endTime: string) {
    const startTimeString = startTime.split('T')[1].split('+')[0];
    const endTimeString = endTime.split('T')[1].split('+')[0];

    // Get start hour and check if outage is accurate
    const startHour = startTimeString.split(':')[0];
    const startMinute = startTimeString.split(':')[1];
    const endHour = endTimeString.split(':')[0];
    const endMinute = endTimeString.split(':')[1];

    // If the outage has passed, do not show it
    if (isOutageExpired(startTime, parseInt(startHour), parseInt(endHour), parseInt(endMinute))) {
        return {
            activeOutage: false,
            expiredOutage: true,
            times: {
                startTime: getTimeStrings(startTimeString.split(':')),
                endTime: getTimeStrings(endTimeString.split(':')),
            }
        };
    }

    return {
        activeOutage: isOutageActive(startTime, parseInt(startHour), parseInt(startMinute)),
        expiredOutage: false,
        times: {
            startTime: getTimeStrings(startTimeString.split(':')),
            endTime: getTimeStrings(endTimeString.split(':')),
        }
    };
}

/**
 * Return the active outages
 *
 * @returns {Object} outages
 */
export async function getActiveOutages() {
    const outagesReq = await fetch(process.env.API_URL + '/getoutages');

    const outagesJson = await outagesReq.json();

    let outages = outagesJson.planned_outages;

    outages.map((outage: OutageData) => {
        const shutdownperiods = outage.shutdownperiods[0];

        const timesAndIsActiveOutage = getTimesAndActiveOutage(shutdownperiods.start, shutdownperiods.end);
        outage.expiredOutage = timesAndIsActiveOutage.expiredOutage;

        if (timesAndIsActiveOutage.activeOutage && outage.statustext !== 'Cancelled') {
            outage.statustext = 'Active';
        }
    });

    outages = outages.filter((outage: { expiredOutage: boolean; }) => {
        return outage.expiredOutage === false;
    }).sort((a: any, b: any) => {
        const aTime = new Date(a.shutdowndatetime).getTime() / 1000;
        const bTime = new Date(b.shutdowndatetime).getTime() / 1000;
        const aStartTime = new Date(a.shutdownperiods[0].start).getTime() / 1000;
        const bStartTime = new Date(b.shutdownperiods[0].start).getTime() / 1000;

        if (aTime === bTime) {
            return aStartTime - bStartTime;
        }
        return aTime - bTime;
    });

    return outages;
}

/**
 * Return a date in the MM/DD/YYYY format
 *
 * @param {string} date the date to filter (e.g. 15/1/2025)
 * @returns {string}
 */
export function getFilteredDate(date: string) {
    const segments = date.split('/'); // [Day, Month, Year]

    return `${segments[1]}/${segments[0]}/${segments[2]}`;
}

/**
 * Return a list of outages based on the user's search parameters
 *
 * @param {Array<OutageData>} outages original list of outages
 * @param {any} searchParams address / status / start date / end date
 * @returns {Array<OutageData>} new filtered list of outages
 */
export function getFilteredOutages(outages: Array<OutageData>, searchParams: any) {
    const address = searchParams.query;
    const outageStatus = searchParams.status;
    const startDate = searchParams.startdate;
    const endDate = searchParams.enddate;

    // Return original list if no search parameters
    if (!address && !outageStatus && !startDate && !endDate) {
        return outages;
    }

    const getDateMatch = (outage: OutageData, date: string, isStartDate: boolean) => {
        const shutdownDateTime = new Date(outage.shutdowndatetime).getTime();
        const filterDateTime = new Date(date.split('/').reverse().join('/')).getTime();

        if (isStartDate) {
            return shutdownDateTime >= filterDateTime;
        }
        return shutdownDateTime <= filterDateTime;
    };

    // Otherwise return filtered outages
    const filteredOutages = outages.filter((outage: OutageData) => {
        const matchesAddress = address ? outage.address.toLowerCase().includes(address) : true;
        const matchesStatus = outageStatus ? outage.statustext.toLowerCase().includes(outageStatus) : true;
        const onOrAfterStartDate = startDate ? getDateMatch(outage, startDate, true) : true;
        const onOrBeforeEndDate = endDate ? getDateMatch(outage, endDate, false) : true;

        return matchesAddress && matchesStatus && onOrAfterStartDate && onOrBeforeEndDate;
    });

    return filteredOutages;
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

    // If the current page is among the first 3 pages, show the first 3, an ellipsis, and the last page
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages];
    }

    // If the current page is the 4th or more (up to the 3rd last page),
    // show 1, an ellipsis, the next 3, and the last page
    if (currentPage > 3 && currentPage < totalPages - 2) {
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

/**
 * Check if the coordinates given are inside a given polygon, or match where the outage is happening
 *
 * @param point the coordinates of the subscription
 * @param polygon
 * @param outageCoords the coordinates of where the outage is happening
 * @returns {Boolean}
 */
export function coordIsInOutageZone(point: Coordinate, polygon: Coordinate[], outageCoords: Coordinate) {
    if (!outageCoords.lat || !outageCoords.lng) {
        return false;
    }

    if (!polygon) {
        const outageLat = parseInt(outageCoords.lat.toFixed(5));
        const outageLng = parseInt(outageCoords.lng.toFixed(5));

        return point.lat === outageLat && point.lng === outageLng;
    }

    const num_vertices = polygon.length;
    const { lat, lng } = point;
    let isInZone = false;

    // Store the first point in the polygon and initialize the second point
    let p1 = polygon[0];
    let p2;

    if (!lat || !lng) {
        return false;
    }

    for (let i = 1; i <= num_vertices; i++) {
        p2 = polygon[i % num_vertices];

        if (isInZone || !p1.lat || !p1.lng || !p2.lat || !p2.lng) {
            break;
        }

        if (lng > Math.min(p1.lng, p2.lng)) {
            if (lng <= Math.max(p1.lng, p2.lng)) {
                if (lat <= Math.max(p1.lat, p2.lat)) {
                    const x_intersection = ((lng - p1.lng) * (p2.lat - p1.lat)) / (p2.lng - p1.lng) + p1.lat;

                    if (p1.lat === p2.lat || lat <= x_intersection) {
                        isInZone = !isInZone;
                    }
                }
            }
        }

        p1 = p2;
    }

    return isInZone;
}

/**
 * Check an email address is valid using Zod
 *
 * @param email
 * @returns {Boolean}
 */
export function isValidEmail(email: string) {
    try {
        const emailSchema = z.string().email();
        emailSchema.parse(email);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Check if data from a payload to be sent to the backend is valid (i.e. correct format & type)
 *
 * @param {string} data the data to validate
 * @param {string} dataField the type of data field (an id, location, coordinate)
 * @returns {boolean}
 */
export function isValidPayloadArgument(data: string | number, dataField: string) {
    if (typeof data  === 'undefined') {
        return false;
    }

    const regExp = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
    const dataHasInvalidChars = regExp.test(data.toString());

    const isEmptyString = typeof data === 'string' && data.length === 0;

    // Data is invalid if it contains a blacklisted character or is empty
    if (dataHasInvalidChars || isEmptyString) {
        return false;
    }

    if (dataField === 'id' && typeof data === 'string') {
        return data.length === 16 && !data.includes(' ');
    }
    if (dataField === 'location' && typeof data === 'string') {
        return data.length <= 255;
    }
    if (dataField === 'coordinate' && typeof data === 'number') {
        const validLatitude = data >= -37.99999 && data <= -37;
        const validLongtitude = data >= 174 && data <= 175.99999;

        return validLatitude || validLongtitude;
    }
    if (dataField === 'date-subscribed' && typeof data === 'string') {
        // Valid date example: 28/06/2024, 11:57:05 am
        const dateRegExp = /[0-9]{1,2}\/[0-9]{1,2}\/20[0-9]{2}, [0-9]{1,2}:[0-9]{2}:[0-9]{2} (am|pm)/g;
        const dateFormatIsValid = dateRegExp.test(data.toString());
        return data.length <= 255 && dateFormatIsValid;
    }

    // Data is invalid if it is not one of the above field types
    return false;
}
