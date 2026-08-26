"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Environment, Float } from "@react-three/drei";
import { Basket } from "./basket";
import { Bolsa } from "./bolsa";
import { Zumo } from "./zumo";
import { Chocolatia } from "./chocolatia";
import { Can } from "./can";
import { LoadingScreen } from "./LoadingScreen";
import SecondSection from "./secondSection";
import ThirdSection from "./thirdSection";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Leva, useControls } from "leva";
gsap.registerPlugin(ScrollTrigger);

function useModelControls(name, defaults) {
    return useControls(name, {
        position: { value: defaults.position, step: 0.1 },
        rotation: { value: defaults.rotation, step: 0.1 },
        scale: { value: defaults.scale, min: 0.001, max: 0.1, step: 0.001 },
    });
}

function useLoadedObject() {
    const [object, setObject] = useState(null);
    return [object, setObject];
}

export default function Selencio() {
    const [directionColor, setdirectionColor] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [stopScroll, setScrollStart] = useState(false)
    const mainRef = useRef();
    const scannerRef = useRef();
    const scannerInfoRef = useRef();
    const scannerNumberOneRef = useRef();
    const scannerNumberTwoRef = useRef();
    const outroRef = useRef();
    const [basketObject, setBasketObject] = useLoadedObject();
    const [zumoObject, setZumoObject] = useLoadedObject();
    const [chocolatiaObject, setChocolatiaObject] = useLoadedObject();
    const [bolsaObject, setBolsaObject] = useLoadedObject();
    const [canObject, setCanObject] = useLoadedObject();
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const updateIsMobile = () => setIsMobile(mediaQuery.matches);

        updateIsMobile();
        mediaQuery.addEventListener("change", updateIsMobile);
        return () => mediaQuery.removeEventListener("change", updateIsMobile);
    }, []);
    const basketTransform = useModelControls("Basket", {
        position: [0, -5, 0],
        rotation: [0, Math.PI, 0],
        scale: 0.02,
    });
    const zumoTransform = useModelControls("Zumo", {
        position: [1.3, 0, 0],
        rotation: [0, 0, 0],
        scale: 0.01,
    });
    const chocolatiaTransform = useModelControls("Chocolatia", {
        position: [-1, 0, 1],
        rotation: [0, Math.PI / 2, Math.PI / 2],
        scale: 0.005,
    });
    const bolsaTransform = useModelControls("Bolsa", {
        position: [0, 0.5, -1.2],
        rotation: [0, 0, 0],
        scale: 0.01,
    });
    const canTransform = useModelControls("Can", {
        position: [0, 0.3, 0],
        rotation: [0, 0, 1],
        scale: 0.01,
    });
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            if (!mainRef.current || !zumoObject) return;
            gsap.set(scannerNumberTwoRef.current, {
                xPercent: -120,
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top top",
                    endTrigger: scannerRef.current,
                    scrub: true,
                    markers: false,
                    onToggle: () => { setScrollStart(true) }
                },
            });
            timeline.to(".animate-fade", { opacity: 0 });

            if (canObject) {
                timeline.to(
                    canObject.rotation,
                    {
                        x: `+=${Math.PI * 4}`,
                        z: 0,
                        ease: "power1.inOut",
                        duration: 5,
                    },
                    0,
                );
            }

            [chocolatiaObject, bolsaObject, zumoObject]
                .filter(Boolean)
                .forEach((object) => {
                    timeline.to(
                        object.position,
                        {
                            y: "+=8",
                            ease: "power3.inOut",
                            duration: 5,
                        },
                        0,
                    );
                });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scannerRef.current,
                    start: "top top",

                    endTrigger: ".text2",
                    pin: true,
                    pinSpacing: true,
                    scrub: true,
                    markers: false,
                    onEnter: () => setdirectionColor(true),
                    onLeave: () => {
                        setdirectionColor(false);
                    },
                    onEnterBack: () => setdirectionColor(true),
                    onLeaveBack: () => setdirectionColor(false),
                },
            });

            tl.from(".scan-reveal", {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out",
            });

            if (canObject) {
                tl.to(canObject.rotation, {
                    y: `+=${Math.PI * 4}`,
                    ease: "none",
                    duration: 4,
                });
                tl.to(canObject.scale, {
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

            tl.to(".scan-reveal", {
                opacity: 0,
                y: -24,
                stagger: 0.05,
                duration: 0.6,
                ease: "power2.in",
            });
            tl.to(scannerInfoRef.current, {
                width: "96px",
                minWidth: "0px",
                height: "96px",
                overflow: "hidden",

                transformOrigin: "center center",
                duration: 1.2,
                ease: "power3.inOut",
            });
            //add position change
            tl.to(scannerInfoRef.current, {
                x: '20vw',
                duration: 1.2,
                ease: 'power3.in'
            });
            //   tl.to(
            //     scannerNumberOneRef.current,
            //     {
            //       opacity: 0,
            //       duration: 0.25,
            //     },
            //     "<0.65",
            //   );
            //   tl.to(
            //     scannerNumberTwoRef.current,
            //     {
            //       opacity: 1,
            //       duration: 0.35,
            //     },
            //     "<0.1",
            //   );
            tl.to(
                scannerNumberOneRef.current,
                {
                    xPercent: 120,
                    duration: 1,
                    ease: "power2.inOut",
                }
            );

            tl.to(
                scannerNumberTwoRef.current,
                {
                    xPercent: -3,
                    duration: 1,
                    ease: "power2.inOut",
                },
                "<"
            );
            //second object start 
            mm.add("(min-width: 769px)", () => {
                // DESKTOP
                const chips = gsap.timeline({
                    scrollTrigger: {
                        trigger: outroRef.current,
                        start: "top bottom",
                        end: "+=800",
                        scrub: true,
                        invalidateOnRefresh: true,
                        markers: true,
                    },
                });

                chips.to(zumoObject.position, {
                    y: 0,
                    duration: 1.2,
                    ease: "none",
                });
            });
            mm.add("(max-width: 768px)", () => {
                // MOBILE
                const chips = gsap.timeline({
                    scrollTrigger: {
                        trigger: outroRef.current,
                        start: "top 90%",
                        end: "+=400",
                        scrub: true,
                        invalidateOnRefresh: true,
                        markers: true,
                    },
                });

                chips.to(zumoObject.position, {
                    y: -0.5,
                    x:0,
                    duration: 1,
                    ease: "none",
                });
                chips.to(zumoObject.rotation,{
                    y:Math.PI*2.5,
                    z:Math.PI/4,
                    duration:2.3,
                    ease:'power3.in'
                })
            });
        },

        {
            scope: mainRef,
            dependencies: [
                basketObject,
                zumoObject,
                chocolatiaObject,
                bolsaObject,
                canObject,
            ],
        },
    );
    return (
        <>
            {process.env.NODE_ENV === "development" && <Leva collapsed={false} />}
            <LoadingScreen />
            <div className="model fixed z-0 pointer-events-none w-screen h-svh bg-white">
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 40,
                        far: 20,
                        near: 0.1,
                        zoom: 1.4,
                    }}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={2.5} />
                        <directionalLight position={[5, 5, 5]} intensity={8} />
                        <directionalLight position={[-5, 5, 5]} intensity={8} />
                        <Environment intensity={100.05} preset="city" />
                        {directionColor && (
                            <pointLight
                                color="red"
                                position={[0.5, -0.4, 1]}
                                intensity={30.4}
                            />
                        )}
                        <Basket ref={setBasketObject} {...basketTransform} />

                        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                            <Zumo ref={setZumoObject} {...zumoTransform} />
                        </Float>
                        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                            <Chocolatia ref={setChocolatiaObject} {...chocolatiaTransform} />
                        </Float>
                        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                            <Bolsa ref={setBolsaObject} {...bolsaTransform} />
                        </Float>
                        <Float
                            enabled={false}
                            speed={2}
                            rotationIntensity={0.6}
                            floatIntensity={1.5}
                        >
                            <group>
                                <Can ref={setCanObject} {...canTransform} />
                            </group>
                        </Float>
                    </Suspense>
                </Canvas>
            </div>
            <main ref={mainRef} className="relative z-10">
                <section className="relative hero w-svw h-svh flex flex-col items-center justify-center text-center px-6">
                    <div className="hidden md:absolute left-0 top-1/2 rotate-90 -translate-y-1/2">
                        <Image
                            src="/images/selencio/barcode.svg"
                            className="h-auto w-32 "
                            alt="barcode"
                            width={400}
                            height={150}
                        />
                    </div>
                    <div className="absolute top-10 left-0 w-full flex justify-center">
                        <p className="silencio-meta text-sm uppercase">سلنسیو @ دیجیتال</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <h1 className="silencio-display text-7xl md:text-9xl">
                            محصولات
                            <br />
                            دیجیتال
                        </h1>

                        <div className="silencio-subtitle mt-8 flex items-center justify-center gap-3 text-3xl md:text-5xl">
                            <span>برندسازی</span>

                            <Image
                                src="/images/selencio/iso.svg"
                                className="w-8 md:w-10"
                                alt=""
                                width={200}
                                height={200}
                            />

                            <span>و طراحی مدرن</span>
                        </div>

                        <p className="silencio-body mt-10 max-w-sm text-base md:text-lg">
                            ما فقط محصول طراحی نمی‌کنیم،
                            <br />
                            ما تجربه خلق می‌کنیم.
                        </p>
                    </div>

                    {!stopScroll && <p className="animate-fade absolute bottom-10 text-sm">
                        برای تجربه خاص اسکرول کنید ↓
                    </p>}
                </section>
                <SecondSection />
                <ThirdSection />

                <section
                    ref={scannerRef}
                    className="scanner relative h-[80vh] w-svw overflow-hidden p-10 flex justify-center items-center"
                >
                    <div
                        dir="ltr"
                        ref={scannerInfoRef}
                        className="silencio-scanner scan-info relative mx-auto flex h-[70vh] w-[90vw] md:w-[20vw] min-w-[320px] flex-col justify-between rounded-xl border border-black/60 p-3"
                    >
                        {/* top row: number + vertical text */}
                        <div className="flex  items-start justify-between">
                            <div className="relative number-container h-10 w-16 overflow-hidden">
                                <h2
                                    ref={scannerNumberOneRef}
                                    className="absolute left-0 top-0 text-4xl font-bold leading-none tracking-tight"
                                >
                                    #۰۱
                                </h2>

                                <h2
                                    ref={scannerNumberTwoRef}
                                    className="absolute left-0 top-0 text-4xl font-bold leading-none tracking-tight"
                                >
                                    #۰۲
                                </h2>
                            </div>
                            <p className="scan-reveal silencio-meta text-[8px] [writing-mode:vertical-rl]">
                                هویت کسب‌وکار خود را تازه کنید
                            </p>
                        </div>

                        {/* left vertical tagline */}
                        <p className="scan-reveal silencio-meta absolute left-2 top-1/2 -translate-y-1/2 rotate-180 text-[8px] [writing-mode:vertical-rl]">
                            تفکر جسورانه به‌عنوان پایه
                        </p>

                        {/* middle space — the 3D can shows through */}
                        <div className="flex-1" />

                        {/* barcode + scan oval */}
                        <div className="scan-reveal mb-2 flex items-center gap-2">
                            <Image
                                src="/images/selencio/barcode.svg"
                                alt="barcode"
                                width={160}
                                height={40}
                                className="h-8 w-36 object-fill"
                            />
                            <span className="purched inline-flex overflow-hidden whitespace-nowrap py-2 px-2 rounded-xl border text-sm border-black/60 uppercase text-red-600 font-bold">
                                {/* <span className="purched-text  text-[16px]">خریده شد</span> */}
                            </span>{" "}
                        </div>

                        {/* bottom info columns */}
                        <div className="scan-reveal flex items-start justify-between gap-3">
                            <div className="w-[38%] text-[10px] leading-[1.3]">
                                <p className="font-bold ">برای</p>
                                {[
                                    ["اینوفرمیسم", "۸۵٪"],
                                    ["نوآوری", "۹۱٪"],
                                    ["سفارشی‌سازی", "۸۳٪"],
                                    ["تفکر", "۹۲٪"],
                                    ["تمایز", "۷۱٪"],
                                    ["دقت", "۹۷٪"],
                                    ["طراحی برای صفحه", "۹۶٪"],
                                    ["پروژه‌های خسته‌کننده", "۰٪"],
                                ].map(([label, value]) => (
                                    <p key={label} className="flex justify-between font-medium">
                                        <span>{label}</span>
                                        <span>{value}</span>
                                    </p>
                                ))}
                            </div>

                            <div className="w-[34%] space-y-1 text-[10px] leading-[1.4]">
                                <p>
                                    <span className="font-bold">مواد تشکیل‌دهنده: </span>
                                    مفهوم، نام‌گذاری، روایت داستان، هویت کلامی، جایگاه‌سازی، هدف
                                    برند
                                </p>
                                <p className="py-3 font-bold">* مفاهیم تاریخ انقضا ندارند.</p>
                                <p className="font-bold">محصولات دیجیتال برای برندهای معاصر</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    ref={outroRef}
                    dir="rtl"
                    className="outro  relative flex min-h-screen w-[90vw] max-w-[1300px] mx-auto flex-col justify-between overflow-hidden px-6 py-8 md:px-12 md:py-10 text-black font-sans rounded-2xl my-10 select-none"
                >
                    {/* TOP ROW: HEADLINE & BADGE */}
                    <div className="relative w-full">
                        {/* Top Left Badge */}


                        {/* Main Display Typography */}
                        <div className="flex flex-col text-[12vw] lg:text-[105px] font-light leading-[0.95] tracking-tight font-sans">
                            <span>زیبایی‌شناسی</span>

                            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                                <span className="relative inline-block w-[1.4em] h-[0.85em] rounded-xl overflow-hidden border border-black/20 align-middle shrink-0 my-1">
                                    <Image
                                        src="/images/selencio/coca.jpg"
                                        alt="نمایش محصول"
                                        fill
                                        className="object-cover"
                                    />
                                </span>

                                <span>برای جهانی</span>
                            </div>

                            <span>که مدام</span>
                            <span>در حال تغییر است</span>
                        </div>
                    </div>

                    {/* MIDDLE ROW: ICONS & TEXT */}
                    <div className="w-full md:w-1/2 mx-auto flex items-center justify-between my-8 md:my-10">
                        {/* Icon boxes */}
                        <div className="flex items-center gap-2">
                            <div className="border border-black rounded-lg p-2 flex items-center justify-center w-10 h-10">
                                <svg
                                    className="w-5 h-5 stroke-black fill-none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    />
                                </svg>
                            </div>

                            <div className="border border-black rounded-lg p-2 flex items-center justify-center w-10 h-10">
                                <svg
                                    className="w-5 h-5 fill-none stroke-black"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.501.082-.75.136m1.5-.136c1.691.246 3.296.8 4.75 1.624m0 0L19 8.25M14.25 4.728c1.077.587 2.052 1.332 2.902 2.203m-2.902-2.203l3.208 3.208M5 14.5l5.25 5.25m-5.25-5.25l3.208-3.208M10.25 19.75L19 11"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Highlight */}
                        <div className="text-left">
                            <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                                متفاوت، جسور<br />و فراموش‌نشدنی
                            </h3>
                        </div>
                    </div>

                    {/* BOTTOM ROW: 3 COLUMNS */}
                    <div
                        dir="rtl"
                        className="text2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full text-right items-start text-[13px] md:text-[15px] lg:text-[16px] leading-[1.8] font-medium text-black/90"
                    >
                        <p>
                            دنیای امروز مدام در حال تغییر است و برندها باید بتوانند با این
                            تغییرات همراه شوند. هویت یک برند دیگر فقط به لوگو خلاصه نمی‌شود؛
                            تجربه، تصویر، حرکت و نحوه ارتباط با مخاطب، همگی بخشی از شخصیت آن
                            هستند. آنچه اهمیت دارد، ساختن هویتی است که در میان این همه تصویر و
                            صدا، قابل تشخیص و ماندگار باقی بماند.
                        </p>

                        <p>
                            ما برای هر پروژه یک زبان بصری متناسب با شخصیت و هدف آن طراحی
                            می‌کنیم. هیچ برند، مخاطب یا مسیری شبیه دیگری نیست؛ به همین دلیل
                            راه‌حل‌های آماده و تکراری جواب نمی‌دهند. هر تصمیم طراحی باید دلیل
                            خودش را داشته باشد و در نهایت، یک تجربه منسجم و قابل لمس بسازد.
                        </p>

                        <p>
                            طراحی برای ما فقط زیباتر کردن یک صفحه یا محصول نیست. طراحی ابزاری
                            است برای تبدیل یک ایده به چیزی که بتوان آن را دید، حس کرد و به خاطر
                            سپرد. از تایپوگرافی و رنگ تا حرکت و تعامل، هر جزئیات می‌تواند بخشی
                            از داستانی باشد که یک برند را به شکلی متفاوت تعریف می‌کند.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
