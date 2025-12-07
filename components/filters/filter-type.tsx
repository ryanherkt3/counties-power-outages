'use client';

import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '@/state/filter-overlay-view/filterOverlayView';
import { RootState } from '@/state/store';

export default function FilterType(
    {
        type,
        optionalDates
    }:
    {
        type: 'Status' | 'Start Date' | 'End Date';
        optionalDates: string[] | null;
    }
) {
    const filterOverlayView = useSelector((state: RootState) => state.filterOverlayView.value);
    const dispatch = useDispatch();

    const searchParams = useSearchParams();

    let param = searchParams.get(type.toLocaleLowerCase().replace(' ', '')) ?? '';
    if (type === 'Status') {
        param = param.charAt(0).toUpperCase() + param.slice(1);
    }

    const btnCSS = 'flex flex-row items-center gap-2 p-3 border-1 border-red-600 hover:bg-red-600 grow ' +
        'text-red-600 hover:text-white rounded-xl cursor-pointer justify-center';

    return (
        <button
            className={btnCSS}
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
            <div className="font-semibold">{type.toUpperCase()}</div>
            {
                param.length ? <div>{param}</div> : null
            }
        </button>
    );
}
