import { OutageData } from "../lib/definitions";
import Outage from "./outage";

export default function CurrentOutages({
    currentPage,
    outages,
    outagesPerPage,
    currentPageIsLast,
  }: {
    currentPage: number;
    outages: any;
    outagesPerPage: number;
    currentPageIsLast: boolean;
  }
) {
    const firstOutageIndex = outagesPerPage * (currentPage - 1);
    const lastOutageIndex = currentPageIsLast ? (outages.length - 1) : (firstOutageIndex + outagesPerPage - 1);

    const filteredOutages = outages.slice(firstOutageIndex, lastOutageIndex + 1);
    
    return (
        filteredOutages.map((outage : OutageData) => {
            return (
                <Outage key={outage.id} data={outage} />
            )
        })
    )
}
