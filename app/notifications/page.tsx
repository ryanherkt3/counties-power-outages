import { Metadata } from 'next';
import { WrenchIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Notifications',
};

export default function NotificationsPage() {
    return (
        <div className="flex flex-col gap-12 py-12 my-auto items-center justify-center page-min-height">
            <WrenchIcon className="w-20 text-red-600" />
            <div className="text-xl text-center">Page under construction, come back later</div>
        </div>
    );
}
