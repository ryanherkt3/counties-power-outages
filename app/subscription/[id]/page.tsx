import { use } from 'react';
import { Metadata } from 'next';
import SubscriptionPageClient from '@/components/subscription/subscription-client';

export const metadata: Metadata = {
    title: 'Manage Subscription | Counties Power Outages App',
};

export default function SubscriptionPage({ params }: { params: Promise<{ id: string } > }) {
    const { id } = use(params);

    return <SubscriptionPageClient id={id} />;
}
