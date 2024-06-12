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

export const getFilteredOutages = async () => {
    const apiUrl ="http:127.0.0.1:8080/api/getoutages";
    const outagesReq = await fetch(apiUrl);
    const outagesJson = await outagesReq.json();
    let outages = outagesJson.planned_outages
    
    outages.map((outage: { expiredOutage: boolean; shutdownTime1: string; ShutdownDateTime: string; }) => {
        outage.expiredOutage = getTimesAndActiveOutage(outage.shutdownTime1, outage.ShutdownDateTime).expiredOutage;
    });

    outages = outages.filter((outage: { expiredOutage: boolean; }) => {
        return outage.expiredOutage === false;
    });

    return outages;
}
