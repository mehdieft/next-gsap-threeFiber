"use client";

import Link from "next/link";
import { useState } from "react";
import  StarSvg  from "../starSvg";
import HoverText from "../hoverText";

export const Navbar=()=>{
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return(
        <>
        <header className="fixed top-0 left-0 z-50 w-full">
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 text-white sm:px-6 lg:px-0">
                        {/* Logo */}
                        <Link href="/vividmotion" className="text-xl font-bold">
                            <HoverText className="text-white" text="LOGO" />
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen((open) => !open)}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
                        >
                            {isMobileMenuOpen ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <line x1="4" y1="6" x2="20" y2="6" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <line x1="4" y1="18" x2="20" y2="18" />
                                </svg>
                            )}
                        </button>

                        {/* Navigation */}
                        <nav className="hidden lg:block">
                            <ul className="flex items-center gap-10 px-9 text-sm uppercase tracking-wider">
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
                                        <HoverText text="تماس با ما" className="text-gray-200" />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="border-t border-white/10 bg-[#0d1412]/95 px-4 py-4 backdrop-blur-xl lg:hidden">
                            <nav>
                                <ul className="flex flex-col gap-2 text-sm uppercase tracking-wider text-white">
                                    <li>
                                        <a
                                            href="#home"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block rounded-2xl px-4 py-3 transition hover:bg-white/10"
                                        >
                                            Home
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#work"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block rounded-2xl px-4 py-3 transition hover:bg-white/10"
                                        >
                                            Work
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#about"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block rounded-2xl px-4 py-3 transition hover:bg-white/10"
                                        >
                                            About
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#contact"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 transition hover:bg-white/20"
                                        >
                                            <StarSvg className="w-5" />
                                            <HoverText text="تماس با ما" className="text-gray-200" />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </header>
        </>
    )
}