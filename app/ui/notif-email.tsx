import { Html, Heading, Text } from '@react-email/components';
import { NotificationSub } from '../lib/definitions';
import { getCardSections } from '../lib/outagesections';

export default function NotificationEmail({ data }: { data: NotificationSub; }) {
    // eslint-disable-next-line no-unused-vars
    const cardSections = getCardSections(true, data);

    // TODO prettify email
    return (
        <Html lang="en">
            <Heading as="h1">Upcoming Power Outage</Heading>
            <Text>Test</Text>
        </Html>
    );
}
