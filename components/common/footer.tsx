export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerClasses =
        'antialiased text-lg flex flex-row h-20 p-4 justify-between items-center border-t bg-white border-gray-400';

    return (
        <footer
            className={footerClasses}>
            <div>&copy; Ryan Herkt {currentYear}</div>
            <a
                className="visited:text-purple-500 hover:text-blue-500 text-blue-500"
                href="https://github.com/ryanherkt3/"
                target="_blank"
            >
                <span>Github</span>
            </a>
        </footer>
    );
}
