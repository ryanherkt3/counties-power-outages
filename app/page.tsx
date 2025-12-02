import { getActiveOutages } from '../lib/utils';
import { Metadata } from 'next';
import OutagesList from '../components/outages-list';
import { PromiseSearchParams } from '@/lib/definitions';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Outages | Counties Power Outages App',
};

export default async function OutagesPage(props: { searchParams: PromiseSearchParams }) {
    const searchParams = await props.searchParams;

    if (!searchParams) {
        return notFound();
    }

    const outages = await getActiveOutages();

    return (
        <OutagesList searchParams={searchParams} outages={outages} />
    );
}
