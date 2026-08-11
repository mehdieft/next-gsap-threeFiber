"use client";

import gsap from "gsap";
import { useRef } from "react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrambleTextPlugin);

export default function HoverText({ children, text, className = "", duration = 0.7 }) {
  const textRef = useRef(null);
  const originalText = String(text ?? children ?? "");

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;

      // Keep a stable width so parent layout does not jump during scramble.
      const measuredWidth = el.getBoundingClientRect().width;
      el.style.width = `${measuredWidth}px`;
      el.textContent = originalText;
    },
    { scope: textRef, dependencies: [originalText] },
  );

  const handleEnter = () => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      duration,
      ease: "none",
      scrambleText: {
        text: originalText,
        tweenLength:false,
        rightToLeft:true,
        chars: "نلتبشسیلهعغ غبیشسلیبسشیلا",
        speed: 0.85,
        revealDelay: 0.05,
      },
    });
  };

  return (
    <span
      ref={textRef}
      onMouseEnter={handleEnter}
      onPointerEnter={handleEnter}
      className={`inline-block whitespace-nowrap ${className}`}
    >
      {originalText}
    </span>
  );
}