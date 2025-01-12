'use client';

import { JSX, useState } from 'react';
import OutageStatus from '../outage/outage-status';
import clsx from 'clsx';
import FilterDate from './filter-date';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import CustomIcon from '../custom-icon';

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
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    let param = searchParams.get(type.toLocaleLowerCase().replace(' ', '')) || '';
    if (type === 'Status') {
        param = param.charAt(0).toUpperCase() + param.slice(1);
    }

    const [filterOutcome, setFilterOutcome] = useState(param);

    const [hidePicker, setHidePicker] = useState(true);
    const filterOptions = getFilterOptions(type, filterOutcome, optionalDates);

    const showFilterPicker = () => {
        setHidePicker(!hidePicker);
        document.querySelector('body')?.classList.toggle('no-scroll', hidePicker);
    };

    const getFilterOutcomeDiv = () => {
        if (!filterOutcome) {
            return null;
        }

        return (
            <div>{filterOutcome}</div>
        );
    };

    const handleFilterChoice = useDebouncedCallback((propText) => {
        setFilterOutcome(propText);

        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        const thisParam = type.toLowerCase().replace(' ', '');
        if (propText) {
            params.set(thisParam, propText.toLowerCase());
        }
        else {
            params.delete(thisParam);
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const positionClasses = 'fixed flex top-0 left-0 bottom-0 w-[100%] h-[100%] z-20';

    return (
        <div
            className={
                clsx(
                    'flex flex-row items-center gap-2 p-3 bg-red-600 hover:bg-red-800 text-white rounded-xl',
                    {
                        'cursor-pointer': hidePicker,
                        'cursor-default': !hidePicker,
                    }
                )
            }
            onClick={showFilterPicker}
        >
            <div className="font-semibold">{type}</div>
            {
                getFilterOutcomeDiv()
            }
            <div
                className={`${positionClasses} z-20 bg-[rgba(0,0,0,0.5)] ${hidePicker ? 'hidden' : ''}`}
                onClick={
                    (e) => {
                        e.stopPropagation();
                    }
                }
            >
                <div className='sm:w-[50%] w-[80%] h-fit max-h-[60%] overflow-y-auto m-auto'>
                    <div
                        className="flex flex-col gap-4 bg-white p-6"
                        onClick={
                            (e) => {
                                e.stopPropagation();
                            }
                        }
                    >
                        <div className="flex flex-row gap-2 justify-between text-black">
                            <span className="text-center text-2xl font-semibold">Choose the {type}</span>
                            <button onClick={ showFilterPicker }>
                                <CustomIcon icon={'XMarkIcon'} iconClass={'w-7 cursor-pointer'} />
                            </button>
                        </div>
                        {
                            filterOptions.map((option) => {
                                const { dateText, statusText } = option.props;

                                const propText = type.includes('Date') ? dateText : statusText;

                                return (
                                    <span
                                        key={propText || 'reset-filter'}
                                        onClick={
                                            () => {
                                                handleFilterChoice(propText);
                                            }
                                        }
                                    >
                                        {option}
                                    </span>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Get the filter options
 *
 * @param {string} filterType status or start/end date
 * @param {string} filterOutcome the user selected option (an outage status or a date)
 * @param {Array<string>} optionalDates optional start and end dates for the date filters
 * @returns Array of react components
 */
function getFilterOptions(filterType: string, filterOutcome: string, optionalDates: Array<string> | null) {
    const commonOptionClass = 'text-xl text-center p-3 font-semibold rounded-xl cursor-pointer';

    let options: JSX.Element[] = [];

    if (filterType === 'Status') {
        const unselectedHoverClass = 'text-black bg-gray-300 hover:text-white';

        const statuses = [
            {
                text: 'Active',
                selectedClass: `${commonOptionClass} hover:bg-green-600`,
                unselectedClass: `${commonOptionClass} ${unselectedHoverClass} hover:bg-green-600`,
            },
            {
                text: 'Scheduled',
                selectedClass: `${commonOptionClass} hover:bg-blue-700`,
                unselectedClass: `${commonOptionClass} ${unselectedHoverClass} hover:bg-blue-700`,
            },
            {
                text: 'Postponed',
                selectedClass: `${commonOptionClass} hover:bg-red-600 hover:text-white`,
                unselectedClass: `${commonOptionClass} ${unselectedHoverClass} hover:bg-red-600`,
            },
            {
                text: 'Cancelled',
                selectedClass: `${commonOptionClass} hover:bg-orange-600 hover:text-white`,
                unselectedClass: `${commonOptionClass} ${unselectedHoverClass} hover:bg-orange-600`,
            },
        ];

        for (const status of statuses) {
            const { text, selectedClass, unselectedClass } = status;

            const isSelected = filterOutcome === text;
            const classToUse = isSelected ? selectedClass : unselectedClass;

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

        let isSelected = filterOutcome === firstDateString;

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
            isSelected = filterOutcome === dateString;

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

        isSelected = filterOutcome === lastDateString;
        options.push(
            <FilterDate
                key={lastDateString}
                dateText={lastDateString}
                overrideBg={isSelected}
            />
        );
    }

    if (filterOutcome) {
        options.unshift(
            <div className={`${commonOptionClass} bg-gray-600 hover:bg-gray-800 text-white`}>Reset Filter</div>
        );
    }

    return options;
}
