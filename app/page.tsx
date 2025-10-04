import { Metadata } from 'next';
import CustomIcon from '../components/custom-icon';
import content from './content.json';

export const metadata: Metadata = {
    title: 'Home | Counties Power Outages App',
};

export default function HomePage() {
    const pageSegments = [
        {
            key: 'outages',
            icon: 'ClipboardDocumentListIcon',
            content: content.outages,
        },
        {
            key: 'individual-outage',
            icon: 'BoltIcon',
            content: content['individual-outage'],
        },
        {
            key: 'notifications',
            icon: 'BellAlertIcon',
            content: content.notifications,
        },
    ];

    return (
        <div className="flex flex-col gap-6 px-4 py-6 page-min-height">
            <div className="text-center text-4xl font-semibold">Counties Power Outages App</div>
            <div className="flex flex-col gap-3 text-lg">
                <p>{content['intro-1']}</p>
                <p>{content['intro-2']}</p>
                <p>{content['intro-3']}</p>
                <p>{content['intro-4']}</p>
            </div>
            <div className="text-center text-3xl font-semibold">App Features</div>
            {
                pageSegments.map((segments) => {
                    const { key, icon, content } = segments;

                    return (
                        <div key={key} className="flex flex-row gap-6 items-center">
                            <CustomIcon icon={icon} iconClass={'w-12 h-12 flex-shrink-0 text-red-600'} />
                            <div className="text-lg">{content}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}
