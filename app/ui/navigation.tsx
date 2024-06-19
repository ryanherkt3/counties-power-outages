'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
    const pathname = usePathname();

    // States for the mobile nav menu
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const [isMobileScreenSet, setIsMobileScreenSet] = useState(false);
    
    const toggleMobileNavOpen = () => {
        setMobileNavOpen(!mobileNavOpen);
    };

    // Reset the state of mobileNavOpen when going to another page
    const resetMobileNavOpen = () => {
        if (mobileNavOpen) {
            setTimeout(() => setMobileNavOpen(false), 300);
        }
    };

    // Check if the mobile nav can be opened
    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth <= 768);
            if (window.innerWidth > 768 && mobileNavOpen) {
                setMobileNavOpen(false);
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
    });

    const rightLinks = [
        {
            href: '/outages',
            linkName: 'Outages'
        },
        {
            href: '/notifications',
            linkName: 'Notifications'
        }
    ]

    return (
        <div className="flex sticky top-0 h-20 p-4 items-center justify-between border-b border-gray-400 bg-white z-10">
            <div>
                <Link
                    href="/"
                    className={
                        clsx(
                            'text-xl font-semibold text-black hover:text-red-400',
                            {
                                'text-red-600 hover:text-red-400': pathname === "/",
                            },
                        )
                    }
                >
                    <span>Counties Power Outages App</span>
                </Link>
            </div>
            <div className={
                clsx (
                    'md:flex md:flex-row md:gap-3',
                    {
                        'hidden': !mobileNavOpen,
                        'absolute-nav': mobileNavOpen,
                    }
                )
            }>
                {
                    rightLinks.map((rightLink) => {
                        return (
                            <Link
                                key={rightLink.href}
                                href={rightLink.href}
                                onClick={resetMobileNavOpen}
                                className={
                                    clsx(
                                        'text-xl font-semibold text-black hover:text-red-400',
                                        {
                                            'text-red-600 hover:text-red-400': pathname === rightLink.href,
                                        },
                                    )
                                }
                            >
                                <span>{rightLink.linkName}</span>
                            </Link>
                        )
                    })
                }
            </div>
            {
                getNavIcon(isMobileScreen, mobileNavOpen, toggleMobileNavOpen)
            }
        </div>
    );
}

function getNavIcon(isMobileScreen: boolean, mobileNavOpen: boolean, toggleMobileNavOpen: any) {
    if (isMobileScreen) {
        if (mobileNavOpen) {
            return <XMarkIcon className="cursor-pointer w-8" onClick={toggleMobileNavOpen} />
        }
        return <Bars3Icon className="cursor-pointer w-8" onClick={toggleMobileNavOpen} />
    }

    return false;
}
