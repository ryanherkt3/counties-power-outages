import Link from 'next/link';
import { BoltIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
    return (
        <main className="flex flex-col gap-4 py-10 items-center justify-center page-min-height">
            <BoltIcon className="w-20 text-red-600" />
            <div className="text-2xl font-semibold">404 Not Found</div>
            <div className="text-lg text-center">Could not find the requested outage</div>
            <Link
                href="/outages"
                className="mt-4 rounded-md bg-red-600 px-6 py-4 text-lg text-white transition-colors hover:bg-red-400"
            >
                Go to Outages Page
            </Link>
        </main>
    );
}