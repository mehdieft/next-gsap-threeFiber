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
import KosSection from "./KosSection";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Leva } from "leva";
gsap.registerPlugin(ScrollTrigger);

export default function Selencio() {
  const [directionColor, setdirectionColor] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stopScroll, setScrollStart] = useState(false);
  const mainRef = useRef();
  const outroRef = useRef();
  const [objects, setObjects] = useState({});
  const { basketObject, zumoObject, chocolatiaObject, bolsaObject, canObject } =
    objects;
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
          endTrigger: ".spacer",
          scrub: true,
          markers: false,
          onToggle: () => {
            setScrollStart(true);
          },
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
            endTrigger: ".sandis-container",
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
        chips.to(
          zumoObject.rotation,
          {
            z: Math.PI * 2,
            y: Math.PI * 2,
            duration: 4,
            ease: "none",
          },
          "<0.4",
        );

        const choclate = gsap.timeline({
          scrollTrigger: {
            trigger: ".kos",
            start: "top 99%",
            end: "top top",
            scrub: true,

            markers: true,
          },
        });
        choclate.to(chocolatiaObject.position, {
          y: 0.15,
          duration: 1.2,
          ease: "none",
        });
        choclate.to(
          chocolatiaObject.rotation,
          {
            z: Math.PI * 3.5,
            y: Math.PI * 2,
            duration: 4,
            ease: "none",
          },
          "<0.4",
        );
      });
      mm.add("(max-width: 768px)", () => {
        // MOBILE
        const chips = gsap.timeline({
          scrollTrigger: {
            trigger: outroRef.current,
            start: "top 90%",
            end: "top top",
            endTrigger: ".sandis-container",
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
          ease: "power3.in",
        });
        //we should add a choclate bar came here

        const choclate = gsap.timeline({
          scrollTrigger: {
            trigger: ".kos",
            start: "top 90%",
            end: "top top",
            scrub: true,
            markers: true,
          },
        });
        choclate.to(chocolatiaObject.position, {
          y: 0.5,
          x: 0,
          duration: 1,
          ease: "none",
        });
        choclate.to(chocolatiaObject.rotation, {
          y: Math.PI * 2.5,
          z: Math.PI / 4,
          duration: 8.3,
          ease: "power3.in",
        });
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
      {process.env.NODE_ENV === "development" && <Leva collapsed={true} />}
      <LoadingScreen />
      <CanvasScene
        directionColor={directionColor}
        onObjectsChange={setObjects}
      />
      <main ref={mainRef} className="relative z-10">
        <HeroSection stopScroll={stopScroll} />
        <SecondSection />
        <ThirdSection />
        <div className="spacer"></div>
        <ScannerSection
          scannerId="scanner-primary"
          position="center"
          modelRef={canObject}
        />
        <OutroSection outroRef={outroRef} />
        <div className="sandis-container relative " />
        <ScannerSection
          scannerId="scanner-secondary"
          count={2}
          position="right"
          modelRef={zumoObject}
        />

        <div className="kos bg-red-400 opacity-10">
          <KosSection />
        </div>
        <ScannerSection
          scannerId="scanner-secondary"
          count={3}
          position="left"
          modelRef={chocolatiaObject}
        />
        <section
          dir="rtl"
          className="relative w-full overflow-hidden rounded-2xl bg-black text-[#e9e9e9] lg:min-h-screen"
        >
          {/* ================================================================
          TOP LINE + TITLE
      ================================================================= */}

      

          {/* ================================================================
          MAIN CANVAS
      ================================================================= */}

          <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-x-4 gap-y-5 px-5 pb-12 pt-10 sm:px-8 sm:pt-12 lg:block lg:min-h-[100svh] lg:px-[4vw] lg:py-[5vw]">
            {/* ==============================================================
            SMALL LABELS
        ============================================================== */}

            <div className="col-span-2 flex items-center justify-between px-1 text-[11px] font-medium leading-none lg:absolute lg:left-[13.7%] lg:top-[8.2%] lg:z-20 lg:w-[72.6%] lg:text-[10px]">
              <p className="whitespace-nowrap">مشتریان جسور</p>
              <p className="whitespace-nowrap lg:absolute lg:left-[45.6%]">متفاوت باش</p>
              <p className="whitespace-nowrap line-through lg:absolute lg:right-0">کسل‌کننده</p>
            </div>

            {/* ==============================================================
            MAIN HERO TEXT
        ============================================================== */}

            <div className="col-span-2 py-2 sm:py-4 lg:relative lg:z-10 lg:pt-[4vw]">
              <h1
                className="
              text-center
              font-light
              leading-[0.92]
              tracking-[-0.065em]
              text-[#e9e9e9]
              text-[clamp(52px,13vw,180px)]
            "
              >
                <span className="block">برندهای جسور</span>

                <span className="block">می‌خواهند</span>

                <span className="block">مسیر</span>

                <span className="block">خودشان را پیدا کنند</span>
              </h1>
            </div>

            {/* ==============================================================
            IMAGE 01 — TOP LEFT
        ============================================================== */}

            <div className="relative col-span-1 justify-self-end h-28 w-24 overflow-hidden rounded-[8px] sm:h-36 sm:w-28 lg:absolute lg:left-[17.8%] lg:top-[29.5%] lg:z-20 lg:h-[240px] lg:w-[185px]">
              <Image
                src="/images/selencio/bolsaplastico_mano.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 185px, (min-width: 640px) 112px, 96px"
                className="object-cover"
              />
            </div>

            {/* ==============================================================
            IMAGE 02 — TOP RIGHT
        ============================================================== */}

            <div className="relative col-span-1 mt-7 h-28 w-24 overflow-hidden rounded-[8px] sm:mt-10 sm:h-36 sm:w-28 lg:absolute lg:right-[17.8%] lg:top-[26.8%] lg:z-20 lg:mt-0 lg:h-[245px] lg:w-[185px]">
              <Image
                src="/images/selencio/grupo_encajaregistradora.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 185px, (min-width: 640px) 112px, 96px"
                className="object-cover"
              />
            </div>

            {/* ==============================================================
            DESCRIPTION — RIGHT
        ============================================================== */}

            <div
              dir="rtl"
              className="col-span-2 pt-2 text-right text-[15px] font-normal leading-[1.8] tracking-[-0.02em] sm:text-base lg:absolute lg:right-[19.7%] lg:top-[74.5%] lg:z-20 lg:w-[26%] lg:max-w-[430px] lg:pt-0 lg:text-[11px] lg:leading-[1.35]"
            >
              <p
                className="
              text-[11px]
              font-normal
              leading-[1.35]
              tracking-[-0.02em]
            "
              >
                ما با برندهایی از حوزه‌های مختلف کار می‌کنیم؛ برندهایی متفاوت که
                نقطه‌ی مشترکشان میل به متفاوت بودن از رقباست. آن‌ها می‌خواهند
                شیوه‌ی ارتباط خود را با خلاقیت، اصالت و طراحی متمایز کنند و مسیر
                خودشان را بسازند.
              </p>
            </div>

            {/* ==============================================================
            DESCRIPTION — LEFT
        ============================================================== */}

            <div
              dir="rtl"
              className="col-span-2 text-right text-[15px] font-normal leading-[1.8] tracking-[-0.02em] sm:text-base lg:absolute lg:left-[19.5%] lg:top-[74.5%] lg:z-20 lg:w-[25%] lg:max-w-[430px] lg:text-[11px] lg:leading-[1.35]"
            >
              <p
                className="
              text-[11px]
              font-normal
              leading-[1.35]
              tracking-[-0.02em]
            "
              >
                ما با برندهایی همراه می‌شویم که می‌خواهند خودشان را از دیگران
                متمایز کنند؛ مشتریانی جسور که باور دارند متفاوت بودن یک انتخاب
                است. برای همه‌ی آن‌ها، ما به دنبال ساختن برندهایی صادق،
                منحصربه‌فرد و قابل باور هستیم.
              </p>
            </div>

            {/* ==============================================================
            IMAGE 03 — BOTTOM LEFT
        ============================================================== */}

            <div className="relative col-span-1 mt-2 justify-self-end h-32 w-32 overflow-hidden rounded-[8px] sm:h-40 sm:w-40 lg:absolute lg:left-[11.2%] lg:top-[82.2%] lg:z-10 lg:mt-0 lg:h-[250px] lg:w-[255px]">
              <Image
                src="/images/selencio/lata_escanear.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 255px, (min-width: 640px) 160px, 128px"
                className="object-cover"
              />
            </div>

            {/* ==============================================================
            IMAGE 04 — BOTTOM RIGHT
        ============================================================== */}

            <div className="relative col-span-1 mt-10 h-32 w-32 overflow-hidden rounded-[8px] sm:mt-16 sm:h-40 sm:w-40 lg:absolute lg:right-[19.8%] lg:top-[71.8%] lg:z-10 lg:mt-0 lg:h-[255px] lg:w-[255px]">
              <Image
                src="/images/selencio/latas_estanteriaarriba-2.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 255px, (min-width: 640px) 160px, 128px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
