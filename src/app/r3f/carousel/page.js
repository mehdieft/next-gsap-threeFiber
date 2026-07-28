"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import ImageSlider from "@/app/components/3D/carousel/imageSlider";
import gsap from "gsap";
import Image from "next/image";
import Slider from "./slider";

export default function Home() {
  const container = useRef();
  const logo = useRef();
  const menu = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(logo.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
      }).from(
        menu.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    },
    { scope: container }
  );

  return (
    <main ref={container} className="bg-black">
      <section className="w-full h-screen relative">
        <Image
          ref={logo}
          alt="kir"
          width={25}
          height={25}
          src="/images/logo.png"
          className="absolute top-4 left-4 w-20 h-10 z-10 brightness-0 invert object-contain"
        />

        <div ref={menu} className="absolute top-6 right-6 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      
      <Slider/>

        <Canvas style={{width:'100%',height:'100%',position:'absolute'}} className="top-0 left-0" camera={{ position: [0, 0, 5], fov: 30 }}>
          <color attach="background" args={["#201d24"]} />
         <ImageSlider/>
        </Canvas>
      </section>

      <section className="h-screen grid place-content-center">
        <p className="text-white">Work in progress...</p>
      </section>
    </main>
  );
}