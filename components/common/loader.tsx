const fillAnimation = `
  @keyframes fillFromBottom {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  /* animate the mask rectangle */
  .fill-rect {
    animation: fillFromBottom 3s infinite alternate;
    transform-box: fill-box;
    transform-origin: center bottom;
  }
`;

export default function Loader({ text } : { text: string }) {
    return (
        <div className='flex flex-col gap-6 items-center justify-center text-center p-10 page-min-height lg:h-screen'>
            <style>{fillAnimation}</style>

            <div className="text-red-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-30 w-30 text-red-600"
                >
                    <defs>
                        <mask id="fillMask">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="white"
                            className="fill-rect"
                        />
                        </mask>
                    </defs>

                    <path
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                        fill="currentColor"
                        mask="url(#fillMask)"
                    />
                </svg>
            </div>

            <h1 className="text-3xl font-semibold">{text}</h1>
        </div>
    );
}
