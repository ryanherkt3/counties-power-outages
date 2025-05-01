'use client';

export default function SkeletonNavBar() {
    const colourClasses = 'text-black border-gray-400 bg-white';
    const textClasses = 'text-2xl md:text-4xl font-semibold';
    const navClasses = 'flex justify-between items-center sticky top-0 h-20 px-6 py-4 border-b z-20';

    return (
        <div className={`${colourClasses} ${textClasses} ${navClasses}`}>
            <div className='text-xl font-semibold text-black hover:text-red-400'>Counties Power Outages App</div>
            <div className="shimmer max-md:w-8 md:w-[217px] h-8"></div>
        </div>
    );
}
