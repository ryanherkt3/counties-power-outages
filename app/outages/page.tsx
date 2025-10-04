import { getActiveOutages } from '../../lib/utils';
import { Metadata } from 'next';
import OutagesList from '../../components/outages-list';
import { PromiseSearchParams } from '@/lib/definitions';

export const metadata: Metadata = {
    title: 'Outages List | Counties Power Outages App',
};

export default async function OutagesPage(props: {
    searchParams: PromiseSearchParams
}) {
    const outages = await getActiveOutages();
    const searchParams = await props.searchParams;

    return (
        <OutagesList searchParams={searchParams} outages={outages} />
    );
}
