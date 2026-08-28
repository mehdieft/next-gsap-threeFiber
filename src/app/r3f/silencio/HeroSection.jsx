"use client";

import Image from "next/image";

export default function HeroSection({ stopScroll }) {
    return (
        <section className="relative hero w-svw h-svh flex flex-col items-center justify-center text-center px-6">
            <div className="hidden md:absolute left-0 top-1/2 rotate-90 -translate-y-1/2">
                <Image src="/images/selencio/barcode.svg" className="h-auto w-32 " alt="barcode" width={400} height={150} />
            </div>
            <div className="absolute top-10 left-0 w-full flex justify-center"><p className="silencio-meta text-sm uppercase">سلنسیو @ دیجیتال</p></div>
            <div className="flex flex-col items-center">
                <h1 className="silencio-display text-7xl md:text-9xl">محصولات<br />دیجیتال</h1>
                <div className="silencio-subtitle mt-8 flex items-center justify-center gap-3 text-3xl md:text-5xl">
                    <span>برندسازی</span>
                    <Image src="/images/selencio/iso.svg" className="w-8 md:w-10" alt="" width={200} height={200} />
                    <span>و طراحی مدرن</span>
                </div>
                <p className="silencio-body mt-10 max-w-sm text-base md:text-lg">ما فقط محصول طراحی نمی‌کنیم،<br />ما تجربه خلق می‌کنیم.</p>
            </div>
            {!stopScroll && <p className="animate-fade absolute bottom-10 text-sm">برای تجربه خاص اسکرول کنید ↓</p>}
        </section>
    );
}