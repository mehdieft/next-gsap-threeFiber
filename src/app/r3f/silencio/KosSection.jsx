"use client";

import Image from "next/image";
import { FiArrowUpLeft, FiArrowUpRight, FiAperture } from "react-icons/fi";

export default function KosSection() {
    return (
        <section
            id="kos"
            dir="rtl"
            aria-labelledby="kos-title"
            className="
                relative isolate min-h-svh overflow-hidden
              
                px-[clamp(1.25rem,4vw,5rem)]
                py-[clamp(1.25rem,3vw,2.5rem)]
            "
        >
            {/* Subtle background detail */}
        

            {/* Top navigation / section meta */}
           

            {/* Hero */}
            <div className="mx-auto flex min-h-[72svh] max-w-[1400px] flex-col justify-between">
                <div>
                    {/* Small intro */}
                    <div className="mt-[clamp(4rem,10vw,8rem)] flex items-center gap-3 text-sm text-black/55 sm:text-base">
                        <FiAperture
                            className="size-5 shrink-0"
                            aria-hidden="true"
                        />
                        <span>پروژه‌های واقعاً متفاوت</span>
                    </div>

                    {/* Main typography */}
                    {Array.from({length:2}).map((index)=>{

                        <h2
                        key={index}
                        id={`kos-title-${index}`}
                        className="
                        mt-8
                        text-center
                            text-[clamp(4rem,11vw,11rem)]
                            font-light
                            leading-[0.85]
                            tracking-[-0.045em]
                        "
                    >
                        <span>ضروری</span>

                        <span
                            className="
                                relative mx-[0.12em]
                                inline-block
                                aspect-[1.5]
                                w-[clamp(5rem,13vw,13rem)]
                                translate-y-[0.06em]
                                overflow-hidden
                                rounded-[0.18em]
                                align-middle
                                shadow-[0_12px_40px_rgba(0,0,0,.12)]
                                "
                                >
                            <Image
                                src="/images/selencio/coca.jpg"
                                alt="کیسه خرید روی نیمکت"
                                fill
                                priority
                                sizes="(max-width: 768px) 30vw, 15vw"
                                className="
                                object-cover
                                grayscale-[15%]
                                transition-transform
                                duration-700
                                ease-out
                                hover:scale-105
                                "
                                />

                            <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-black/5"
                            />
                        </span>

                        <span>است</span>
                    </h2>
                    })}

                    {/* Supporting copy */}
                    <div className="mx-auto mt-[clamp(4rem,8vw,7rem)] grid max-w-4xl gap-10 sm:grid-cols-2 sm:gap-16">
                        <div className="border-t border-black/15 pt-4">
                            <span className="mb-4 block text-[0.65rem] text-black/40">
                                ۰۱ — حضور
                            </span>

                            <p className="text-[clamp(.9rem,1.15vw,1.1rem)] leading-[1.9] text-black/75">
                                حضور دیجیتال امروز برای هر برند ضروری است.
                                این حضور باید سازمان را منعکس کند، با مخاطب
                                ارتباط بسازد و تجربه‌ای تازه و به‌یادماندنی
                                خلق کند.
                            </p>
                        </div>

                        <div className="border-t border-black/15 pt-4">
                            <span className="mb-4 block text-[0.65rem] text-black/40">
                                ۰۲ — تجربه
                            </span>

                            <p className="text-[clamp(.9rem,1.15vw,1.1rem)] leading-[1.9] text-black/75">
                                وب‌سایت بخش مهمی از هویت یک برند است. ما ظاهر
                                و رفتار آن را هم‌زمان طراحی می‌کنیم تا هر
                                تعامل، واضح، انسانی و ماندگار باشد.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom statement */}
                <div className="mt-20 mx-auto flex flex-col gap-8 border-t border-black/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <p
                        className="
                            max-w-3xl
                            text-[clamp(1.8rem,3.6vw,4rem)]
                            font-normal
                            leading-[1.15]
                            tracking-[-0.025em]
                            text-balance
                        "
                    >
                        ما سایت‌های تعاملی طراحی می‌کنیم که به کاربر اجازه
                        می‌دهند تجربه‌ای منحصربه‌فرد و ماندگار داشته باشد.
                    </p>

                    {/* <a
                        href="#scanner-secondary"
                        className="
                            group flex shrink-0 items-center gap-3
                            text-sm
                            transition-opacity
                            hover:opacity-60
                        "
                    >
                        <span className="flex size-10 items-center justify-center rounded-full border border-black/25 transition-all duration-300 group-hover:bg-black group-hover:text-white">
                            <FiArrowUpLeft
                                className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </span>

                        <span>استودیو سلنسیو</span>
                    </a> */}
                </div>
            </div>

            {/* Decorative vertical index */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    bottom-8 left-5
                    hidden items-center gap-3
                    text-[0.6rem] text-black/30
                    md:flex
                    [writing-mode:vertical-rl]
                "
            >
                <span>SCROLL TO EXPLORE</span>
                <span className="h-12 w-px bg-black/20" />
                <span>۰۳</span>
            </div>
        </section>
    );
}
