'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

export default function Navigation() {
    const pathname = usePathname();

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
        <div className="flex sticky top-0 h-20 p-4 items-center justify-between border-b border-gray-400 bg-white">
            <div>
                <Link
                    href="/" // TODO move to own page
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
            <div className="flex flex-row gap-3">
                {
                    rightLinks.map((rightLink) => {
                        return (
                                <Link
                                    key={rightLink.href}
                                    href={rightLink.href}
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
        </div>
    );
}
