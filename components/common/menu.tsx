/* eslint-disable max-len */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ReactElement, useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { update } from '@/state/no-scroll/noScroll';
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
        dispatch(update(!smallNavOpen));
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
                dispatch(update(false));
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
                className="flex sticky top-0 h-20 p-4 items-center justify-between gap-10 border-b border-gray-400 bg-white z-10
                bg-linear-to-r from-red-500 to-slate-800"
            >
                <div>
                    <Link
                        href="/"
                        className={
                            clsx(
                                'text-xl font-semibold lg:text-white lg:hover:text-white/80',
                                {
                                    'lg:text-white lg:hover:text-white/80': pathname === '/',
                                },
                            )
                        }
                    >
                        <span className='text-white'>Counties Power Outages App</span>
                    </Link>
                </div>
                <div className={
                    clsx(
                        'lg:flex lg:flex-row lg:gap-3 max-lg:hidden',
                        {
                            'absolute-nav': smallNavOpen && isSmallScreen,
                        }
                    )
                }>
                    {
                        getMenuLinks(true, menuLinks, resetSmallNavOpen, pathname)
                    }
                    {/* TODO onClick display content.disclaimer text */}
                    <div className='text-lg font-semibold lg:text-white lg:hover:text-white/80 hover:text-red-400 cursor-pointer mt-10 text-center'>
                        Disclaimer
                    </div>
                </div>
                <div className='lg:hidden'>
                    {
                        smallNavOpen ?
                            <XMarkIcon className="cursor-pointer w-8 text-white" onClick={toggleSmallNavOpen.bind(null)} /> :
                            <Bars3Icon className="cursor-pointer w-8 text-white" onClick={toggleSmallNavOpen.bind(null)} />
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
                className={
                    clsx(
                        'text-3xl text-center font-semibold lg:text-white lg:hover:text-white/80',
                        {
                            'lg:text-white lg:hover:text-white/80': pathname === '/',
                        },
                    )
                }
            >
                Counties Power Outages App
            </Link>
            <div className='flex flex-col gap-6 grow'>
                <div className='flex flex-col gap-10'>
                    {
                        getMenuLinks(false, menuLinks, resetSmallNavOpen, pathname)
                    }
                    {/* TODO onClick display content.disclaimer text */}
                    <div className='text-2xl font-semibold lg:text-white lg:hover:text-white/80 hover:text-red-400 cursor-pointer mt-10 text-center'>
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
                        'font-semibold lg:text-white lg:hover:text-white/80 hover:text-red-400',
                        {
                            'text-red-600 hover:text-red-400 lg:text-white lg:hover:text-white/80': pathname === href,
                            'text-lg': isSmallMenu,
                            'text-2xl': !isSmallMenu,
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
