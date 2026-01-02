import { Coordinate, OutageData, SearchParams } from './definitions';
import moment from 'moment-timezone';

/**
 * Return if an outage is active or not by checking if the current time is greater than
 * the outage's start time
 *
 * @param {string} dateStr
 * @returns {Boolean}
 */
export function isOutageActive(dateStr: string) {
    const outageTime = moment.tz(dateStr, 'Pacific/Auckland').unix();
    const serverTime = moment.tz(new Date().toISOString(), 'Pacific/Auckland').unix();

    return serverTime >= outageTime;
}

/**
 * Return whether the outage has expired or not by checking if the current time is greater than
 * the outage's end time
 *
 * @param {string} dateStr
 * @returns {boolean}
 */
export function isOutageExpired(dateStr: string) {
    const outageTime = moment.tz(dateStr, 'Pacific/Auckland').unix();
    const serverTime = moment.tz(new Date().toISOString(), 'Pacific/Auckland').unix();

    return serverTime >= outageTime;
}

/**
 * Get the time strings (e.g. 9:00 AM, 3:00 PM)
 *
 * @param {Array<string>} splitTime [hour, minute]
 * @returns {string} the time string
 */
export function getTimeStrings(splitTime: string[]) {
    let hourlySegment = splitTime[0];
    const minuteSegment = splitTime[1];

    if (parseInt(hourlySegment) >= 12) {
        hourlySegment = parseInt(hourlySegment) === 12 ? '12' : (parseInt(hourlySegment) - 12).toString();
        return `${hourlySegment}:${minuteSegment} PM`;
    }

    hourlySegment = parseInt(hourlySegment) === 0 ? '12' : parseInt(hourlySegment).toString();
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

    // If the outage has passed, do not show it
    if (isOutageExpired(endTime)) {
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
        activeOutage: isOutageActive(startTime),
        expiredOutage: false,
        times: {
            startTime: getTimeStrings(startTimeString.split(':')),
            endTime: getTimeStrings(endTimeString.split(':')),
        }
    };
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
export function getFilteredOutages(outages: OutageData[], searchParams: SearchParams | null) {
    // Return original list if no search parameters
    if (searchParams === null) {
        return outages;
    }

    const address = searchParams.query;
    const outageStatus = searchParams.status;
    const startDate = searchParams.startdate;
    const endDate = searchParams.enddate;

    // Return original list search parameters are empty
    if (!address && !outageStatus && !startDate && !endDate) {
        return outages;
    }

    const getDateMatch = (outage: OutageData, date: string, isStartDate: boolean) => {
        if (outage.shutdownDateTime) {
            const shutdownDateTime = new Date(outage.shutdownDateTime).getTime();
            const filterDateTime = new Date(date.split('/').reverse().join('/')).getTime();

            if (isStartDate) {
                return shutdownDateTime >= filterDateTime;
            }
            return shutdownDateTime <= filterDateTime;
        }

        return false;
    };

    // Otherwise return filtered outages
    const filteredOutages = outages.filter((outage: OutageData) => {
        const matchesAddress = outage.address ?
            (address ? outage.address.toLowerCase().includes(address) : true) :
            false;
        const matchesStatus = outageStatus ? outage.statusText.toLowerCase().includes(outageStatus) : true;
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
 * @source https://www.geeksforgeeks.org/dsa/how-to-check-if-a-given-point-lies-inside-a-polygon/
 * @param {Coordinate} point the coordinates of the subscription
 * @param {Array<Coordinate>} polygon
 * @param {Coordinate} outageCoords the coordinates of where the outage is happening
 * @returns {Boolean}
 */
export function coordIsInOutageZone(point: Coordinate, polygon: Coordinate[], outageCoords: Coordinate) {
    if (!outageCoords.lat || !outageCoords.lng) {
        return false;
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

    // Loop through each edge in the polygon
    for (let i = 1; i <= num_vertices; i++) {
        p2 = polygon[i % num_vertices];
        const latitude = lat as number;
        const longtitude = lng as number;
        const p1Lat = p1.lat as number;
        const p1Lng = p1.lng as number;
        const p2Lat = p2.lat as number;
        const p2Lng = p2.lng as number;

        // Only check if both points have a latitude and longtitude
        if (p1.lat && p1.lng && p2.lat && p2.lng) {
            // Check if the point is above the minimum y coordinate of the edge
            if (longtitude > Math.min(p1Lng, p2Lng)) {
                // Check if the point is below the maximum y coordinate of the edge
                if (longtitude <= Math.max(p1Lng, p2Lng)) {
                    // Check if the point is to the left of the maximum x coordinate of the edge
                    if (lat as number <= Math.max(p1.lat as number, p2.lat as number)) {
                        // Calculate the x-intersection of the line connecting the point to the edge
                        const x_intersection = ((longtitude - p1Lng) * (p2Lat - p1Lat)) / (p2Lng - p1Lng) + p1Lat;

                        // Check if the point is on the same line as the edge or to the left of the x-intersection
                        if (p1.lat === p2.lat || latitude <= x_intersection) {
                            isInZone = !isInZone;
                        }
                    }
                }
            }
        }

        // Store the current point as the first point for the next iteration
        p1 = p2;
    }

    return isInZone;
}

/**
 * Check an email address is valid
 *
 * @param {string} email
 * @returns {Boolean}
 */
export function isValidEmail(email: string) {
    try {
        const emailRegex =
            /^(?!\.)(?!.*\.\.)([A-Z0-9_'+-.]*)[A-Z0-9_'+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;

        return emailRegex.test(email);
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

    const regExp = /[-’`~!#*$@_%+=.^&(){}[\]|;”<>?\\]/g;
    const dataHasInvalidChars = regExp.test(data.toString());

    const isEmptyString = typeof data === 'string' && data.length === 0;

    // Data is invalid if it contains a blacklisted character or is empty
    if ((!dataField.includes('coordinate') && dataHasInvalidChars) || isEmptyString) {
        return false;
    }

    if (dataField === 'id' && typeof data === 'string') {
        return data.length === 16 && !data.includes(' ');
    }
    if (dataField === 'location' && typeof data === 'string') {
        return data.length <= 255;
    }
    if (dataField.includes('coordinate') && typeof data === 'number') {
        if (dataField.includes('-lat')) {
            return data >= -37.99999 && data <= -37;
        }
        else if (dataField.includes('-lng')) {
            return data >= 174 && data <= 175.99999;
        }
    }
    if (dataField === 'date-subscribed' && typeof data === 'string') {
        // Valid date example: 28/06/2024, 11:57:05 am
        const dateRegExp = /[0-9]{1,2}\/[0-9]{1,2}\/20[0-9]{2}, [0-9]{1,2}:[0-9]{2}:[0-9]{2} (am|pm)/g;
        const dateFormatIsValid = dateRegExp.test(data);
        return data.length <= 255 && dateFormatIsValid;
    }

    // Data is invalid if it is not one of the above field types
    return false;
}
