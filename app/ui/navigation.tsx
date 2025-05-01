/* eslint-disable @typescript-eslint/no-unsafe-function-type */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SkeletonNavBar from './skeletons/skeleton-nav-bar';

export default function Navigation() {
    const pathname = usePathname();

    // States for the mobile nav menu
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const [isMobileScreenSet, setIsMobileScreenSet] = useState(false);

    const toggleMobileNavOpen = () => {
        setMobileNavOpen(!mobileNavOpen);
        document.querySelector('body')?.classList.toggle('no-scroll', !mobileNavOpen);
    };

    // Reset the state of mobileNavOpen when going to another page
    const resetMobileNavOpen = () => {
        if (mobileNavOpen) {
            setTimeout(() => {
                setMobileNavOpen(false);
                document.querySelector('body')?.classList.remove('no-scroll');
            }, 300);
        }
    };

    // Check if the mobile nav can be opened
    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth <= 768);
            if (window.innerWidth > 768 && mobileNavOpen) {
                setMobileNavOpen(false);
                document.querySelector('body')?.classList.remove('no-scroll');
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

    // Show a temporary skeleton nav while figuring out if the device is a mobile one or not
    // TODO implement more robust fix for nav links showing on mobile when they shouldn't (due to tailwind 4 updates)
    // Revert back to tailwind 3?
    if (!isMobileScreenSet) {
        return <SkeletonNavBar />;
    }

    return (
        <div className="flex sticky top-0 h-20 p-4 items-center justify-between border-b border-gray-400 bg-white z-10">
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
                    'md:flex md:flex-row md:gap-3',
                    {
                        'hidden': !mobileNavOpen && isMobileScreen,
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
            {
                getNavIcon(isMobileScreen, mobileNavOpen, toggleMobileNavOpen)
            }
        </div>
    );
}

/**
 * Get the icon to show on the mobile nav bar
 *
 * @param {boolean} isMobileScreen if the user is on a mobile device
 * @param {boolean} mobileNavOpen if the mobile nav menu is open or not
 * @param {Function} toggleMobileNavOpen the callback for when the icon is clicked
 * @returns React component (or nothing if not on a mobile device)
 */
function getNavIcon(isMobileScreen: boolean, mobileNavOpen: boolean, toggleMobileNavOpen: Function) {
    if (isMobileScreen) {
        if (mobileNavOpen) {
            return <XMarkIcon className="cursor-pointer w-8" onClick={toggleMobileNavOpen.bind(null)} />;
        }
        return <Bars3Icon className="cursor-pointer w-8" onClick={toggleMobileNavOpen.bind(null)} />;
    }

    return null;
}
