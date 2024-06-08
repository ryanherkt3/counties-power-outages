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

    let newTimeString = time
        .replaceAll(':00', '')
        .replaceAll(':15', '')
        .replaceAll(':30', '')
        .replaceAll(':45', '')
        .split(' - ');

    const activeOutage = isOutageActive(shutdownDate, parseInt(newTimeString[0]));
    
    newTimeString.map((newTime : string) => {
        let newTimeAsNum = parseInt(newTime);

        if (newTimeAsNum >= 12) {
            newTimeAsNum = newTimeAsNum === 12 ? 12 : newTimeAsNum - 12;
            newTimes.push(`${newTimeAsNum} PM`);
        }
        else {
            newTimeAsNum = newTimeAsNum === 0 ? 12 : newTimeAsNum;
            newTimes.push(`${newTimeAsNum} AM`);
        }
    });

    return {
        activeOutage: activeOutage,
        times: newTimes
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
