import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './ui/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: '%s | Counties Power Outages App',
        default: 'Counties Power Outages App',
    },
    description: 'Counties Power Outages App by Ryan H',
};

export default function RootLayout({ children, }: {children: React.ReactNode;}) {
    const currentYear = new Date().getFullYear();

    const footerClasses = 'antialiased text-lg flex flex-row h-20 p-4 justify-between items-center border-t';
    const colourClasses = 'bg-white border-gray-400';

    return (
        <html lang="en">
            <body className={`${inter.className} antialiased relative`}>
                <Navigation />
                {children}
                <footer
                    className={
                        `${inter.className} ${footerClasses} ${colourClasses}`
                    }
                >
                    <div>&copy; Ryan Herkt {currentYear}</div>
                    <a className="visited:text-purple-500 hover:text-blue-500"
                        href="https://github.com/ryanherkt3/counties-power-outages/"
                        target="_blank">
                        <span>Github</span>
                    </a>
                </footer>
            </body>
        </html>
    );
}
