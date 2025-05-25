/* eslint-disable max-len */
import { Html, Text, Section, Body, Container, Head } from '@react-email/components';
import { OutageData } from '../lib/definitions';
import { CSSProperties } from 'react';

export default function NotificationEmail(
    {
        notifSubId,
        outage,
        startTime,
        endTime
    }:
    {
        notifSubId: string;
        outage: OutageData;
        startTime: string,
        endTime: string
    }
) {
    // TODO different email for when the outage status has changed (to Postponed/Cancelled)
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
                        {/* TODO add link/functionality to view the outage w/o messing with the search params functionality */}
                        <Text style={paragraph}><b>Outage ID:</b>{' '}{outage.id}</Text>
                        <Text style={paragraph}><b>Status:</b>{' '}{outage.statustext}</Text>
                        <Text style={paragraph}><b>Location:</b>{' '}{outage.address}</Text>
                        <Text style={paragraph}><b>Date:</b>{' '}{outage.shutdowndate}</Text>
                        <Text style={paragraph}><b>Start Time:</b>{' '}{startTime}</Text>
                        <Text style={paragraph}><b>End Time:</b>{' '}{endTime}</Text>
                    </Section>

                    {/* TODO change this link */}
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
