import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

export default function Pagination(
    { outagesPerPage, length, handlePagination, currentPage }:
    { outagesPerPage: number; length: number; handlePagination: any; currentPage: number }
) {
    let paginationNumber = [];
    for (let i = 1; i <= Math.ceil(length / outagesPerPage); i++) {
        paginationNumber.push(i);
    }

    // Search parameters
    const pathname = usePathname();
    const searchParams = useSearchParams();
    currentPage = Number(searchParams.get('page')) || currentPage;

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
                            onClick={() => handlePagination(pageNumber)}
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