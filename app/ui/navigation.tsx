'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

export default function Navigation() {
    const pathname = usePathname();

    return (
        <div className="flex sticky top-0 h-20 p-4 items-center justify-between border-b border-gray-400 bg-white">
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
            <Link
                href="/notifications"
                className={
                    clsx(
                        'text-xl font-semibold text-black hover:text-red-400',
                        {
                            'text-red-600 hover:text-red-400': pathname === "/notifications",
                        },
                    )
                }
            >
                <span>Notifications</span>
            </Link>
        </div>
    );
}
