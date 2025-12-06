'use client';

import { RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import content from '../../app/content.json';
import { update } from '@/state/disclaimer-overlay-view/disclaimerOverlayView';
import CustomIcon from '../custom-icon';

export default function FilterOverlay() {
    const showOverlay = useSelector((state: RootState) => state.disclaimerOverlayView.value);
    const dispatch = useDispatch();

    return (
        <div
            className={
                clsx(
                    'fixed flex top-0 left-0 bottom-0 w-full h-full z-20 bg-[rgba(0,0,0,0.5)]',
                    {
                        'hidden': !showOverlay
                    }
                )
            }
        >
            <div className='sm:w-[50%] w-[80%] h-fit max-h-[60%] overflow-y-auto m-auto'>
                <div className="flex flex-col gap-4 bg-white p-6">
                    <div className="flex flex-row gap-2 justify-between text-black">
                        <span className="text-center text-2xl font-semibold grow">Disclaimer</span>
                        <button onClick={
                            () => {
                                dispatch(update(false));
                            }
                        }>
                            <CustomIcon icon={'XMarkIcon'} iconClass={'w-7 cursor-pointer'} />
                        </button>
                    </div>
                    <span className="text-center text-lg">{content.disclaimer}</span>
                </div>
            </div>
        </div>
    );
}