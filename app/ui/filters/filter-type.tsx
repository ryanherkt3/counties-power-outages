/* eslint-disable max-len */
'use client';

import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '@/app/state/filter-overlay-view/filterOverlayView';
import { RootState } from '@/app/state/store';

export default function FilterType(
    {
        type,
        optionalDates
    }:
    {
        type: 'Status' | 'Start Date' | 'End Date';
        optionalDates: Array<string> | null;
    }
) {
    const filterOverlayView = useSelector((state: RootState) => state.filterOverlayView.value);
    const dispatch = useDispatch();

    const searchParams = useSearchParams();

    let param = searchParams.get(type.toLocaleLowerCase().replace(' ', '')) || '';
    if (type === 'Status') {
        param = param.charAt(0).toUpperCase() + param.slice(1);
    }

    return (
        <div
            className='flex flex-row items-center gap-2 p-3 bg-red-600 hover:bg-red-800 text-white rounded-xl cursor-pointer'
            onClick={
                () => {
                    dispatch(
                        update(
                            {
                                type: type,
                                isVisible: true,
                                data: { type: type, optionalDates: optionalDates },
                                filterValues: filterOverlayView.filterValues
                            }
                        )
                    );
                }
            }
        >
            <div className="font-semibold">{type}</div>
            {
                param.length ? <div>{param}</div> : null
            }
        </div>
    );
}
