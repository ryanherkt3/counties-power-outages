import { Metadata } from 'next';
import { BoltSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import NotifSubForm from '@/components/notifications/notif-sub-form';

export const metadata: Metadata = {
    title: 'Manage Subscription | Counties Power Outages App',
};

export default async function SubscriptionPage({ params }: { params: Promise<{ id: string } > }) {
    const { id } = await params;

    const subReq = await fetch(process.env.API_URL + `/subscription?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
        }
    });
    const subsJson = await subReq.json();
    const subscription = subsJson.sub;

    // Early return if no subscription is found
    if (!subscription) {
        const buttonClasses = 'bg-red-600 hover:bg-red-800 text-white text-lg p-4 rounded-xl w-fit p-3 cursor-pointer';

        return (
            <div className="flex flex-col px-4 py-6 page-min-height">
                <div className="flex flex-col gap-12 py-12 my-auto items-center">
                    <div className="flex flex-col gap-6 items-center">
                        <BoltSlashIcon className="w-20 text-red-600" />
                        <div className="text-xl text-center">Could not find the requested subscription</div>
                    </div>
                    <div className="flex flex-row gap-8 items-center">
                        <Link href="/outages" className={buttonClasses}>Outages</Link>
                        <Link href="/notifications" className={buttonClasses}>Notifications</Link>
                    </div>
                </div>
            </div>
        );
    }

    const { lat, lng, location, email, datesubscribed } = subscription;

    const notifFormValues = {
        id: id,
        latitude: lat,
        longtitude: lng,
        location: location,
        email: email,
        hasCoordinates: !!(lat && lng),
        datesubscribed: datesubscribed,
    };

    return (
        <div className="flex flex-col gap-4 px-4 py-6 page-min-height">
            <div className="text-xl text-center">Manage your subscription</div>
            <NotifSubForm values={notifFormValues} onSubPage={true} />
        </div>
    );
}
