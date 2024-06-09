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
