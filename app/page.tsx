import { Metadata } from "next";
import CustomIcon from "./ui/custom-icon";

export const metadata: Metadata = {
    title: 'Home | Counties Power Outages App',
};

export default function HomePage() {
    const pageSegments = [
        {
            key: 'outages',
            icon: 'ClipboardDocumentListIcon',
            content: 'View a full list of planned outages from Counties Power on our Outages page. To make your user experience as smooth as possible, we show five outages per page and have built comprehensive searching tools to allow you to find outages of interest. The search functionality allows outages to be filtered by outage status (Scheduled, Postponed, Cancelled; and a special Active status not offered by Counties Power), outage start date (and outage end date if you want to search in a specific date range), and by whatever is entered in the search box - for example a street name.'
        },
        {
            key: 'individual-outage',
            icon: 'BoltIcon',
            content: 'View an individual outage after hovering on its title on our Outages page, and get a comprehensive breakdown of the specific outage as well as an embedded map showing the approximate location of where the outage is happening.'
        },
        {
            key: 'notifications',
            icon: 'BellAlertIcon',
            content: 'Subscribe to email alerts for notifications in your area on our Notifications page. All that is needed is your email address - no account required! You can also check for existing subscriptions on this page, and unsubscribe to any if you wish. In the future you may even be able to trigger an email alert with the click of a button, and subscribe to an alert on an Individual Outage page.'
        },
    ];

    return (
        <div className="flex flex-col gap-6 px-4 py-6 page-min-height">
            <div className="text-center text-4xl font-semibold">Counties Power Outages App</div>
            <div className="flex flex-col gap-3 text-lg">
                <p>Welcome to the Counties Power Outages App, a React application built around the power outages in the Counties Manukau region in New Zealand.</p>    
                <p>This app is not built by Counties Power, nor does it have any affiliation with the existing app they have built, which can be found <a className="visited:text-purple-500 hover:text-blue-500" href="https://app.countiespower.com/" target="_blank">here</a>.</p>    
                <p>I built this app because I was not only unsatisfied with the existing app&apos;s UI for its planned outages section, but also because when there is a planned power outage in my neighbourhood, the letter that Counties Power sends often comes with a few days notice.</p>    
                <p>So, I decided to build an app that solve both these problems by creating an easy to navigate page showing the planned outages, and a page where it is possible to subscribe to email alerts for notifications in your area.</p>    
            </div>
            <div className="text-center text-3xl font-semibold">App Features</div>
            {
                pageSegments.map((segments) => {
                    return (
                        <div key={segments.key} className="flex flex-row gap-6 items-center">
                            <CustomIcon icon={segments.icon} iconClass={"w-12 h-12 flex-shrink-0 text-red-600"} />
                            <div className="text-lg">{segments.content}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}
