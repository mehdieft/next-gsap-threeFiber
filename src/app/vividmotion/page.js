"use client"
import StarSvg from "../components/vividmotion/starSvg"
export default function VividMotion() {
    return (
        <>
            <header className="fixed top-0 left-0 z-50 w-full ">
                <div className="mx-auto flex h-20  max-w-7xl text-white  items-center justify-between px-0">
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

                            <li className="flex justify-center items-center gap-1">
                                <StarSvg className="w-5" />
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
            <div className="w-screen h-[75vh] bg-black relative">
                <div id="3dscene" className="absolute inset-0 "></div>
                <h1 className="absolute left-10 top-1/3 text-7xl max-w-4/9 text-white">hello to my world feel my control </h1>
                <div className="absolute bottom-0 w-full bg-gray-400 p-10"></div>

            </div>
        </>
    )
}