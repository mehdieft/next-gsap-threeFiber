"use client";

import Image from "next/image";

export default function OutroSection({ outroRef }) {
    return (
        <section ref={outroRef} dir="rtl" className="outro relative flex min-h-screen w-[90vw] max-w-325 mx-auto flex-col justify-between overflow-hidden px-6 py-8 md:px-12 md:py-10 text-black font-sans rounded-2xl my-10 select-none">
            <div className="relative w-full">
                <div className="flex flex-col text-shadow-lg/10 text-[12vw] lg:text-[105px] font-light leading-[0.95] tracking-tight font-sans">
                    <span>زیبایی‌شناسی</span>
                    <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                        <span className="relative inline-block w-[1.4em] h-[0.85em] rounded-xl overflow-hidden border border-black/20 align-middle shrink-0 my-1"><Image src="/images/selencio/coca.jpg" alt="نمایش محصول" fill className="object-cover" /></span>
                        <span>برای جهانی</span>
                    </div>
                    <span>که مدام</span>
                    <span>در حال تغییر است</span>
                </div>
            </div>
            <div className="w-full md:w-1/2 mx-auto flex items-center justify-between my-8 md:my-10">
                <div className="flex items-center  gap-2">
                    <div className="border border-black rounded-lg p-2 flex items-center justify-center w-10 h-10"><svg className="w-5 h-5 stroke-black fill-none" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg></div>
                    <div className="border border-black rounded-lg p-2 flex items-center justify-center w-10 h-10"><svg className="w-5 h-5 fill-none stroke-black" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.501.082-.75.136m1.5-.136c1.691.246 3.296.8 4.75 1.624m0 0L19 8.25M14.25 4.728c1.077.587 2.052 1.332 2.902 2.203m-2.902-2.203l3.208 3.208M5 14.5l5.25 5.25m-5.25-5.25l3.208-3.208M10.25 19.75L19 11" /></svg></div>
                </div>
                <div className="text-left"><h3 className="text-2xl text-shadow-sm md:text-4xl font-black tracking-tight leading-tight">متفاوت، جسور<br />و فراموش‌نشدنی</h3></div>
            </div>
            <div dir="rtl" className="text2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full text-right items-start text-[13px] md:text-[15px] lg:text-[16px] leading-[1.8] font-medium text-black/90 ">
                <p>دنیای امروز مدام در حال تغییر است و برندها باید بتوانند با این تغییرات همراه شوند. هویت یک برند دیگر فقط به لوگو خلاصه نمی‌شود؛ تجربه، تصویر، حرکت و نحوه ارتباط با مخاطب، همگی بخشی از شخصیت آن هستند. آنچه اهمیت دارد، ساختن هویتی است که در میان این همه تصویر و صدا، قابل تشخیص و ماندگار باقی بماند.</p>
                <p>ما برای هر پروژه یک زبان بصری متناسب با شخصیت و هدف آن طراحی می‌کنیم. هیچ برند، مخاطب یا مسیری شبیه دیگری نیست؛ به همین دلیل راه‌حل‌های آماده و تکراری جواب نمی‌دهند. هر تصمیم طراحی باید دلیل خودش را داشته باشد و در نهایت، یک تجربه منسجم و قابل لمس بسازد.</p>
                <p>طراحی برای ما فقط زیباتر کردن یک صفحه یا محصول نیست. طراحی ابزاری است برای تبدیل یک ایده به چیزی که بتوان آن را دید، حس کرد و به خاطر سپرد. از تایپوگرافی و رنگ تا حرکت و تعامل، هر جزئیات می‌تواند بخشی از داستانی باشد که یک برند را به شکلی متفاوت تعریف می‌کند.</p>
            </div>
        </section>
    );
}