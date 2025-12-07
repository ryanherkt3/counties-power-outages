'use client';

import { RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import CustomIcon from '../custom-icon';
import FilterDate from './filter-date';
import OutageStatus from '../outage/outage-status';
import { JSX } from 'react';
import clsx from 'clsx';
import { defaultDataValue, update } from '@/state/filter-overlay-view/filterOverlayView';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { SelectedFilterOverlayValues } from '@/lib/definitions';

export default function FilterOverlay() {
    const filterOverlayView = useSelector((state: RootState) => state.filterOverlayView.value);
    const dispatch = useDispatch();

    const { filterValues, data } = filterOverlayView;
    const { type, optionalDates } = data;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const filterOptions = getFilterOptions(type, filterValues, optionalDates);

    const handleFilterChoice = useDebouncedCallback((param: string, propText: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        const thisParam = param.toLowerCase().replace(' ', '');
        if (propText) {
            params.set(thisParam, propText.toLowerCase());
        }
        else {
            params.delete(thisParam);
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <div
            className={
                clsx(
                    'fixed flex top-0 left-0 bottom-0 w-full h-full z-20 bg-[rgba(0,0,0,0.5)]',
                    {
                        'hidden': !filterOverlayView.isVisible
                    }
                )
            }
        >
            <div className='sm:w-[50%] w-[80%] h-fit max-h-[60%] overflow-y-auto m-auto'>
                <div className="flex flex-col gap-4 bg-white p-6">
                    <div className="flex flex-row gap-2 justify-between text-black">
                        <span className="text-center text-2xl font-semibold grow">Choose the {type}</span>
                        <button onClick={
                            () => {
                                dispatch(
                                    update(
                                        {
                                            type: 'none',
                                            isVisible: false,
                                            data: defaultDataValue,
                                            filterValues: filterValues
                                        }
                                    )
                                );
                            }
                        }>
                            <CustomIcon icon={'XMarkIcon'} iconClass={'w-7 cursor-pointer'} />
                        </button>
                    </div>
                    {
                        filterOptions.map((option) => {
                            // key={dateString}
                            // dateText={dateString}
                            // statusText={text}
                            // overrideBg={isSelected}
                            // className={classToUse}

                            const props = option.props as { dateText: string, statusText: string };

                            const propText = type.includes('Date') ? props.dateText : props.statusText;

                            return (
                                <button
                                    key={propText || 'reset-filter'}
                                    onClick={
                                        () => {
                                            const text = propText || '';

                                            const newFilterValues: SelectedFilterOverlayValues = {
                                                status: type === 'Status' ? (text) : filterValues.status,
                                                startdate: type === 'Start Date' ?
                                                    (text) :
                                                    filterValues.startdate,
                                                enddate: type === 'End Date' ? (text) : filterValues.enddate
                                            };

                                            dispatch(
                                                update(
                                                    {
                                                        type: 'none',
                                                        isVisible: false,
                                                        data: defaultDataValue,
                                                        filterValues: newFilterValues
                                                    }
                                                )
                                            );

                                            handleFilterChoice(type, propText);
                                        }
                                    }
                                >
                                    {option}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

/**
 * Get the filter options
 *
 * @param {string} filterType status or start/end date
 * @param {SelectedFilterOverlayValues} filterValues filter values the user has selected
 * @param {Array<string>} optionalDates optional start and end dates for the date filters
 * @returns Array of react components
 */
function getFilterOptions(
    filterType: string,
    filterValues: SelectedFilterOverlayValues,
    optionalDates: string[] | null
) {
    const commonOptionClass = 'text-xl text-center p-3 font-semibold rounded-xl cursor-pointer';

    let options: JSX.Element[] = [];
    let filterUsed = false;

    const { startdate, enddate } = filterValues;

    if (filterType === 'Status') {
        const unselectedHoverClass = 'text-black hover:text-white border-2';

        const statuses = [
            {
                text: 'Active',
                selectedClass: `${commonOptionClass} hover:bg-green-600`,
                unselectedClass:
                    `${commonOptionClass} ${unselectedHoverClass} text-green-600 border-green-600 hover:bg-green-600`,
            },
            {
                text: 'Scheduled',
                selectedClass: `${commonOptionClass} hover:bg-blue-700`,
                unselectedClass:
                    `${commonOptionClass} ${unselectedHoverClass} text-blue-600 border-blue-600 hover:bg-blue-700`,
            },
            {
                text: 'Postponed',
                selectedClass: `${commonOptionClass} hover:bg-red-600 hover:text-white`,
                unselectedClass:
                    `${commonOptionClass} ${unselectedHoverClass} text-red-600 border-red-600 hover:bg-red-600`,
            },
            {
                text: 'Cancelled',
                selectedClass: `${commonOptionClass} hover:bg-orange-600 hover:text-white`,
                unselectedClass:
                    `${commonOptionClass} ${unselectedHoverClass} text-orange-600
                    border-orange-600 hover:bg-orange-600`,
            },
        ];

        for (const status of statuses) {
            const { text, selectedClass, unselectedClass } = status;

            const isSelected = filterValues.status.toLowerCase() === text.toLowerCase();
            const classToUse = isSelected ? selectedClass : unselectedClass;

            if (isSelected) {
                filterUsed = true;
            }

            options.push(
                <OutageStatus
                    className={classToUse}
                    statusText={text}
                    overrideBg={!isSelected}
                />,
            );
        }
    }
    else if (filterType.includes('Date') && optionalDates) {
        const firstDay = new Date(optionalDates[0]);
        const firstDateString = `${firstDay.getDate()}/${firstDay.getMonth() + 1}/${firstDay.getFullYear()}`;
        const lastDay = new Date(optionalDates[1]);
        const lastDateString = `${lastDay.getDate()}/${lastDay.getMonth() + 1}/${lastDay.getFullYear()}`;

        let isSelected = filterType === 'Start Date' ? startdate === firstDateString : enddate === firstDateString;
        filterUsed = isSelected;

        options = [
            <FilterDate
                key={firstDateString}
                dateText={firstDateString}
                overrideBg={isSelected}
            />
        ];

        let addDates = true;
        let dateDays = 1;
        while (addDates) {
            const nextDay = new Date(firstDay.getTime() + (86400 * 1000 * dateDays));
            const dateString = `${nextDay.getDate()}/${nextDay.getMonth() + 1}/${nextDay.getFullYear()}`;

            isSelected = filterType === 'Start Date' ? startdate === dateString : enddate === dateString;
            filterUsed = filterUsed || isSelected;

            if (nextDay.getTime() < lastDay.getTime()) {
                options.push(
                    <FilterDate
                        key={dateString}
                        dateText={dateString}
                        overrideBg={isSelected}
                    />
                );
                dateDays++;
            }
            else {
                addDates = false;
            }
        }

        isSelected = filterType === 'Start Date' ? startdate === lastDateString : enddate === lastDateString;
        filterUsed = filterUsed || isSelected;

        options.push(
            <FilterDate
                key={lastDateString}
                dateText={lastDateString}
                overrideBg={isSelected}
            />
        );
    }

    if (filterUsed) {
        options.push(
            <div
                className={`${commonOptionClass} border-2 border-gray-600 hover:bg-gray-600 hover:text-white`}
            >
                Reset
            </div>
        );
    }

    return options;
}
