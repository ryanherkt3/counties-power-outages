/* eslint-disable max-len */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ReactElement, useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { update as scrollUpdate } from '@/state/no-scroll/noScroll';
import { update as disclaimerUpdate } from '@/state/disclaimer-overlay-view/disclaimerOverlayView';
import FooterInfo from './footer-info';
import { MenuLink } from '@/lib/definitions';

export default function Menu() {
    const pathname = usePathname();
    const dispatch = useDispatch();

    // States for the mobile nav menu
    const [smallNavOpen, setSmallNavOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isSmallScreenSet, setIsSmallScreenSet] = useState(false);

    const toggleSmallNavOpen = () => {
        setSmallNavOpen(!smallNavOpen);
        dispatch(scrollUpdate(!smallNavOpen));
    };

    // Reset the state of smallNavOpen when going to another page
    const resetSmallNavOpen = () => {
        if (smallNavOpen) {
            setTimeout(() => {
                setSmallNavOpen(false);
            }, 300);
        }
    };

    // Check if the mobile nav can be opened
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1024);
            if (window.innerWidth > 1024 && smallNavOpen) {
                setSmallNavOpen(false);
                dispatch(scrollUpdate(false));
            }
        };

        if (!isSmallScreenSet) {
            setIsSmallScreen(window.innerWidth <= 1024);
        }
        setIsSmallScreenSet(true);

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isSmallScreenSet, smallNavOpen]);

    const menuLinks: MenuLink[] = [
        {
            href: '/',
            linkName: 'Outages'
        },
        {
            href: '/notifications',
            linkName: 'Notifications'
        },
        // {
        //     href: '/contact',
        //     linkName: 'Contact' // TODO build
        // }
    ];

    // Mobile / tablet menu
    if (isSmallScreen) {
        return (
            <div
                className={
                    `flex h-20 p-4 items-center justify-between gap-10
                    bg-linear-to-r from-red-500 to-slate-800`
                }
            >
                <div>
                    <Link
                        href="/"
                        className='text-xl font-semibold text-white hover:text-white/60'
                    >
                        Counties Power Outages App
                    </Link>
                </div>

                <div className={
                    clsx(
                        {
                            'absolute-nav': smallNavOpen,
                            'hidden': !smallNavOpen
                        }
                    )
                }>
                    {
                        getMenuLinks(true, menuLinks, resetSmallNavOpen, pathname)
                    }
                    <div
                        className={
                            `text-xl font-semibold text-black hover:text-yellow-600/60
                            cursor-pointer mt-10 text-center`
                        }
                        onClick={
                            () => {
                                dispatch(disclaimerUpdate(true));
                            }
                        }
                    >
                        Disclaimer
                    </div>
                </div>
                <div>
                    {
                        smallNavOpen ?
                            <XMarkIcon
                                className="cursor-pointer w-8 text-white hover:text-white/60"
                                onClick={toggleSmallNavOpen.bind(null)}
                            /> :
                            <Bars3Icon
                                className="cursor-pointer w-8 text-white hover:text-white/60"
                                onClick={toggleSmallNavOpen.bind(null)}
                            />
                    }
                </div>
            </div>
        );
    }

    // Desktop menu
    return (
        <div className="flex flex-col h-screen p-10 gap-12 fixed w-[400px] bg-linear-to-b from-red-500 to-slate-800">
            <Link
                href="/"
                className='text-3xl text-center font-semibold text-white hover:text-yellow-400/80'
            >
                Counties Power Outages App
            </Link>
            <div className='flex flex-col gap-6 grow'>
                <div className='flex flex-col gap-10'>
                    {
                        getMenuLinks(false, menuLinks, resetSmallNavOpen, pathname)
                    }
                    <div
                        className={
                            `text-2xl font-semibold text-white hover:text-yellow-400/80 
                            cursor-pointer mt-10 text-center`
                        }
                        onClick={
                            () => {
                                dispatch(disclaimerUpdate(true));
                            }
                        }
                    >
                        Disclaimer
                    </div>
                </div>
                <div className='flex flex-col gap-6 mt-auto text-lg text-center'>
                    <FooterInfo />
                </div>
            </div>
        </div>
    );
}

function getMenuLinks(isSmallMenu: boolean, links: MenuLink[], resetSmallNavOpen: Function, pathname: string) {
    const menuLinks: ReactElement[] = [];

    links.map((menuLink: MenuLink) => {
        const { href, linkName } = menuLink;

        menuLinks.push(
            <Link
                key={href}
                href={href}
                onClick={() => resetSmallNavOpen}
                className={
                    clsx(
                        'font-semibold',
                        {
                            'text-xl': isSmallMenu,
                            'text-2xl': !isSmallMenu,
                            'text-black hover:text-yellow-600/60': pathname !== href && isSmallMenu,
                            'text-white hover:text-yellow-400/80': pathname !== href && !isSmallMenu,
                            'text-yellow-600 hover:text-yellow-600/60': pathname === href && isSmallMenu,
                            'text-yellow-400 hover:text-yellow-400/80': pathname === href && !isSmallMenu,
                        },
                    )
                }
            >
                <span>{linkName}</span>
            </Link>
        );
    });

    return menuLinks;
}
