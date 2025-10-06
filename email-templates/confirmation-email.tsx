import { Html, Text, Section, Body, Container, Head } from '@react-email/components';
import { NotificationSub } from '../lib/definitions';
import { CSSProperties } from 'react';
import content from '../app/content.json';

export default function ConfirmationEmail({ subData } : { subData: NotificationSub; }) {
    const { id, location, datesubscribed } = subData;

    const unsubLink = <a href={`https://outages.ryanherkt.com/unsubscribe/${id}`}>here</a>;

    return (
        <Html lang="en">
            <Head />
            <Body style={main}>
                <Container style={container}>
                    <Section style={paddedSection}>
                        <Text style={heading}>Counties Power Outages</Text>
                        <Text style={paragraph}>
                            Here are the details for the outage notification you just subscribed to:
                        </Text>
                    </Section>

                    <Section style={paddedSection}>
                        <Text style={paragraph}><b>Location:</b>{' '}{location}</Text>
                        <Text style={paragraph}><b>Date Subscribed:</b>{' '}{datesubscribed}</Text>
                    </Section>

                    <Section style={paddedSection}>
                        <Text style={paragraph}>
                            { content['sub-confirm-email-unsub'].replace('$unsubLink', '') }{ unsubLink }.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const paddedSection: CSSProperties  = {
    padding: '0 12px'
};

const paragraph: CSSProperties = {
    fontSize: '14px',
    lineHeight: '22px'
};

const heading: CSSProperties = {
    color: 'red',
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: '700'
};

const main: CSSProperties = {
    backgroundColor: '#dbddde',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const container: CSSProperties = {
    margin: '0 auto',
    backgroundColor: '#fff',
    overflow: 'hidden',
};
