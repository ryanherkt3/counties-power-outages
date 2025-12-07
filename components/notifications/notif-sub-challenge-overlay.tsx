/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import { getSubByLocation } from '@/lib/actions';
import { ChallengeOutcome, ChallengeVariables } from '@/lib/definitions';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import { useForm, useFormState } from 'react-hook-form';

interface NotifSubChallengeOverlayProps {
  onSubPage: boolean;
  stateUpdate: (outcome: ChallengeOutcome) => void;
  challengeVariables: ChallengeVariables;
}

export default function NotifSubChallengeOverlay(
    {
        onSubPage,
        stateUpdate,
        challengeVariables
    } : NotifSubChallengeOverlayProps
) {
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            location: '',
        },
    });

    const { errors, isSubmitting } = useFormState({ control, name: ['location'] });

    const onSubmit = async(data: { location: string }) => {
        stateUpdate('pending');

        const userSub = await getSubByLocation(data.location, challengeVariables);

        stateUpdate(userSub ? 'success' : 'failed');
    };

    return (
        <div
            className={
                `fixed flex flex-col gap-8 px-4 py-6 text-center
                top-0 left-0 bottom-0 overflow-y-auto
                w-full h-full z-20 bg-linear-to-b from-red-200 to-slate-500`
            }
        >
            <div className="flex flex-row gap-10 justify-between">
                <div className="text-2xl font-semibold text-black">
                    Challenge: Please enter a location you are subscribed to
                </div>
                <button
                    onClick={
                        () => {
                            if (onSubPage) {
                                redirect('/');
                            }
                            else {
                                stateUpdate('failed');
                            }
                        }
                    }
                >
                    <XMarkIcon className='w-7 cursor-pointer' />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2 items-center relative">
                            <input
                                { ...register('location', { required: 'Enter a location' }) }
                                placeholder='Smith Street'
                                className={
                                    `bg-white peer block w-full rounded-lg p-3 pr-9 text-lg
                                    placeholder:text-gray-500 border-2 border-red-600
                                    focus:outline-none focus:ring-0 focus:border-4
                                    focus:border-red-800 focus-visible:border-red-800`
                                }
                            />
                        </div>
                        {
                            errors.location &&
                            <p className="mt-2 text-md font-semibold text-red-600">{errors.location.message}</p>
                        }
                    </div>
                </div>

                <div className='text-center text-lg'>Location checking is case insensitive</div>

                <button
                    className={
                        `flex flex-row gap-2 bg-red-600 hover:bg-red-800 text-white
                        self-center font-semibold rounded-xl p-3 cursor-pointer`
                    }
                    type='submit'
                    disabled={isSubmitting}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
