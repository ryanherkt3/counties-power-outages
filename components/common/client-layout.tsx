'use client';

import { Inter } from 'next/font/google';
import Menu from './menu';
import FooterInfo from './footer-info';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export default function ClientLayout({ items }: { items: ReactNode; }) {
    const blockScrolling = useSelector((state: RootState) => state.noScroll.value);

    const flexClasses = 'flex flex-row justify-between items-center';
    const footerClasses = 'antialiased text-lg h-20 p-4 border-t bg-white border-gray-400 lg:hidden';

    return (
        <body
            className={
                clsx(
                    `${inter.className} antialiased relative flex flex-col lg:flex-row`,
                    {
                        'no-scroll': blockScrolling
                    }
                )
            }
        >
            <div className='lg:min-h-full lg:min-w-[400px] lg:max-w-[400px]'>
                <Menu />
            </div>
            <div className='flex flex-col'>
                {items}
                <footer className={`${flexClasses} ${footerClasses}`}>
                    <FooterInfo />
                </footer>
            </div>
        </body>
    );
}
