"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import SecondSection from "./secondSection";
import ThirdSection from "./thirdSection";
import CanvasScene from "./CanvasScene";
import HeroSection from "./HeroSection";
import ScannerSection from "./ScannerSection";
import OutroSection from "./OutroSection";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Leva } from "leva";
gsap.registerPlugin(ScrollTrigger);

export default function Selencio() {
    const [directionColor, setdirectionColor] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [stopScroll, setScrollStart] = useState(false)
    const mainRef = useRef();
    const scannerRef = useRef();
    const outroRef = useRef();
    const [objects, setObjects] = useState({});
    const { basketObject, zumoObject, chocolatiaObject, bolsaObject, canObject } = objects;
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const updateIsMobile = () => setIsMobile(mediaQuery.matches);

        updateIsMobile();
        mediaQuery.addEventListener("change", updateIsMobile);
        return () => mediaQuery.removeEventListener("change", updateIsMobile);
    }, []);
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            if (!mainRef.current || !zumoObject) return;
            gsap.set("#scanner-primary-number-two", {
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
                            y: "+=4",
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

            tl.from("scanner-primary .scan-reveal", {
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


            tl.to("#scanner-primary .scan-reveal", {
                opacity: 0,
                y: -24,
                stagger: 0.05,
                duration: 0.6,
                ease: "power2.in",
            });
            tl.to("#scanner-primary-info", {
                width: "96px",
                minWidth: "0px",
                height: "96px",
                overflow: "hidden",

                transformOrigin: "center center",
                duration: 1.2,
                ease: "power3.inOut",
            });
            //add position change
            tl.to("#scanner-primary-info", {
                x: '20vw',
                duration: 1.2,
                ease: 'power3.in'
            });
            tl.to(
                "#scanner-primary-number-one",
                {
                    xPercent: 120,
                    duration: 1,
                    ease: "power2.inOut",
                }
            );

            tl.to(
                "#scanner-primary-number-two",
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
                        end: "top top",
                        endTrigger: '.sandis-container',
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
                chips.to(zumoObject.rotation, {
                    z: Math.PI * 2,
                    y: Math.PI * 2,
                    duration: 4,
                    ease: 'none'
                }, '<0.4')
                const tl2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sandis-container',
                        start: 'top top',
                        endTrigger: '.kos',
                        pin: true,
                        scrub: true,
                        pinSpacing: true

                    }
                })
                tl2.to('.madar', {
                    x: -100,
                    duration: 10,
                    ease: "power2.inOut",
                })
            });
            mm.add("(max-width: 768px)", () => {
                // MOBILE
                const chips = gsap.timeline({
                    scrollTrigger: {
                        trigger: outroRef.current,
                        start: "top 90%",
                        end: "top top",
                        endTrigger: '.sandis-container',
                        scrub: true,
                        invalidateOnRefresh: true,
                        markers: true,
                    },
                });

                chips.to(zumoObject.position, {
                    y: -0.5,
                    x: 0,
                    duration: 1,
                    ease: "none",
                });
                chips.to(zumoObject.rotation, {
                    y: Math.PI * 2.5,
                    z: Math.PI / 4,
                    duration: 2.3,
                    ease: 'power3.in'
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
            <CanvasScene directionColor={directionColor} onObjectsChange={setObjects} />
            <main ref={mainRef} className="relative z-10">
                <HeroSection stopScroll={stopScroll} />
                <SecondSection />
                <ThirdSection />
                <ScannerSection scannerId="scanner-primary" position="center" scannerRef={scannerRef} />
                <OutroSection outroRef={outroRef} />
                <div className="sandis-container relative w-full h-svh">
                    <ScannerSection scannerId="scanner-secondary" position="right" />

                </div>
                <div className="kos">kos</div>
            </main>
        </>
    );
}
