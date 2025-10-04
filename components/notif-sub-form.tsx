'use client';

import { AtSymbolIcon, BookmarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { isValidEmail } from '../lib/utils';
import { updateSubscription } from '../lib/actions';
import { FormValues } from '../lib/definitions';

export default function NotifSubForm({ values, onSubPage }: { values: FormValues, onSubPage: boolean }) {
    const { email, location, latitude, longtitude, hasCoordinates, id } = values;

    const { register, handleSubmit, control, setError, clearErrors, getValues, reset } = useForm({
        defaultValues: {
            email: email,
            location: location,
            latitude: latitude,
            longtitude: longtitude
        },
    });

    const { errors, isSubmitting, isSubmitted, isSubmitSuccessful, dirtyFields } = useFormState({
        control,
        name: ['email', 'location', 'latitude', 'longtitude'],
    });

    const onSubmit = (data: any) => {
        if (onSubPage && !Object.keys(dirtyFields).length) {
            setError('root.unchanged', { type: 'custom', message: 'custom message' });
        }
        else {
            clearErrors();

            if (onSubPage) {
                data = {...data, id: id};
            }

            updateSubscription(includeCoords, onSubPage, data);

            const resetPayload = onSubPage ?
                {
                    email: data.email,
                    location: data.location,
                    latitude: includeCoords ? data.latitude : '',
                    longtitude: includeCoords ? data.longtitude : '',
                } : {};

            reset(resetPayload);
        }
    };

    const [includeCoords, setIncludeCoords] = useState(hasCoordinates);

    useEffect(() => {
        if (!includeCoords) {
            clearErrors('latitude');
            clearErrors('longtitude');
        }
    }, [includeCoords]);

    const inputClasses = 'w-full rounded-lg border border-gray-200 p-3 text-md outline-2 placeholder:text-gray-500';

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">Would you like to include coordinates in your outage subscription?</div>
                <div className="flex flex-row gap-6">
                    <button
                        className="flex flex-row gap-2 cursor-pointer"
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
                                    'bg-red-600 hover:bg-red-400 hover:border-red-400': includeCoords,
                                    'hover:bg-red-800 hover:border-red-800': !includeCoords,
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
                                    'bg-red-600 hover:bg-red-400 hover:border-red-400': !includeCoords,
                                    'hover:bg-red-800 hover:border-red-800': includeCoords,
                                }
                            )
                        }></div>
                        <div className="text-md">No</div>
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='w-[80%]'>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-lg font-medium">Email</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center relative">
                                <AtSymbolIcon className="absolute left-3 h-[18px] w-[18px]" />
                                <input
                                    {...register('email', {
                                        required: 'Enter your email address',
                                    })}
                                    onChange={(e) => {
                                        const email = e.target.value;
                                        if (email && !isValidEmail(email)) {
                                            setError('email', {
                                                type: 'manual',
                                                message: 'Invalid email format',
                                            });
                                        }
                                        else {
                                            clearErrors('email');
                                        }
                                    }}
                                    placeholder="Email"
                                    className={`${inputClasses} pl-10`}
                                />
                            </div>
                            {
                                errors.email &&
                                <p className="mt-2 text-md font-semibold text-red-600">{errors.email.message}</p>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="location" className="text-lg font-medium">Location</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center relative">
                                <BookmarkIcon className="absolute left-3 h-[18px] w-[18px]" />
                                <input
                                    {...register('location', {
                                        required: 'Enter a location'
                                    })}
                                    placeholder="Enter the location / area where you would like to be notified for (e.g. Smith Street)"
                                    className={`${inputClasses} pl-10`}
                                />
                            </div>
                            {
                                errors.location &&
                                <p className="mt-2 text-md font-semibold text-red-600">{errors.location.message}</p>
                            }
                        </div>
                    </div>

                    <div className={
                        clsx(
                            'flex flex-col gap-2',
                            {
                                'hidden': !includeCoords,
                            }
                        )
                    }>
                        <label htmlFor="latitude" className="text-lg font-medium">Latitude</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center relative">
                                <MinusIcon className="absolute left-3 h-[18px] w-[18px]" />
                                <input
                                    type='number'
                                    step={0.00001}
                                    {...register('latitude', {
                                        min: {
                                            value: -37.99999,
                                            message: 'Enter a value greater than or equal to -37.99999'
                                        },
                                        max: {
                                            value: -37,
                                            message: 'Enter a value less than or equal to -37'
                                        },
                                        validate: {
                                            checkForValue: () => {
                                                if (includeCoords && !getValues('latitude')) {
                                                    return 'Enter a value between -37.99999 and -37';
                                                }
                                            }
                                        }
                                    })}
                                    placeholder="Enter latitude (e.g. -37.12345)"
                                    className={`${inputClasses} pl-10`}
                                />
                            </div>
                            {
                                errors.latitude &&
                                <p className="mt-2 text-md font-semibold text-red-600">{errors.latitude.message}</p>
                            }
                        </div>
                    </div>

                    <div className={
                        clsx(
                            'flex flex-col gap-2',
                            {
                                'hidden': !includeCoords,
                            }
                        )
                    }>
                        <label htmlFor="longtitude" className="text-lg font-medium">Longtitude</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center relative">
                                <PlusIcon className="absolute left-3 h-[18px] w-[18px]" />
                                <input
                                    type='number'
                                    step={0.00001}
                                    {...register('longtitude', {
                                        min: {
                                            value: 174,
                                            message: 'Enter a value greater than or equal to 174'
                                        },
                                        max: {
                                            value: 175.99999,
                                            message: 'Enter a value less than or equal to 175.99999'
                                        },
                                        validate: {
                                            checkForValue: () => {
                                                if (includeCoords && !getValues('longtitude')) {
                                                    return 'Enter a value between 174 and 175.99999';
                                                }
                                            }
                                        }
                                    })}
                                    placeholder="Enter longtitude (e.g. 174.12345)"
                                    className={`${inputClasses} pl-10`}
                                />
                            </div>
                            {
                                errors.longtitude &&
                                <p className="mt-2 text-md font-semibold text-red-600">{errors.longtitude.message}</p>
                            }
                        </div>
                    </div>

                    <button
                        className={
                            clsx(
                                'rounded-xl w-fit p-3 cursor-pointer mt-4 font-bold',
                                {
                                    'bg-gray-600 hover:bg-gray-800': isSubmitting,
                                    'bg-red-600 hover:bg-red-800 text-white': !isSubmitting,
                                }
                            )
                        }
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {onSubPage ? 'Update Subscription' : 'Subscribe'}
                    </button>

                    {
                        isSubmitSuccessful ?
                            (
                                <p className='mt-2 text-md font-semibold text-green-600'>
                                    {
                                        `Subscription ${onSubPage ? 'updated' : 'created'}`
                                    }
                                </p>
                            ) :
                            (
                                isSubmitted && Object.keys(errors).length ?
                                    (
                                        <p className='mt-2 text-md font-semibold text-red-600'>
                                            {
                                                onSubPage && !Object.keys(dirtyFields).length ?
                                                    'Please ensure at least one field has been changed before submitting' :
                                                    'Fix the form errors'
                                            }
                                        </p>
                                    ) :
                                    null
                            )
                    }
                </div>
            </form>
        </>
    );
}
