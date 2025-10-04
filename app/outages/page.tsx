import { getActiveOutages } from '../../lib/utils';
import { Metadata } from 'next';
import OutagesList from '../../components/outages-list';

export const metadata: Metadata = {
    title: 'Outages List | Counties Power Outages App',
};

type PromiseSearchParams = Promise<{
    query: string | undefined,
    page: string | undefined,
    status: string | undefined,
    startdate: string | undefined,
    enddate: string | undefined,
    outage: string | undefined,
}>

export default async function OutagesPage(props: {
    searchParams: PromiseSearchParams
}) {
    const outages = await getActiveOutages();
    const searchParams = await props.searchParams;

    return (
        <OutagesList searchParams={searchParams} outages={outages} />
    );
}
