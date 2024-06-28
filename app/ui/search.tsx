'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const paramName = pathname.includes('outages') ? 'query' : 'email';
    const [inputValue, setInputValue] = useState(searchParams.get(paramName) || '');

    const handleSearch = useDebouncedCallback((term, cleared) => {
        // Early return as no need to redirect in this case
        if (!cleared && !term) {
            return;
        }

        const params = new URLSearchParams(searchParams);

        // No pages on the notifications page
        if (pathname.includes('outages')) {
            params.set('page', '1');
        }
        
        if (term) {
            params.set(paramName, term);
        } 
        else {
            params.delete(paramName);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 450);

    return (
        <div className="relative flex-grow">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
                className="w-full rounded-lg p-3 pr-9 text-lg placeholder:text-gray-500 border border-gray-200 outline-2"
                placeholder={placeholder}
                onChange={
                    (e) => {
                        setInputValue(e.target.value);
                        handleSearch(e.target.value, false);
                    }
                }
                value={inputValue}
            />
            <XMarkIcon 
                className={
                    clsx(
                        'absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 peer-focus:text-gray-900',
                        {
                            'hidden': !inputValue
                        }
                    )
                } 
                onClick={
                    () => {
                        setInputValue('');
                        handleSearch(null, true);
                    } 
                }
            />
        </div>
    )
};
