/* eslint-disable max-len */
import { Metadata } from 'next';
import { BoltSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { OutageData } from '../lib/definitions';

export const metadata: Metadata = {
    title: 'Manage Subscription | Counties Power Outages App',
};

export default async function Test() {
    try {
        // const req = await fetch('https://proxy-uikmffjlta-uc.a.run.app/https://api.integration.countiesenergy.co.nz/user/v1.0/outages')
        // const req = await fetch('http://127.0.0.1:5002/cors-server-outages/us-central1/https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns');

        const req = await axios.get('https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns');
        console.log(req);

        const testScrape = await axios('https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns');
        console.log(testScrape);

        const outages = req.data.planned_outages;

        // Early return if no outages fetched
        if (!outages) {
            return (
                <div className="flex flex-col px-4 py-6 page-min-height">
                    <div className="flex flex-col gap-12 py-12 my-auto items-center">
                        <div className="flex flex-col gap-6 items-center">
                            <BoltSlashIcon className="w-20 text-red-600" />
                            <div className="text-xl text-center">No outages found!</div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-4 px-4 py-6 page-min-height">
                <div className="text-xl text-center">Outages request</div>
                {
                    outages.map((outage: OutageData) => {
                        return (
                            <div key={outage.id}>
                                <div>{outage.id}</div>
                                <div>{outage.address}</div>
                            </div>
                        );
                    })
                }
                <div></div>
            </div>
        );

        // const req = await fetch('http://127.0.0.1:5001/test-cors-proxy/us-central1/cors?url=https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns');

        // const req = await fetch('https://cors-anywhere.com/https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns');

        // const resourceUrl = encodeURIComponent('https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns');
        // const resourceUrl = encodeURIComponent('https://www.nrl.com/draw/data?competition=111&round=20');
        // console.log(resourceUrl);
        // const req = await fetch(`https://test-proxy-2-two.vercel.app/proxy?url=${resourceUrl}`);
        // const req = await fetch('https://us-central1-test-cors-proxy.cloudfunctions.net/cors?url=https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns');

        // console.log(req);
        // const reqJson = await req.json();
    }
    catch (error) {
        console.error(error);
        return (
            <div className="flex flex-col px-4 py-6 page-min-height">
                <div className="flex flex-col gap-12 py-12 my-auto items-center">
                    <div className="flex flex-col gap-6 items-center">
                        <BoltSlashIcon className="w-20 text-red-600" />
                        <div className="text-xl text-center">{ `${error}` }</div>
                    </div>
                </div>
            </div>
        );
    }
}
