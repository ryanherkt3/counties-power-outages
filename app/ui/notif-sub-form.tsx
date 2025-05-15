/* eslint-disable max-len */
'use client';

import { AtSymbolIcon, BookmarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { addSubscription, State } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import { useState } from 'react';

export default function NotifSubForm() {
    const [includeCoords, setIncludeCoords] = useState(true);

    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(addSubscription.bind(null, includeCoords), initialState);

    const inputClasses = 'w-full rounded-lg border border-gray-200 p-3 text-md outline-2 placeholder:text-gray-500';

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">Would you like to include coordinates in your outage notification?</div>
                <div className="flex flex-row gap-6">
                    <button
                        className="flex flex-row gap-2"
                        onClick={
                            () => {
                                setIncludeCoords(true);
                            }
                        }
                    >
                        <div className={
                            clsx(
                                'rounded-full border border-red-600 w-6',
                                {
                                    'bg-red-600': includeCoords,
                                }
                            )
                        }></div>
                        <div className="text-md">Yes</div>
                    </button>
                    <button
                        className="flex flex-row gap-2 cursor-pointer"
                        onClick={
                            () => {
                                setIncludeCoords(false);
                            }
                        }
                    >
                        <div className={
                            clsx(
                                'rounded-full border border-red-600 w-6',
                                {
                                    'bg-red-600': !includeCoords,
                                }
                            )
                        }></div>
                        <div className="text-md">No</div>
                    </button>
                </div>
            </div>

            <form action={dispatch}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-lg font-medium">Email</label>
                        <div className="relative rounded-md">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter your email address"
                                className={`${inputClasses} pl-10`}
                                aria-describedby="email-error"
                            />
                            <AtSymbolIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {
                                state.errors?.email &&
                                state.errors.email.map((error: string) => (
                                    <p className="mt-2 text-md font-semibold text-red-600" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="location" className="text-lg font-medium">Location</label>
                        <div className="relative rounded-md">
                            <input
                                id="location"
                                name="location"
                                type="text"
                                placeholder="Enter the location / area where you would like to be notified for (e.g. Smith Street)"
                                className={`${inputClasses} pl-10`}
                                aria-describedby="location-error"
                            />
                            <BookmarkIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                        <div id="location-error" aria-live="polite" aria-atomic="true">
                            {
                                state.errors?.location &&
                                state.errors.location.map((error: string) => (
                                    <p className="mt-2 text-md font-semibold text-red-600" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div
                        className={
                            clsx(
                                'flex flex-col gap-2',
                                {
                                    'hidden': !includeCoords,
                                }
                            )
                        }
                    >
                        <label htmlFor="lat" className="text-lg font-medium">Latitude</label>
                        <div className="relative rounded-md">
                            <input
                                id="lat"
                                name="lat"
                                type="text"
                                placeholder="Enter latitude (e.g. 37.12345)"
                                className={`${inputClasses} pl-10`}
                                aria-describedby="lat-error"
                            />
                            <MinusIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                        <div id="lat-error" aria-live="polite" aria-atomic="true">
                            {
                                state.errors?.lat && state.errors.lat.map((error: string) => (
                                    <p className="mt-2 text-md font-semibold text-red-600" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div
                        className={
                            clsx(
                                'flex flex-col gap-2',
                                {
                                    'hidden': !includeCoords,
                                }
                            )
                        }
                    >
                        <label htmlFor="lng" className="text-lg font-medium">Longtitude</label>
                        <div className="relative rounded-md">
                            <input
                                id="lng"
                                name="lng"
                                type="text"
                                placeholder="Enter longtitude (e.g. 174.12345)"
                                className={`${inputClasses} pl-10`}
                                aria-describedby="lng-error"
                            />
                            <PlusIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                        </div>
                        <div id="lng-error" aria-live="polite" aria-atomic="true">
                            {
                                state.errors?.lng && state.errors.lng.map((error: string) => (
                                    <p className="mt-2 text-md font-semibold text-red-600" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <button
                        className="bg-red-600 hover:bg-red-800 text-white rounded-xl w-fit p-3 cursor-pointer"
                        type="submit"
                    >
                        Subscribe
                    </button>

                    {
                        state.message ?
                            (
                                <div id="missing-fields" aria-live="polite" aria-atomic="true">
                                    <p
                                        className={
                                            clsx(
                                                'mt-2 text-md font-semibold',
                                                {
                                                    'text-green-600': state.message.includes('success'),
                                                    'text-red-600': !state.message.includes('success'),
                                                }
                                            )
                                        }
                                        key={state.message}
                                    >
                                        {state.message}
                                    </p>
                                </div>
                            ) :
                            null
                    }
                </div>
            </form>
        </>
    );
}
