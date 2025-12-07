import { Metadata } from 'next';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Unsubscribe | Counties Power Outages App',
};

export default async function UnsubscribePage({ params }: { params: Promise<{ id: string } > }) {
    const { id } = await params;

    const buttonClasses = 'flex flex-row items-center gap-2 p-3 border-1 border-red-600 hover:bg-red-600 grow ' +
        'text-red-600 hover:text-white rounded-xl cursor-pointer justify-center font-semibold';

    // If no env vars provided, redirect to not found
    if (!process.env.API_URL || !process.env.AUTH_TOKEN) {
        return notFound();
    }

    // Get the data - TODO move to server lib function
    const unSubReq = await fetch(`${process.env.API_URL}/subscription`, {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
        headers: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
        }
    });
    const unSubJson = await unSubReq.json() as { success: boolean };

    return (
        <div className="flex flex-col px-4 py-6 page-min-height">
            <div className="flex flex-col gap-12 py-12 my-auto items-center">
                <div className="flex flex-col gap-6 items-center">
                    {
                        unSubJson.success ?
                            <CheckCircleIcon className="w-20 text-red-600" /> :
                            <XCircleIcon className="w-20 text-red-600" />
                    }
                    <div className="text-xl text-center">
                        {
                            unSubJson.success ?
                                'Unsubscription process successful' :
                                'Unsubscription process failed. Try again later.'
                        }
                    </div>
                </div>
                <div className="flex flex-row gap-8 items-center flex-wrap">
                    <Link href="/" className={buttonClasses}>OUTAGES</Link>
                    <Link href="/notifications" className={buttonClasses}>NOTIFICATIONS</Link>
                </div>
            </div>
        </div>
    );
}
