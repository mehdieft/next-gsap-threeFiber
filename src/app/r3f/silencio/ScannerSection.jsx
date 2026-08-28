"use client";

import Image from "next/image";

export default function ScannerSection({ scannerRef, scannerInfoRef, scannerNumberOneRef, scannerNumberTwoRef }) {
    return (
        <section ref={scannerRef} className="scanner relative h-[80vh] w-svw overflow-hidden p-10 flex justify-end items-center">
            <div dir="ltr" ref={scannerInfoRef} className="silencio-scanner scan-info relative mx-auto flex h-[70vh] w-[90vw] md:w-[20vw] min-w-[320px] flex-col justify-between rounded-xl border border-black/60 p-3">
                <div className="flex items-start justify-between">
                    <div className="relative number-container h-10 w-16 overflow-hidden">
                        <h2 ref={scannerNumberOneRef} className="absolute left-0 top-0 text-4xl font-bold leading-none tracking-tight">#۰۱</h2>
                        <h2 ref={scannerNumberTwoRef} className="absolute left-0 top-0 text-4xl font-bold leading-none tracking-tight">#۰۲</h2>
                    </div>
                    <p className="scan-reveal silencio-meta text-[8px] [writing-mode:vertical-rl]">هویت کسب‌وکار خود را تازه کنید</p>
                </div>
                <p className="scan-reveal silencio-meta absolute left-2 top-1/2 -translate-y-1/2 rotate-180 text-[8px] [writing-mode:vertical-rl]">تفکر جسورانه به‌عنوان پایه</p>
                <div className="flex-1" />
                <div className="scan-reveal mb-2 flex items-center gap-2">
                    <Image src="/images/selencio/barcode.svg" alt="barcode" width={160} height={40} className="h-8 w-36 object-fill" />
                    <span className="purched inline-flex overflow-hidden whitespace-nowrap py-2 px-2 rounded-xl border text-sm border-black/60 uppercase text-red-600 font-bold" />
                </div>
                <div className="scan-reveal flex items-start justify-between gap-3">
                    <div className="w-[38%] text-[10px] leading-[1.3]">
                        <p className="font-bold">برای</p>
                        {[
                            ["اینوفرمیسم", "۸۵٪"], ["نوآوری", "۹۱٪"], ["سفارشی‌سازی", "۸۳٪"], ["تفکر", "۹۲٪"],
                            ["تمایز", "۷۱٪"], ["دقت", "۹۷٪"], ["طراحی برای صفحه", "۹۶٪"], ["پروژه‌های خسته‌کننده", "۰٪"],
                        ].map(([label, value]) => <p key={label} className="flex justify-between font-medium"><span>{label}</span><span>{value}</span></p>)}
                    </div>
                    <div className="w-[34%] space-y-1 text-[10px] leading-[1.4]">
                        <p><span className="font-bold">مواد تشکیل‌دهنده: </span>مفهوم، نام‌گذاری، روایت داستان، هویت کلامی، جایگاه‌سازی، هدف برند</p>
                        <p className="py-3 font-bold">* مفاهیم تاریخ انقضا ندارند.</p>
                        <p className="font-bold">محصولات دیجیتال برای برندهای معاصر</p>
                    </div>
                </div>
            </div>
        </section>
    );
}