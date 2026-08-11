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
      ease: "power3.in",
      scrambleText: {
        text: originalText,
        chars: "ی ی ا ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی",
        speed: 0.35,
      },
    });
  };

  return (
    <span
      ref={textRef}
      onMouseEnter={handleEnter}
      className={`inline-block whitespace-nowrap ${className}`}
    >
      {originalText}
    </span>
  );
}