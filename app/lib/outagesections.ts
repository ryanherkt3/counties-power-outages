import { NotificationSub, OutageData } from './definitions';
import { getTimesAndActiveOutage } from './utils';

/**
 * Dynamically create outage section segments for the outage cards and outage/[id] page
 *
 * @param {boolean} uppercaseTitles if the outage info titles are in all caps or not
 * @param {boolean} addNewPrefix whether to add 'New' before the info titles (when an outage is postponed)
 * @param {OutageData} data info about the outage
 * @returns {Object} outage section segments
 */
export function getOutageSections(uppercaseTitles: boolean, addNewPrefix: boolean, data: OutageData) {
    const timesAndActiveOutage = getTimesAndActiveOutage(data.shutdownperiods[0].start, data.shutdownperiods[0].end);

    const shutdownTimes = timesAndActiveOutage.times;
    const outageIsPostponed = data.statustext === 'Postponed';

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
                value: data.originalshutdowndate,
            }
        ]:
        [];

    outageSections.push(
        {
            key: 'outage-date',
            icon: 'CalendarIcon',
            title: uppercaseTitles ? dateString.toUpperCase() : dateString,
            value: data.shutdowndate,
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
            value: data.affectedcustomers.toString(),
        }
    );

    return outageSections;
}

/**
 * Get the sections for display either for the active notifications card or the notification email
 *
 * @param {OutageData} data info about the outage
 * @returns {Object} card sections
 */
export function getCardSections(data: NotificationSub) {
    const { lat, lng, datesubscribed, email } = data;

    const cardSections = [
        {
            key: 'email',
            icon: 'AtSymbolIcon',
            title: 'Email',
            value: email
        }
    ];

    if (lat && lng) {
        cardSections.push(
            {
                key: 'coordinates',
                icon: 'MapPinIcon',
                title: 'Coordinates',
                value: `${lat}, ${lng}`
            },
        );
    }

    cardSections.push(
        {
            key: 'date-subbed',
            icon: 'CalendarIcon',
            title: 'Date Subscribed',
            value: datesubscribed
        },
        {
            key: 'location-planned-outage',
            icon: 'BoltIcon',
            title: 'Planned Outages in Area',
            value: ''
        }
    );

    return cardSections;
}
