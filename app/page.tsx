import { Suspense } from "react";
import Outage from "./ui/outage";
import { OutageData } from "./lib/definitions";

export default async function Home() {
    // TODO figure out a way to request data without using corsproxy.io
    const outagesReq = await fetch("https://corsproxy.io/?https://app.countiespower.com/api/v300/outages/range/current", {  
        next: {
            revalidate: false
        }
    });
    const outagesJson = await outagesReq.json();
    const outages = outagesJson.planned_outages;
    
    return (
        <main className="flex min-h-screen flex-col gap-6 px-4 py-6">
            <Suspense fallback={<p>Loading...</p>}>
                {
                    outages.map((outage : OutageData) => {
                        return (
                            <Outage key={outage.id} data={outage} />
                        )
                    })
                }
            </Suspense>
        </main>
    );
}
