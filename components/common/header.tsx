'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { update } from '@/state/no-scroll/noScroll';

export default function Header() {
    const pathname = usePathname();
    const dispatch = useDispatch();

    // States for the mobile nav menu
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const [isMobileScreenSet, setIsMobileScreenSet] = useState(false);

    const toggleMobileNavOpen = () => {
        setMobileNavOpen(!mobileNavOpen);
        dispatch(update(!mobileNavOpen));
    };

    // Reset the state of mobileNavOpen when going to another page
    const resetMobileNavOpen = () => {
        if (mobileNavOpen) {
            setTimeout(() => {
                setMobileNavOpen(false);
            }, 300);
        }
    };

    // Check if the mobile nav can be opened
    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth <= 768);
            if (window.innerWidth > 768 && mobileNavOpen) {
                setMobileNavOpen(false);
                dispatch(update(false));
            }
        };

        if (!isMobileScreenSet) {
            setIsMobileScreen(window.innerWidth <= 768);
        }
        setIsMobileScreenSet(true);

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobileScreenSet, mobileNavOpen]);

    const rightLinks = [
        {
            href: '/outages',
            linkName: 'Outages'
        },
        {
            href: '/notifications',
            linkName: 'Notifications'
        }
    ];

    return (
        <header
            className="flex sticky top-0 h-20 p-4 items-center justify-between border-b border-gray-400 bg-white z-10"
        >
            <div>
                <Link
                    href="/"
                    className={
                        clsx(
                            'text-xl font-semibold text-black hover:text-red-400',
                            {
                                'text-red-600 hover:text-red-400': pathname === '/',
                            },
                        )
                    }
                >
                    <span>Counties Power Outages App</span>
                </Link>
            </div>
            <div className={
                clsx(
                    'md:flex md:flex-row md:gap-3 max-md:hidden',
                    {
                        'absolute-nav': mobileNavOpen && isMobileScreen,
                    }
                )
            }>
                {
                    rightLinks.map((rightLink) => {
                        const { href, linkName } = rightLink;

                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={resetMobileNavOpen}
                                className={
                                    clsx(
                                        'text-xl font-semibold text-black hover:text-red-400',
                                        {
                                            'text-red-600 hover:text-red-400': pathname === href,
                                        },
                                    )
                                }
                            >
                                <span>{linkName}</span>
                            </Link>
                        );
                    })
                }
            </div>
            <div className='md:hidden'>
                {
                    (mobileNavOpen ?
                        <XMarkIcon className="cursor-pointer w-8" onClick={toggleMobileNavOpen.bind(null)} /> :
                        <Bars3Icon className="cursor-pointer w-8" onClick={toggleMobileNavOpen.bind(null)} />
                    )
                }
            </div>
        </header>
    );
}
