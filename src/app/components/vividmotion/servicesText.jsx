"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText.js";
import { useRef } from "react";
gsap.registerPlugin(SplitText);

export const ServicesText = () => {
    const container=useRef();
    useGSAP(()=>{
        if(!container.current)
            return
        const splitText=SplitText.create('#text',{type:"words"})
        gsap.from(splitText.words,{opacity:0,
            filter:"blur(30px)",
            duration:1,
            delay:1.2,
            stagger:0.25,
            ease:"power2.out",
        })
    },{scope:container})
  return (
    <>
      <div ref={container} className="">
        <h1 dir="rtl" id="text" className="text-center leading-tight tracking-wide text-white text-3xl md:text-7xl  max-w-screen md:max-w-[50vw]">نتیجه از تلاش های مستمر حاصل می شود</h1>
      </div>
    </>
  );
};
