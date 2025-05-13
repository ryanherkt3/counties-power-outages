/* eslint-disable max-len */
import { Html, Text, Section, Body, Container, Head } from '@react-email/components';
import { OutageData } from '../lib/definitions';
import { CSSProperties } from 'react';
import { getTimesAndActiveOutage } from '../lib/utils';

export default function NotificationEmail({ notifSubId, outage }: { notifSubId: string; outage: OutageData }) {
    const shutdownPeriods = outage.shutdownperiods[0];
    const outageTimes = getTimesAndActiveOutage(shutdownPeriods.start, shutdownPeriods.end);

    return (
        <Html lang="en">
            <Head />
            <Body style={main}>
                <Container style={container}>
                    <Section style={paddedSection}>
                        <Text style={heading}>Counties Power Outages</Text>
                        <Text style={paragraph}>There is a upcoming planned power outage which may be in the location you subscribed to notifications for.</Text>
                    </Section>

                    <Section style={paddedSection}>
                        <Text style={paragraph}><b>Location:</b>{' '} {outage.address}</Text>
                        <Text style={paragraph}><b>Date:</b>{' '} {outage.shutdowndate}</Text>
                        <Text style={paragraph}><b>Start Time:</b>{' '} {outageTimes.times.startTime}</Text>
                        <Text style={paragraph}><b>End Time:</b>{' '} {outageTimes.times.endTime}</Text>
                    </Section>

                    {/* TODO add link to view the outage */}
                    <Section style={paddedSection}>
                        <Text style={paragraph}>To unsubscribe from these notifications, click <a href={`https://outages.ryanherkt.com/unsubscribe?id=${notifSubId}`}>here</a>.</Text>
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
    fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const container: CSSProperties = {
    margin: '0 auto',
    backgroundColor: '#fff',
    overflow: 'hidden',
};
