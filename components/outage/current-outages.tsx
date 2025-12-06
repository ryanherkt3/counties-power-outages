import { OutageDBData } from '../../lib/definitions';
import OutageCard from './outage-card';

export default function CurrentOutages(
    {
        currentPage,
        outages,
        outagesPerPage,
        currentPageIsLast,
    }:
    {
        currentPage: number;
        outages: Array<OutageDBData>;
        outagesPerPage: number;
        currentPageIsLast: boolean;
    }
) {
    const firstOutageIndex = outagesPerPage * (currentPage - 1);
    const lastOutageIndex = currentPageIsLast ? (outages.length - 1) : (firstOutageIndex + outagesPerPage - 1);

    const filteredOutages = outages.slice(firstOutageIndex, lastOutageIndex + 1);

    return (
        filteredOutages.map((outage : OutageDBData) => {
            return (
                <OutageCard key={outage.id} data={outage} />
            );
        })
    );
}
