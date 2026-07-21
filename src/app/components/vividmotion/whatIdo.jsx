"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

export default function WhatIdo() {
  const container = useRef();
  const content = useRef();

  useGSAP(() => {
    if(!container.current)return
    const split = new SplitText(content.current, {
      type: "words",
      wordsClass: "split-word",
      reduceWhiteSpace: false,
    });

    gsap.set(split.words, {
      opacity: 0,
      y: 18,
      skewX:40,
     
      filter: "blur(12px)",
      willChange: "transform, filter, opacity",
    });

    gsap.to(split.words, {
      opacity: 1,
      y: 0,
      skewX:0,
      
      filter: "blur(0px)",
      ease: "power3.out",
      duration: 1.1,
      stagger: 0.055,
      scrollTrigger: {
        trigger: container.current,
        start: "top 48%",
        end:"top 90%",
       markers:true,
      },
    });

    return () => {
      split.revert();
    };

  }, { scope: container });

  return (
    <section
      ref={container}
      className="px-4 py-42 flex justify-between text-left bg-black text-white"
      dir="auto"
    >
      <h1 ref={content} className="text-5xl w-2/3 leading-[1.35] text-right">
        متخصص در ساخت وب‌سایت‌های مدرن با انیمیشن‌های حرفه‌ای، جلوه‌های سه‌بعدی
        و رابط‌های کاربری خلاقانه با استفاده از GSAP، Three.js و React.
      </h1>
      <h1  className="animated text-3xl px-8 font-bold">کاری که میکنم</h1>
    </section>
  );
}
