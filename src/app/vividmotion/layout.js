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
        <div
          dir="rtl"
          className="relative z-10 h-screen w-screen p-8 bg-transparent flex flex-col gap-5  overflow-hidden text-white"
        >
          {/* BACKGROUND */}
          <FooterBlob />
          <div className="flex justify-between pb-15 items-center ">
            <div className="flex flex-col gap-5 text-white text-right ">
              <h1 className="text-6xl opacity-50">پروژه ای در ذهن دارید؟</h1>
              <h1 className="text-6xl">بیا ببینیم آخرش چه می شود</h1>
            </div>
            <div className="bg-orange-500 h-fit hover:bg-orange-700 transition-all duration-300 cursor-pointer text-center py-4 px-10 rounded-full">
              <HoverText className="text-2xl" text="شروع پروژه" />
            </div>
          </div>
          {/* مکان  */}
          <section className="text-2xl">
            <h1 className="py-2">شیراز</h1>
            <a
              href="mailto:m.s.sae1374@gmail.com"
              className="py-2 opacity-45 cursor-pointer hover:opacity-100 transition-opacity duration-300 will-change-opacity"
            >
              m.s.sae1374@gmail.com
            </a>{" "}
          </section>
          <section className="text-2xl">
            <h1 className="py-2">تهران</h1>
            <a
              href="mailto:m.s.sae1374@gmail.com"
              className="py-2 opacity-45 cursor-pointer hover:opacity-100 transition-opacity duration-300 will-change-opacity"
            >
              m.s.sae1374@gmail.com
            </a>{" "}
          </section>
          <section className="flex gap-20 pt-10  justify-between">
            <div className="flex gap-5">
              <HoverText className="text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer" text="x" />
              <HoverText className="text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer" text="instagram" />
              <HoverText className="text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer" text="linkdin" />
              <HoverText className="text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer" text="behance" />
              <HoverText className="text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer" text="dribble" />
            </div>
            <div className="flex gap-5">
              <HoverText className="text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer" text="careers" />
              <HoverText className="text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer" text="privacy policy" />
              <HoverText className="text-md will-change-[opacity] uppercase opacity-30 hover:opacity-100 transition-all duration-100 cursor-pointer" text="terms of us" />

            </div>
            <div className="flex-1 text-left">
              <HoverText className="text-xl will-change-[opacity] uppercase opacity-60 hover:opacity-100 transition-all duration-100 cursor-pointer" text="@2026" />

            </div>

          </section>

          <div className="absolute bottom-10 inset-x-0  text-white text-[10vw] italic leading-none text-center whitespace-nowrap">
            ویوید موشن
          </div>
        </div>
      </ReactLenis>
    </div>
  );
}
