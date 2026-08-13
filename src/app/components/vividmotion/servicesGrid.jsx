"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import ShaderImage from "./ShaderImage";
import { useRef } from "react";
import Link from "next/link";

export default function ServicesGrid({
  imageOne = "/images/vividmotion/gridShader/shaderOne.avif",
  imageTwo = "/images/vividmotion/gridShader/shaderTwo.avif",
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          markers: true,
        },
      });
      tl.to(".overly", {
        height: "0px",
        stagger: 0.3,
        transformOrigin: "bottom bottom",
        duration: 0.8,
        ease: "power3.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row w-screen bg-black p-4 gap-4"
    >
      {/* First card */}
      <Link href="#" className="w-full md:w-1/2 p-1 relative group overflow-hidden rounded-2xl">
        {/* Black overlay that reveals on hover */}
        <div className="absolute inset-0 bg-black z-20 h-full rounded-2xl overly"></div>
        
        {/* Image that slides up on hover */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="transition-transform duration-700 ease-out group-hover:-translate-y-8">
            <ShaderImage 
              src={imageOne} 
              className="w-full h-[70vh] rounded-2xl" 
            />
          </div>
        </div>
        
        {/* Text that appears at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-10 py-6 bg-black opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out translate-y-4 group-hover:translate-y-0 flex justify-between text-white z-30">
          <p>Service Title</p>
          <p>→</p>
        </div>
      </Link>

      {/* Second card */}
      <Link href="#" className="w-full md:w-1/2 p-1 relative group overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-black z-20 h-full rounded-2xl overly"></div>
        
        <div className="relative overflow-hidden rounded-2xl">
          <div className="transition-transform duration-700 ease-out group-hover:-translate-y-8">
            <ShaderImage 
              src={imageTwo} 
              className="w-full h-[70vh] rounded-2xl" 
            />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 px-10 py-6 bg-black opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out translate-y-4 group-hover:translate-y-0 flex justify-between text-white z-30">
          <p>Service Title</p>
          <p>→</p>
        </div>
      </Link>
    </div>
  );
}