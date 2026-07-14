export default function VividMotion() {
    return (
        <>
            <header className="fixed top-0 left-0 z-50 w-full ">
                <div className="mx-auto flex h-20  max-w-7xl  items-center justify-between px-0">
                    {/* Logo */}
                    <a href="/" className="text-xl font-bold">
                        LOGO
                    </a>

                    {/* Navigation */}
                    <nav>
                        <ul className="flex items-center gap-10 text-sm uppercase tracking-wider px-9">
                            <li>
                                <a
                                    href="#home"
                                    className="transition-colors hover:text-gray-400"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#work"
                                    className="transition-colors hover:text-gray-400"
                                >
                                    Work
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#about"
                                    className="transition-colors hover:text-gray-400"
                                >
                                    About
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#contact"
                                    className="transition-colors hover:text-gray-400"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}