'use client';

import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

export default function Pagination({ totalPages }: { totalPages: number }) {
    let paginationNumber = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationNumber.push(i);
    }

    // Search parameters
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className='pagination flex flex-row gap-4 justify-center'>
            {
                paginationNumber.map((pageNumber) => {
                    return (
                        <Link 
                            href={createPageURL(pageNumber)}
                            key={pageNumber}
                            className={
                                clsx(
                                    'text-sm font-medium rounded-full p-3 hover:bg-red-400 hover:text-white',
                                    {
                                        'bg-red-600 text-white': currentPage === pageNumber,
                                    },
                                )
                            }
                            >
                            {pageNumber}
                        </Link>
                    );
                })
            }
        </div>
    )
};