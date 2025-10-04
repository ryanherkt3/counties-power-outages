'use client';

import clsx from 'clsx';

export default function FilterDate({ dateText, overrideBg }: { dateText: string, overrideBg: boolean }) {
    return (
        <div
            className={
                clsx(
                    'text-xl text-center p-3 font-semibold rounded-xl cursor-pointer hover:text-white',
                    {
                        'text-white bg-yellow-600 hover:bg-yellow-800' : overrideBg,
                        'text-black bg-gray-300 hover:bg-gray-500' : !overrideBg,
                    }
                )
            }
        >
            {dateText}
        </div>
    );
}
