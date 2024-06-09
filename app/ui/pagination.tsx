import clsx from 'clsx';
import React from 'react';

export default function Pagination(
    { outagesPerPage, length, handlePagination, currentPage }:
    { outagesPerPage: number; length: number; handlePagination: any; currentPage: number }
) {
    let paginationNumber = [];

    for (let i = 1; i <= Math.ceil(length / outagesPerPage); i++) {
        paginationNumber.push(i);
    }

    return (
        <div className='pagination flex flex-row gap-4 justify-center'>
            {
                paginationNumber.map((data) => (
                    <button 
                        key={data}
                        onClick={() => handlePagination(data)}
                        className={
                            clsx(
                                'text-sm font-medium rounded-full p-3 hover:bg-red-400 hover:text-white',
                                {
                                    'bg-red-600 text-white': currentPage === data,
                                },
                            )
                        }
                    >
                        {data}
                    </button>
                ))
            }
        </div>
    )
};