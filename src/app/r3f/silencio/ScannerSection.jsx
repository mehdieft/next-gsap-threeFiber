"use client";

import Image from "next/image";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger)

export default function ScannerSection({ modelRef, scannerId, position }) {
  
    const containerRef=useRef()
    const scannerRef=useRef()
    const endRef = useRef()
    const infoRef = useRef()
    const numberOneRef = useRef()
    const numberTwoRef = useRef()
    const positionClass = {
        left: "left-10",
        center: "left-1/2 -translate-x-1/2",
        right: "right-10 top-1/2",
    }[position] ?? "left-1/2 -translate-x-1/2";
            useGSAP(()=>{
                if (!containerRef.current || !scannerRef.current)
            return
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scannerRef.current,
                    start: "top top",
                    endTrigger: endRef.current,
                    pin: true,
                    pinSpacing: true,
                    scrub: true,
                    markers: false,
                    // onEnter: () => setdirectionColor(true),
                    // onLeave: () => {
                    //     setdirectionColor(false);
                    // },
                    // onEnterBack: () => setdirectionColor(true),
                    // onLeaveBack: () => setdirectionColor(false),
                },
            });

            const select = gsap.utils.selector(containerRef)

            tl.from(select(".scan-reveal"), {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out",
            });

            if (modelRef) {
                tl.to(modelRef.rotation, {
                    y: `+=${Math.PI * 4}`,
                    ease: "none",
                    duration: 4,
                });
                tl.to(modelRef.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power2.in",
                    duration: 0.8,
                });
            }
            //     tl.to(purchased, {
            //     width: targetWidth,
            //     duration: 1,
            //     ease: "power2.inOut",
            // });

            // tl.to(purchasedText, {
            //     opacity: 1,
            //     duration: 0.2,
            // });


            tl.to(select(".scan-reveal"), {
                opacity: 0,
                y: -24,
                stagger: 0.05,
                duration: 1.6,
                ease: "power2.in",
            });
            tl.to(infoRef.current, {
                width: "96px",
                minWidth: "0px",
                height: "96px",
                overflow: "hidden",

                transformOrigin: "center center",
                duration: 1.2,
                ease: "power3.inOut",
            });
            //add position change
            tl.to(infoRef.current, {
                x: {
                    left: "20vw",
                    center: "20vw",
                    right: "-20vw",
                }[position] ?? "0vw",
                duration: 1.2,
                ease: 'power3.in'
            });
            tl.to(
                numberOneRef.current,
                {
                    xPercent: 120,
                    duration: 1,
                    ease: "power2.inOut",
                }
            );

            tl.to(
                numberTwoRef.current,
                {
                    xPercent: -3,
                    duration: 1,
                    ease: "power2.inOut",
                },
                "<"
            );

    }, { scope: containerRef, dependencies: [modelRef], revertOnUpdate: true })

    return (
        <div ref={containerRef}>
        <section
            id={scannerId}
            ref={scannerRef}
            className="scanner relative   h-svh w-svw overflow-hidden p-10"
        >
            <div ref={infoRef} dir="ltr" className={`silencio-scanner scan-info absolute top-1/2 -translate-y-1/2 flex h-[70vh] w-[90vw] md:w-[30vw] min-w-[320px] flex-col justify-between rounded-xl border border-black/60 p-3 ${positionClass}`}>
                <div className="flex items-start justify-between">
                    <div className="relative number-container h-10 w-16 overflow-hidden">
                        <h2 ref={numberOneRef} className="absolute left-0 top-0 text-4xl font-bold leading-none tracking-tight">#۰۱</h2>
                        <h2 ref={numberTwoRef} className="absolute -left-full top-0 text-4xl font-bold leading-none tracking-tight">#۰۲</h2>
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
        <div ref={endRef} className="end-animation"></div>
        </div>
    );
}