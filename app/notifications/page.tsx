import { Metadata } from 'next';
import NotificationsClient from '@/components/notifications/notifications-client';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Notifications | Counties Power Outages App',
};

export default function NotificationsPage() {
    return (
        <Suspense>
            <NotificationsClient />
        </Suspense>
    );
}
