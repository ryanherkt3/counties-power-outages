import { OutageData } from "./definitions";
import { getTimesAndActiveOutage } from "./utils";

// Dynamically create outage section segments for the outage cards and outage/[id] page
export const getOutageSections = (
    uppercaseTitles: boolean,
    addNewPrefix: boolean,
    data: OutageData,
) => {
    const timesAndActiveOutage = getTimesAndActiveOutage(data.shutdownTime1, data.ShutdownDateTime);

    const shutdownTimes = timesAndActiveOutage.times;
    const outageIsPostponed = data.statusText === 'Postponed';

    const postponedDateString = 'Original Date';
    const dateString = `${outageIsPostponed ? 'New ' : ''}Date`;
    const startTimeString = uppercaseTitles ? 'START TIME' :
        (`${outageIsPostponed && addNewPrefix ? 'New ' : ''}Start Time`);
    const endTimeString = uppercaseTitles ? 'END TIME' :
        (`${outageIsPostponed && addNewPrefix ? 'New ' : ''}End Time`);
    const customersAffectedString = 'Customers Affected';

    const outageSections = outageIsPostponed ?
        [
            {
                key: 'postponed-date',
                icon: 'CalendarIcon',
                title: uppercaseTitles ? postponedDateString.toUpperCase() : postponedDateString,
                value: data.originalShutdownDate,
            }
        ]:
        [];

    outageSections.push(
        {
            key: 'outage-date',
            icon: 'CalendarIcon',
            title: uppercaseTitles ? dateString.toUpperCase() : dateString,
            value: data.shutdownDate,
        },
        {
            key: 'outage-start',
            icon: 'ClockIcon',
            title: startTimeString,
            value: shutdownTimes.startTime,
        },
        {
            key: 'outage-end',
            icon: 'ClockIcon',
            title: endTimeString,
            value: shutdownTimes.endTime,
        },
        {
            key: 'customers-affected',
            icon: 'UserIcon',
            title: uppercaseTitles ? customersAffectedString.toUpperCase() : customersAffectedString,
            value: data.affectedCustomers.toString(),
        }
    );

    return outageSections;
};
