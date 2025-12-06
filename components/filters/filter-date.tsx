'use client';

import clsx from 'clsx';

export default function FilterDate({ dateText, overrideBg }: { dateText: string, overrideBg: boolean }) {
    return (
        <div
            className={
                clsx(
                    'text-xl text-center p-3 font-semibold rounded-xl cursor-pointer border-red-600',
                    {
                        'text-white bg-red-600 hover:bg-red-800' : overrideBg,
                        'border hover:bg-red-600 grow text-red-600 hover:text-white' : !overrideBg,
                    }
                )
            }
        >
            {dateText}
        </div>
    );
}
