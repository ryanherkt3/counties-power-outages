'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './ui/navigation';
import { Provider } from 'react-redux';
import { store } from './state/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children, }: {children: React.ReactNode;}) {
    const currentYear = new Date().getFullYear();

    const footerClasses = 'antialiased text-lg flex flex-row h-20 p-4 justify-between items-center border-t';

    return (
        <Provider store={store}>
            <html lang="en">
                <body className={`${inter.className} antialiased relative`}>
                    <Navigation />
                    {children}
                    <footer className={`${inter.className} ${footerClasses} bg-white border-gray-400`}>
                        <div>&copy; Ryan Herkt {currentYear}</div>
                        <a className="visited:text-purple-500 hover:text-blue-500 text-blue-500"
                            href="https://github.com/ryanherkt3/counties-power-outages/"
                            target="_blank">
                            <span>Github</span>
                        </a>
                    </footer>
                </body>
            </html>
        </Provider>
    );
}
