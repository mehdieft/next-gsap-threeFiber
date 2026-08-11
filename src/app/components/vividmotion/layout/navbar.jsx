import Link from "next/link";
import  StarSvg  from "../starSvg";
import HoverText from "../hoverText";

export const Navbar=()=>{
    return(
        <>
        <header className="fixed top-0 left-0 z-50 w-full ">
                    <div className="mx-auto flex h-20  max-w-7xl text-white  items-center justify-between px-0">
                        {/* Logo */}
                        <Link href="/vividmotion" className="text-xl font-bold">
                            <HoverText className="text-white" text="LOGO" />
                        </Link>

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

                                <li
                                    className=" flex items-center gap-2
                                                 px-5 py-3
                                                 rounded-full
                                                 bg-white/10
                                                 backdrop-blur-xl
                                                 border border-white/20
                                                 shadow-[0_8px_32px_rgba(0,0,0,0.15)]
                                                 transition-all duration-300
                                                 hover:bg-white/20"
                                >
                                    <StarSvg className="w-5" />
                                    <a
                                        href="#contact"
                                        className="transition-colors hover:text-gray-400"
                                    >
                                        <HoverText text="Contact" className="text-white" />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
        </>
    )
}