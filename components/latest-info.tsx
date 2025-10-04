export default function LatestInfo({ latestInformation }: { latestInformation: string }) {
    if (latestInformation) {
        return (
            <div className='text-lg font-semibold rounded-xl p-3 bg-yellow-400'>{latestInformation}</div>
        );
    }

    return null;
}
