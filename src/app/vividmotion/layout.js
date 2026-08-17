"use client";
import localFont from "next/font/local";
import ReactLenis from "lenis/react";
import FooterBlob from "@/app/components/vividmotion/footerBlob";
import HoverText from "../components/vividmotion/hoverText";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "../components/vividmotion/layout/navbar";

const samim = localFont({
  src: [
    {
      path: "../../fonts/vividmotion/Samim.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/vividmotion/Samim-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;

    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <div className={samim.className}>
      <ReactLenis
        ref={lenisRef}
        root
        options={{
          duration: 1.2,
          smoothWheel: true,
        }}
      >
        <Navbar />
        {children}
        {/* 
          FIX: 
          - Use min-h-screen instead of h-screen to avoid clipping on mobile.
          - Remove overflow-hidden so content can flow naturally.
          - Use flex with mt-auto to push the bottom text to the end.
        */}
        <div
          dir="rtl"
          className="relative z-10 min-h-screen w-full p-5 sm:p-6 md:p-8 bg-transparent flex flex-col gap-5 text-white"
        >
          {/* BACKGROUND */}
          <FooterBlob />
          <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 pb-10 md:pb-15 items-center">
            <div className="flex flex-col gap-3 md:gap-5 text-white text-right">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl opacity-50">
                پروژه ای در ذهن دارید؟
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                بیا ببینیم آخرش چه می شود
              </h1>
            </div>
            <div className="bg-orange-500 h-fit hover:bg-orange-700 transition-all duration-300 cursor-pointer text-center py-3 px-6 md:py-4 md:px-10 rounded-full">
              <HoverText className="text-lg md:text-2xl" text="شروع پروژه" />
            </div>
          </div>
          {/* مکان  */}
          <section className="text-lg sm:text-xl md:text-2xl">
            <h1 className="py-2">شیراز</h1>
            <a
              href="mailto:m.s.sae1374@gmail.com"
              className="py-2 opacity-45 cursor-pointer hover:opacity-100 transition-opacity duration-300 will-change-opacity break-all"
            >
              m.s.sae1374@gmail.com
            </a>{" "}
          </section>
          <section className="text-lg sm:text-xl md:text-2xl">
            <h1 className="py-2">تهران</h1>
            <a
              href="mailto:m.s.sae1374@gmail.com"
              className="py-2 opacity-45 cursor-pointer hover:opacity-100 transition-opacity duration-300 will-change-opacity break-all"
            >
              m.s.sae1374@gmail.com
            </a>{" "}
          </section>
          <section className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10 md:gap-20 pt-6 md:pt-10 justify-between items-center">
            <div className="flex flex-wrap gap-4 md:gap-5">
              <HoverText
                className="text-xs sm:text-sm md:text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer"
                text="x"
              />
              <HoverText
                className="text-xs sm:text-sm md:text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer"
                text="instagram"
              />
              <HoverText
                className="text-xs sm:text-sm md:text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer"
                text="linkdin"
              />
              <HoverText
                className="text-xs sm:text-sm md:text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer"
                text="behance"
              />
              <HoverText
                className="text-xs sm:text-sm md:text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer"
                text="dribble"
              />
            </div>
            <div className="flex flex-wrap gap-4 md:gap-5">
              <HoverText
                className="text-xs sm:text-sm md:text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer"
                text="careers"
              />
              <HoverText
                className="text-xs sm:text-sm md:text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer"
                text="privacy policy"
              />
              <HoverText
                className="text-xs sm:text-sm md:text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer"
                text="terms of us"
              />
            </div>
            <div className="flex-1 text-left">
              <HoverText
                className="text-lg sm:text-xl will-change-[opacity] uppercase opacity-60 hover:opacity-100 transition-all duration-100 cursor-pointer"
                text="@2026"
              />
            </div>
          </section>

          {/* 
            FIX: 
            - Removed absolute positioning.
            - Added mt-auto to push this to the bottom of the flex container.
            - Added pb-2 for a little extra spacing on mobile.
          */}
          <div className="mt-auto pt-6 pb-2 text-[14vw] sm:text-[12vw] md:text-[10vw] italic leading-none text-center whitespace-nowrap">
            ویوید موشن
          </div>
        </div>
      </ReactLenis>
    </div>
  );
}