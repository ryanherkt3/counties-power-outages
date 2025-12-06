import { NotificationSub, OutageData } from './definitions';
import { getTimesAndActiveOutage } from './utils';

/**
 * Dynamically create outage section segments for the outage cards and outage/[id] page
 *
 * @param {boolean} uppercaseTitles if the outage info titles are in all caps or not
 * @param {boolean} addNewPrefix whether to add 'New' before the info titles (when an outage is postponed)
 * @param {OutageDBData} data info about the outage
 * @returns {Object} outage section segments
 */
export function getOutageSections(uppercaseTitles: boolean, addNewPrefix: boolean, data: OutageData) {
    if (data.dummyData) {
        return [];
    }

    const timesAndActiveOutage = data.shutdownPeriodStart && data.shutdownPeriodEnd ?
        getTimesAndActiveOutage(data.shutdownPeriodStart, data.shutdownPeriodEnd) :
        {
            activeOutage: false,
            expiredOutage: false,
            times: {
                startTime: '',
                endTime: '',
            }
        };

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
            value: data.affectedCustomers ? data.affectedCustomers.toString() : '',
        }
    );

    return outageSections;
}

/**
 * Get the sections for display either for the active notifications card or the notification email
 *
 * @param {OutageDBData} data info about the outage
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
