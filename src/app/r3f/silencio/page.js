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
                    endTrigger: '.spacer',
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
                    y: 0.15,
                    duration: 1.2,
                    ease: "none",
                });
                chips.to(zumoObject.rotation, {
                    z: Math.PI * 2,
                    y: Math.PI * 2,
                    duration: 4,
                    ease: 'none'
                }, '<0.4')

            const choclate=gsap.timeline({scrollTrigger:{
                trigger:'.kos',
                start:'top 99%',
                end: 'top top',
                scrub: true,
                
                markers: true,

            }})
            choclate.to(chocolatiaObject.position, {
                y: 0.15,
                duration: 1.2,
                ease: "none",
            });
            choclate.to(chocolatiaObject.rotation, {
                z: Math.PI *3.5,
                y: Math.PI * 2,
                duration: 4,
                ease: 'none'
            }, '<0.4')

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
                    y: 0.5,
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
                <div className="spacer"></div>
                <ScannerSection scannerId="scanner-primary" position="center" modelRef={canObject} />
                <OutroSection outroRef={outroRef} />
                <div className="sandis-container relative " /
                >
                <ScannerSection scannerId="scanner-secondary" count={2} position="right" modelRef={zumoObject} />


                <div className="h-svh w-svw  kos">kos</div>
                <ScannerSection scannerId="scanner-secondary" count={3} position="left" modelRef={chocolatiaObject} />

            </main>
        </>
    );
}
