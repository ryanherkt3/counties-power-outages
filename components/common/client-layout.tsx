'use client';

import { Inter } from 'next/font/google';
import Header from './header';
import Footer from './footer';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export default function ClientLayout({ items }: {items: ReactNode;}) {
    const blockScrolling = useSelector((state: RootState) => state.noScroll.value);

    return (
        <body
            className={
                clsx(
                    `${inter.className} antialiased relative`,
                    {
                        'no-scroll': blockScrolling
                    }
                )
            }
        >
            <Header />
            {items}
            <Footer />
        </body>
    );
}
