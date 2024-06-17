import { OutageData } from "./definitions";

export const isOutageActive = (
    dateStr: string,
    startHour: number,
) => {
    const outageStartDate = new Date(dateStr);
    outageStartDate.setHours(startHour);
    
    const currentDate = new Date();

    return currentDate.getTime() >= outageStartDate.getTime();
};

export const isOutageExpired = (
    dateStr: string,
    startHour: number,
    endHour: number,
    endMinute: number,
) => {
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
};

export const getTimeStrings = (
    splitTime: Array<string>
) => {
    let hourlySegment = splitTime[0];
    const minuteSegment = splitTime[1];

    if (parseInt(hourlySegment) >= 12) {
        hourlySegment = parseInt(hourlySegment) === 12 ? '12' : `${parseInt(hourlySegment) - 12}`;
        return `${hourlySegment}:${minuteSegment} PM`;
    }

    hourlySegment = parseInt(hourlySegment) === 12 ? '12' : `${parseInt(hourlySegment)}`;
    return `${hourlySegment}:${minuteSegment} AM`;
}

export const getTimesAndActiveOutage = (
    time: string,
    shutdownDate: string
) => {
    let newTimes: string[] = [];
    let newTimeString = time.split(' - ');

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
        }
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

export const getActiveOutages = async () => {
    // TODO deprecate corsproxy until workaround is found
    // const apiUrl = "http://127.0.0.1:8080/api/getoutages";
    const apiUrl = "https://corsproxy.io/?https://app.countiespower.com/api/v300/outages/range/current";
    const outagesReq = await fetch(apiUrl);
    const outagesJson = await outagesReq.json();
    let outages = outagesJson.planned_outages
    
    outages.map((outage: { expiredOutage: boolean; statusText: string; shutdownTime1: string; ShutdownDateTime: string; }) => {
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

// TODO improve filtering (second argument)
export const getFilteredOutages = (
    outages: any,
    query: string
) => {
    // Return original list if no query
    if (!query) {
        return outages;
    }
    
    // TODO: add support for searching by status, date etc
    const filteredOutages = outages.filter((outage: OutageData) => {
        return outage.address.toLowerCase().includes(query);
    });

    return filteredOutages;
}

export const getOutageByID = (
    outages: any,
    id: string
) => {
    // Return original list if no query
    if (!id) {
        return false;
    }
    
    const outage = outages.filter((outage: OutageData) => {
        return outage.id === id;
    });

    return outage;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
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
  };
