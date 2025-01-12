import { Html, Heading, Text } from '@react-email/components';
import { NotificationSub } from '../lib/definitions';

export default function NotificationEmail({ data }: { data: NotificationSub; }) {
    const { lat, lng, datesubscribed, email } = data;
    // eslint-disable-next-line no-unused-vars
    const cardSections = [
        {
            key: 'email',
            icon: 'AtSymbolIcon',
            title: 'Email',
            value: email
        },
        {
            key: 'coordinates',
            icon: 'MapPinIcon',
            title: 'Coordinates',
            value: `${lat}, ${lng}`
        },
        {
            key: 'date-subbed',
            icon: 'CalendarIcon',
            title: 'Date Subscribed',
            value: datesubscribed
        }
    ];

    // TODO prettify email
    return (
        <Html lang="en">
            <Heading as="h1">Upcoming Power Outage</Heading>
            <Text>Test</Text>
        </Html>
    );
}
