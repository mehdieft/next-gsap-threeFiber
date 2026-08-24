"use client"
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export function LoadingScreen() {
    const { active, progress } = useProgress();
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const percentage = Math.min(100, Math.round(progress));

    useEffect(() => {
        if (active || progress < 100) return;

        const exitTimer = window.setTimeout(() => setIsExiting(true), 50);
        const hideTimer = window.setTimeout(() => setIsVisible(false), 750);
        return () => {
            window.clearTimeout(exitTimer);
            window.clearTimeout(hideTimer);
        };
    }, [active, progress]);

    if (!isVisible) return null;

    return (
        <div
            dir="rtl"
            role="status"
            aria-live="polite"
            className={`fixed inset-0 z-[100] flex h-svh w-screen flex-col justify-between overflow-hidden bg-[#f4f1eb] px-6 py-8 text-black transition-opacity duration-700 md:px-10 md:py-10 ${isExiting ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
                <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.18em] md:text-xs">
                    <span className="silencio-loader-reveal">سلنسیو @ دیجیتال</span>
                    <span dir="ltr" className="silencio-loader-reveal">2026</span>
                </div>

                <div className="absolute left-1/2 top-1/2 flex w-[min(86vw,720px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                    <div className="relative mb-8 flex h-24 w-24 items-center justify-center md:h-32 md:w-32">
                        <span className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border border-black/20" />
                        <span className="absolute inset-3 rounded-full border border-dashed border-black/30 animate-[spin_12s_linear_infinite_reverse]" />
                        <span className="h-8 w-8 animate-pulse rounded-full bg-black md:h-10 md:w-10" />
                    </div>
                    <p className="mb-4 text-xs tracking-[0.22em] md:text-sm">در حال ورود به تجربه</p>
                    <h1 className="silencio-loader-title text-[clamp(3.5rem,12vw,9rem)] leading-[0.82]">
                        سلنسیو
                    </h1>
                </div>

                <div className="silencio-loader-reveal flex items-end justify-between gap-6 text-[10px] md:text-xs">
                    <span className="max-w-[12rem] leading-relaxed text-black/60">هویت‌های دیجیتال برای برندهای معاصر</span>
                    <div dir="ltr" className="flex w-[min(42vw,360px)] flex-col gap-2">
                        <div className="flex items-center justify-between tracking-[0.18em]">
                            <span>LOADING</span>
                            <span>{percentage}%</span>
                        </div>
                        <div className="h-px w-full bg-black/15">
                            <div
                                className="h-full bg-black transition-[width] duration-300 ease-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                </div>
        </div>
    );
}
