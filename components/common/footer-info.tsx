export default function FooterInfo() {
    return (
        <>
            <div className="lg:text-white">&copy; Ryan Herkt {new Date().getFullYear()}</div>
            <a
                className="visited:text-purple-500 hover:text-blue-500 text-blue-500"
                href="https://github.com/ryanherkt3/"
                target="_blank"
            >
                <span>GitHub</span>
            </a>
        </>
    );
}
