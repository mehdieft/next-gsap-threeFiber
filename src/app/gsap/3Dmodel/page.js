"use client"
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import Experience from "./Experience";
gsap.registerPlugin( ScrollTrigger, SplitText);

export default function ThreeDmodel() {
  const containerRef = useRef()
  useGSAP(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  });
  useGSAP(() => {
    if (!containerRef.current) return;
    const header1Splites = new SplitText(".header-1 h1", { type: "chars", charsClass: "char" });
    const titleSplites = new SplitText(".tooltip .title h1", { type: "lines", linesClass: "line" });
    const description = new SplitText(".tooltip .description p", { type: "lines", linesClass: "line" });


   const data= [...description.lines, ...titleSplites.lines].forEach((line) => {
      line.innerHTML = `<span>${line.innerHTML}</span>`;

    })
    console.log('data',data)
      ScrollTrigger.create({
        trigger: ".product-overwiew",
        start: "75% bottom",
        onEnter: () => {
          gsap.to('.header-1 h1 .char >span', {
            y: "0%", duration: 1, stagger: 0.025, ease: "power3.out"
          })
        },
        onLeaveBack: () => {
          gsap.to('.header-1 h1 .char >span', {
            y: "100%", duration: 1, stagger: 0.025, ease: "power3.out"
          })
        }

      })
    const animationOptions = { duration: 1, ease: 'power3.out', stagger: 0.025 }
    const tooltipSelector = [
      {
        trigger: 0.065,
        element: [".tooltip:nth-child(1) .icon",
          ".tooltip:nth-child(1) .title .line > span",
          ".tooltip:nth-child(1) .description .line > span"]
      },
      {
        trigger: 0.85,
        elements: [".tooltip:nth-child(2) .icon",
          ".tooltip:nth-child(2) .title .line > span",
          ".tooltip:nth-child(2) .description .line > span"]
      }
    ]
    ScrollTrigger.create({
      trigger: ".product-overwiew",
      start: 'top top',
      end: `+=${window.innerHeight * 10}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const headerProgress = Math.max(0, Math.min(1, (progress - 0.05) / 0.3));
        gsap.to('.header-1', {
          xPercent: progress < 0.05 ? 0 : progress > 0.35 ? -100 : -100 * headerProgress,
        })
        const maskSize = progress < 0.02 ? 0 : progress > 0.3 ? 100 : 100 * ((progress - 0.2) / 0.1);
        gsap.to('.circular-mask', {
          clipPath: `circle(${maskSize}% at 50% 50%)`,
          duration: 0.1,
        })
        const header2progress = (progress - 0.15) / 0.35;
        const header2Percent = progress < 0.15 ? 100 : progress > 0.5 ? -200 : 100 - 300 * header2progress;
        gsap.to('.header-2', {
          xPercent: header2Percent,

        })
        const scaleX = progress < 0.45 ? 0 : progress > 0.65 ? 100 : 100 * ((progress - 0.45) / 0.2);
        gsap.set('.tooltip', {
          scaleX: `${scaleX}%`, duration: 1, ease: 'power3.out', stagger: 0.025

        })
        tooltipSelector.forEach(({ trigger, element }) => {
          gsap.to(element, {
            y: progress < trigger ? '100%' : progress > trigger + 0.2 ? '0%' : `${100 - 500 * (progress - trigger)}%`,
            duration: 1, stagger: 0.025, ease: 'power3.out'
          })
        })
      }
    })
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef}>

        <section ref={containerRef} className="intro flex justify-center items-center relative w-[100vw] overflow-hidden bg-amber-50 text-black h-svh ">
          <h1>I WILL AND I CAN</h1>
        </section>
        <section className="relative w-[100vw] h-svh bg-amber-50 text-black product-overwiew">
          <div className="header-1 w-[200vw]  flex items-center justify-center h-svh translate-x-0">
            <h1 className="bg-yellow-400">every thing is a bitch</h1>
          </div>
          <div className="header-2 z-2 flex items-center fixed top-0 text-5xl bg-purple-500 left-0 w-[150vw] h-svh translate-x-full">
            <h1 className="text-[25vw]">my eyes betray me</h1>
          </div>
          <div className="circular-mask absolute top-0 left-0 w-full h-full bg-black  " style={{ clipPath: 'circle(2% at 50% 50%)' }}></div>
          <div className="tooltips absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] w-3/4 h-3/4 flex gap-[1rem] ">
            <div className="tooltip scale-x-0 flex flex-col gap-4 bg-purple-400">
              <div className="icons"></div>
              <div className=" divider relative w-full h-px bg-red-900 m-[0.5rem 0] scale-x-0 origin-[100%_50%]"></div>
              <div className="title">
                <h1>build to last</h1>
              </div>
              <div className="description">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Corrupti ea, iusto omnis fugit recusandae quasi assumenda,
                  doloribus architecto magni cupiditate deserunt aspernatur ipsam
                  voluptate error itaque? Illum dolore fuga aut.
                </p>
              </div>
            </div>
            <div className="tooltip scale-x-0 flex flex-col w-full justify-end items-end bg-green-400 ">
              <div className="icons"></div>
              <div className="divider relative w-full h-[10px] bg-green-800 m-[0.5rem 0] scale-x-1 origin-[100%_50%] "></div>
              <div className="title">
                <h1>build to last</h1>
              </div>
              <div className="description">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Corrupti ea, iusto omnis fugit recusandae quasi assumenda,
                  doloribus architecto magni cupiditate deserunt aspernatur ipsam
                  voluptate error itaque? Illum dolore fuga aut.
                </p>
              </div>
            </div>

          </div>
          <Canvas
            camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 0, 5] }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              transform: "translate(-50%,-50%)",
              zIndex: 100,
            }}
          >
            <Experience />
          </Canvas>
        </section>
        <section className="outro relative flex justify-center items-center bg-amber-50 text-black w-[100vw] h-svh">
          <h1>I JUST CANT DISAPOINTED</h1>
        </section>
        <footer className="w-[100vw] bg-black text-amber-50 border-t border-amber-200/20">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-amber-200/70">Vivid Motion Lab</p>
              <h2 className="text-2xl md:text-3xl font-semibold">Built for immersive scroll stories</h2>
            </div>
            <div className="text-sm text-amber-100/80 text-left md:text-right">
              <p>apple_iphone_15_pro_max_black scene</p>
              <p>GSAP ScrollTrigger + R3F Experience</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
