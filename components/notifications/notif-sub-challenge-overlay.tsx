/* eslint-disable max-len */
'use client';

import { getSubByLocation } from '@/lib/actions';
import { ChallengeVariables } from '@/lib/definitions';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import { useForm, useFormState } from 'react-hook-form';

export default function NotifSubChallengeOverlay(
    {
        onSubPage,
        stateUpdate,
        challengeVariables
    } :
    {
        onSubPage: boolean;
        stateUpdate: Function;
        challengeVariables: ChallengeVariables;
    }
) {
    const layoutCss = 'fixed flex flex-col gap-8';
    const positionScrollCss = 'top-0 left-0 bottom-0 overflow-y-auto';

    const buttonCss = 'flex flex-row gap-2 bg-red-600 hover:bg-red-800 text-white self-center font-semibold rounded-xl p-3 cursor-pointer';
    const inputCss = 'w-full rounded-lg border border-gray-200 p-3 text-md outline-2 placeholder:text-gray-500';

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            location: '',
        },
    });

    const { errors, isSubmitting } = useFormState({ control, name: ['location'] });

    const onSubmit = async(data: { location: string}) => {
        stateUpdate('pending');

        const userSub = await getSubByLocation(data.location, challengeVariables);

        stateUpdate(userSub ? 'success' : 'failed');
    };

    return (
        <div className={`${layoutCss} px-4 py-6 text-center ${positionScrollCss} w-[100%] h-[100%] z-20 bg-white`}>
            <div className="flex flex-row gap-10 justify-between">
                <div className="text-2xl font-semibold text-black">Challenge: Please enter a location you are subscribed to</div>
                <button onClick={ () => onSubPage ? redirect('/') : stateUpdate('failed') }>
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
                                className={inputCss}
                            />
                        </div>
                        {
                            errors.location &&
                            <p className="mt-2 text-md font-semibold text-red-600">{errors.location.message}</p>
                        }
                    </div>
                </div>
                <div className='text-center'>Location checking is case insensitive</div>
                <button className={buttonCss} type='submit' disabled={isSubmitting}>Submit</button>
            </form>
        </div>
    );
}
