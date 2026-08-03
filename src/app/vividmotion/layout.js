"use client";
import ReactLenis from "lenis/react";
import localFont from "next/font/local";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const samim = localFont({
  src: [
    {
      path: "../../fonts/vividmotion/Samim.woff",
      weight: "300",
      style: "normal",
    },

    {
      path: "../../fonts/vividmotion/Samim-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});



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
      <ReactLenis ref={lenisRef}
        root
        options={{
          duration: 1.2,
          smoothWheel: true,
        }}>
        {children}
      </ReactLenis>
    </div>
  );
}

