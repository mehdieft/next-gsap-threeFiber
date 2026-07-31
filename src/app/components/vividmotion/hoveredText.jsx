"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HoveredText({ text }) {
  const rowRef = useRef(null);
  const overlayRef = useRef(null);
  const marqueeRef = useRef(null);

  const tl = useRef();
  const marqueeTween = useRef();

  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true });

      tl.current.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.15,
        ease: "power3.out",
      });

      marqueeTween.current = gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 18,
        ease: "none",
        repeat: -1,
        paused: true,
      });

      return () => {
        tl.current?.kill();
        marqueeTween.current?.kill();
      };
    },
    { scope: rowRef },
  );

  const handleEnter = () => {
    tl.current.play();
    marqueeTween.current.play();
  };

  const handleLeave = () => {
    tl.current.reverse();
    marqueeTween.current.pause();
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative h-16 overflow-hidden bg-black border-b border-zinc-800 cursor-pointer"
    >
      {/* Normal Row */}
      <div className="absolute inset-0 flex items-center px-4 text-white">
        <h1 className="pl-[33vw] uppercase">{text}</h1>
      </div>

      {/* Hover Layer */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex items-center overflow-hidden bg-white text-black opacity-0 invisible pointer-events-none will-change-opacity"
      >
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-5xl font-bold uppercase"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="mx-10 flex-shrink-0">
              &{text}&
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
