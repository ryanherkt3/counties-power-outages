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
) => {
    const outageEndDate = new Date(dateStr);
    outageEndDate.setHours(endHour);
    
    // Set end date to next day if start hour is greater than the end hour,
    // and the end hour is the next morning
    if (startHour >= 12 && endHour < 12) {
        outageEndDate.setDate(outageEndDate.getDate() + 1);
    }
    
    const currentDate = new Date();

    return currentDate.getTime() >= outageEndDate.getTime();
};

export const getTimesAndActiveOutage = (
    time: string,
    shutdownDate: string
) => {
    let newTimes: string[] = [];
    let newTimeString = time.split(' - ');

    // Get start hour and check if outage is accurate
    const startHour = newTimeString[0].split(':')[0];
    const endHour = newTimeString[1].split(':')[0];

    // If the outage has passed, do not show it
    if (isOutageExpired(shutdownDate, parseInt(startHour), parseInt(endHour))) {
        return false;
    }

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
