
import { Html, Text, Section, Body, Container, Head, Link } from '@react-email/components';
import { OutageData } from '../lib/definitions';
import { CSSProperties } from 'react';
import content from '../app/content.json';

export default function NotificationEmail(
    {
        notifSubId,
        outage,
        startTime,
        endTime,
        oldStatus
    }:
    {
        notifSubId: string;
        outage: OutageData;
        startTime: string,
        endTime: string,
        oldStatus: string
    }
) {
    const mainBodyText = oldStatus ? content['notif-email-new'] : content['notif-email-changed'];

    const unsubLink = `https://outages.ryanherkt.com/unsubscribe/${notifSubId}`;

    return (
        <Html lang="en">
            <Head />
            <Body style={main}>
                <Container style={container}>
                    <Section style={paddedSection}>
                        <Text style={heading}>Counties Power Outages</Text>
                        <Text style={paragraph}>{mainBodyText}</Text>
                    </Section>

                    <Section style={paddedSection}>
                        <Text style={paragraph}>
                            <b>Outage ID:</b>{' '}
                            <Link href={`https://outages.ryanherkt.com/outages?outage=${outage.id}`}>{outage.id}</Link>
                        </Text>
                        {/* TODO use OutageStatus components here */}
                        <Text style={paragraph}><b>Status:</b>{' '}{outage.statustext}</Text>
                        { oldStatus ? <Text style={paragraph}><b>Old Status:</b>{' '}{oldStatus}</Text> : null }
                        <Text style={paragraph}><b>Location:</b>{' '}{outage.address}</Text>
                        <Text style={paragraph}><b>Date:</b>{' '}{outage.shutdowndate}</Text>
                        <Text style={paragraph}><b>Start Time:</b>{' '}{startTime}</Text>
                        <Text style={paragraph}><b>End Time:</b>{' '}{endTime}</Text>
                    </Section>

                    <Section style={paddedSection}>
                        <Text style={paragraph}>
                            To unsubscribe from these notifications, click <a href={unsubLink}>here</a>.</Text>
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
