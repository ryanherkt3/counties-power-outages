/* eslint-disable @typescript-eslint/no-unsafe-function-type */
'use client';

import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { generatePagination } from '../../lib/utils';
import PageArrow from './page-arrow';

export default function Pagination({ totalPages }: { totalPages: number }) {
    // Search parameters
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const paginationNumber = generatePagination(currentPage, totalPages);

    return (
        <div className='pagination flex flex-row gap-4 justify-center items-center mt-auto'>
            <PageArrow
                href={createPageURL(currentPage - 1)}
                direction="left"
                isDisabled={currentPage <= 1}
            />
            {
                paginationNumber.map((pageNumber) => {
                    return getPaginationItem(pageNumber, currentPage, createPageURL);
                })
            }
            <PageArrow
                href={createPageURL(currentPage + 1)}
                direction="right"
                isDisabled={currentPage >= totalPages}
            />
        </div>
    );
}

/**
 * Get a pagination item
 *
 * @param {number | string} pageNumber
 * @param {number} currentPage
 * @param {Function} createPageURL
 * @returns HTML/React object
 */
function getPaginationItem(pageNumber: number | string, currentPage: number, createPageURL: Function) {
    if (pageNumber === '...') {
        return (
            <div key="more-pages" className='text-sm font-medium rounded-full p-3'>
                {pageNumber}
            </div>
        );
    }

    const fontPaddingClasses = 'text-xs p-2 md:text-sm md:p-3 font-medium';

    return (
        <Link
            href={createPageURL(pageNumber)}
            key={pageNumber}
            className={
                clsx(
                    `${fontPaddingClasses} rounded-full self-center hover:bg-red-400 hover:text-white`,
                    {
                        'bg-red-600 text-white': currentPage === pageNumber,
                    },
                )
            }
        >
            {pageNumber}
        </Link>
    );
}
