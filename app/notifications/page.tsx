import { Metadata } from 'next';
import NotificationsClient from '@/components/notifications/notifications-client';

export const metadata: Metadata = {
    title: 'Notifications | Counties Power Outages App',
};

export default function NotificationsPage() {
    return <NotificationsClient />;
}
