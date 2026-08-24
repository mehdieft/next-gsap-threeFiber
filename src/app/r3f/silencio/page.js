"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Float } from "@react-three/drei";
import { Basket } from "./basket";
import { Bolsa } from "./bolsa";
import { Zumo } from "./zumo";
import { Chocolatia } from "./chocolatia";
import { Can } from './can';
import { Environment } from "@react-three/drei";
import SecondSection from './secondSection';
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
    const mainRef = useRef();
    const scannerRef = useRef();
    const scannerInfoRef = useRef();
    const scannerNumberOneRef = useRef();
    const scannerNumberTwoRef = useRef();
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
        position: [0, 0, 0],
        rotation: [0, 0, 1],
        scale: 0.01,
    });
    useGSAP(() => {
        if (!mainRef.current || !zumoObject) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 6,
                markers: false,
            },
        });
        timeline.to('.animate-fade', { opacity: 0 })

        if (canObject) {
            timeline.to(canObject.rotation, {
                x: `+=${Math.PI * 4}`,
                z: 0,
                ease: "power1.inOut",
                duration: 6,
            }, 0);
        }

        [chocolatiaObject, bolsaObject, zumoObject]
            .filter(Boolean)
            .forEach((object) => {
                timeline.to(object.position, {
                    y: "+=8",
                    ease: "power3.inOut",
                    duration: 5,
                }, 0);
            });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scannerRef.current,
                start: 'top top',
                end: "+=800",

                pin: true,
                pinSpacing: true,
                scrub: 1,
                markers: false,
                onEnter: () => setdirectionColor(true),
                onLeave: () => setdirectionColor(false),
                onEnterBack: () => setdirectionColor(true),
                onLeaveBack: () => setdirectionColor(false),
            },
          
        })

        tl.from('.scan-reveal', {
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

        tl.to('.scan-reveal', {
            opacity: 0,
            y: -24,
            stagger: 0.05,
            duration: 0.6,
            ease: "power2.in",
        });
        tl.to(scannerInfoRef.current, {
            width: isMobile ? "42vw" : "12vw",
            minWidth: isMobile ? "150px" : "0px",
            height: isMobile ? "34vh" : "38vh",
            x: isMobile ? "20vw" : "28vw",
            duration: 1.2,
            ease: "power3.inOut",
        });
        tl.to(scannerNumberOneRef.current, {
            opacity: 0,
            duration: 0.25,
        }, "<0.65");
        tl.to(scannerNumberTwoRef.current, {
            opacity: 1,
            duration: 0.35,
        }, "<0.1");
    }, {
        scope: mainRef,
        dependencies: [
            basketObject,
            zumoObject,
            chocolatiaObject,
            bolsaObject,
            canObject,
        ],
    });
    return (
        <>
            {process.env.NODE_ENV === "development" && <Leva collapsed={false} />}
            <div className="model fixed z-0 pointer-events-none w-screen h-svh bg-white">
                <Canvas camera={{ position: [0, 0, 5], fov: 40, far: 20, near: 0.1, zoom: isMobile ? 0.5 : 1.4, }} >
                    <ambientLight intensity={2.5} />
                    <directionalLight position={[5, 5, 5]} intensity={8} />
                    <directionalLight position={[-5, 5, 5]} intensity={8} />
                    <Environment intensity={100.05} preset="city" />
                    {directionColor && <pointLight color="red" position={[0.5, -0.4, 1]} intensity={30.4} />}
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
                    <Float enabled={false} speed={2} rotationIntensity={0.6} floatIntensity={1.5}>
                        <group>

                            <Can ref={setCanObject} {...canTransform} />
                        </group>
                    </Float>
                </Canvas>
            </div>
            <main ref={mainRef} className="relative z-10">
                <section className="relative hero w-svw h-svh flex flex-col items-center justify-center text-center px-6">

                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <Image
                            src="/images/selencio/barcode.svg"
                            className="h-auto w-32 rotate-90"
                            alt="barcode"
                            width={400}
                            height={150}
                        />
                    </div>
                    <div className="absolute top-10 left-0 w-full flex justify-center">
                        <p className="text-sm uppercase tracking-wider">
                            سلنسیو @ دیجیتال
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <h1 className="text-7xl md:text-9xl font-bold leading-[0.85]  tracking-tight">
                            محصولات
                            <br />
                            دیجیتال
                        </h1>

                        <div className="mt-8 flex items-center justify-center gap-3 text-3xl md:text-5xl font-medium">
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

                        <p className="mt-10 max-w-sm text-base md:text-lg leading-relaxed">
                            ما فقط محصول طراحی نمی‌کنیم،
                            <br />
                            ما تجربه خلق می‌کنیم.
                        </p>
                    </div>

                    <p className="animate-fade absolute bottom-10 text-sm">
                        برای تجربه خاص اسکرول کنید ↓
                    </p>
                </section>
                <SecondSection />
                <ThirdSection />

                <section ref={scannerRef} className="scanner h-svh w-svw p-10 flex justify-center items-center">
                    <div
                        dir="ltr"
                        ref={scannerInfoRef}
                        className="scan-info relative mx-auto flex h-[70vh] w-[20vw] min-w-[320px] flex-col justify-between rounded-xl border border-black/60 p-3"
                    >
                        {/* top row: number + vertical text */}
                        <div className="scan-reveal flex items-start justify-between">
                            <div className="relative h-10 w-16">
                                <h2 ref={scannerNumberOneRef} className="absolute left-0 top-0 text-4xl font-bold leading-none tracking-tight">#۰۱</h2>
                                <h2 ref={scannerNumberTwoRef} className="absolute left-0 top-0 text-4xl font-bold leading-none tracking-tight opacity-0">#۰۲</h2>
                            </div>
                            <p className="text-[8px] tracking-[0.2em] [writing-mode:vertical-rl]">
                                هویت کسب‌وکار خود را تازه کنید
                            </p>
                        </div>

                        {/* left vertical tagline */}
                        <p className="scan-reveal absolute left-2 top-1/2 -translate-y-1/2 rotate-180 text-[8px] tracking-[0.2em] [writing-mode:vertical-rl]">
                            تفکر جسورانه به‌عنوان پایه
                        </p>

                        {/* middle space — the 3D can shows through */}
                        <div className="flex-1" />

                        {/* barcode + scan oval */}
                        <div className="scan-reveal mb-2 flex items-end gap-2">
                            <Image
                                src="/images/selencio/barcode.svg"
                                alt="barcode"
                                width={160}
                                height={40}
                                className="h-8 w-36 object-fill"
                            />
                            <span className="h-5 w-9 rounded-[50%] border border-black/60" />
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

                            <p className="text-[9px] font-bold">۳۳۰ ملی‌لیتر</p>

                            <div className="w-[34%] space-y-1 text-[8px] leading-[1.4]">
                                <p>
                                    <span className="font-bold">مواد تشکیل‌دهنده: </span>
                                    مفهوم، نام‌گذاری، روایت داستان، هویت کلامی،
                                    جایگاه‌سازی، هدف برند
                                </p>
                                <p>* مفاهیم تاریخ انقضا ندارند.</p>
                                <p className="font-bold">
                                    محصولات دیجیتال برای برندهای معاصر
                                </p>
                            </div>
                        </div>
                    </div>
                  
                </section>
                <section dir="rtl" className="outro flex min-h-[60svh] flex-col items-center justify-center px-6 py-24 text-center">
                    <p className="mb-6 text-xs uppercase tracking-[0.3em] text-black/60">سلنسیو @ دیجیتال</p>
                    <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-7xl">
                        ایده‌ی بعدی شما،
                        <br />
                        تجربه‌ی بعدی ماست.
                    </h2>
                    <p className="mt-8 max-w-md text-sm leading-relaxed text-black/70 md:text-base">
                        برای ساختن یک هویت دیجیتال متمایز آماده‌اید؟
                    </p>
                </section>
            </main>
        </>
    );
}
