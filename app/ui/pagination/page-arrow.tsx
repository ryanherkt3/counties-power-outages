'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PageArrow(
    { href, direction, isDisabled }: { href: string, direction : 'left' | 'right', isDisabled: boolean }) {
    const icon = direction === 'left' ?
        (<ArrowLeftIcon className="w-5" />) :
        (<ArrowRightIcon className="w-5" />);

    let className = 'hidden md:flex md:h-11 md:w-11 items-center justify-center rounded-md border';
    className += isDisabled ?
        ' text-gray-500 border-gray-300 bg-gray-300' :
        ' border-red-600 text-red-600 hover:bg-red-600 hover:text-white';

    if (isDisabled) {
        return (
            <div className={className}>{icon}</div>
        );
    }

    return (
        <Link
            href={href}
            key={`page-arrow-${direction}`}
            className={className}
        >
            {icon}
        </Link>
    );
}