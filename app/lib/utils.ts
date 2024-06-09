export const isOutageActive = (
    dateStr: string,
    startHour: number,
) => {
    const outageStartDate = new Date(dateStr);
    outageStartDate.setHours(startHour);
    
    const currentDate = new Date();

    return currentDate.getTime() >= outageStartDate.getTime();
};

export const getTimesAndActiveOutage = (
    time: string,
    shutdownDate: string
) => {
    let newTimes: string[] = [];
    let newTimeString = time.split(' - ');

    // Get start hour and check if outage is accurate
    const startHour = newTimeString[0].split(':')[0];
    const activeOutage = isOutageActive(shutdownDate, parseInt(startHour));
    
    newTimeString.map((newTime : string) => {
        const timeSegments = newTime.split(':');
        let hourlySegment = timeSegments[0];
        const minuteSegment = timeSegments[1];

        if (parseInt(hourlySegment) >= 12) {
            hourlySegment = parseInt(hourlySegment) === 12 ? '12' : `${parseInt(hourlySegment) - 12}`;
            newTimes.push(`${hourlySegment}:${minuteSegment} PM`);
        }
        else {
            hourlySegment = parseInt(hourlySegment) === 12 ? '12' : `${parseInt(hourlySegment)}`;
            newTimes.push(`${hourlySegment}:${minuteSegment} AM`);
        }
    });

    return {
        activeOutage: activeOutage,
        times: {
            startTime: newTimes[0],
            endTime: newTimes[1],
        }
    };
}

// TODO fix
export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};
