"use client";

import { useRef } from "react";
import gsap from "gsap";
import React from "react";
import HoveredText from "./hoveredText";


export default function GridText() {
  const containerRef = useRef(null);
  const trailRef = useRef(null);

  const lastPoint = useRef({ x: 0, y: 0 });
  const currentImage = useRef(0);

  const images = [
    "/images/vividmotion/grid/gridOne.avif",
    "/images/vividmotion/grid/gridTwo.avif",
    "/images/vividmotion/grid/gridThree.avif",
    "/images/vividmotion/grid/gridFour.avif",
    "/images/vividmotion/grid/gridFive.avif",
    "/images/vividmotion/grid/gridSix.avif",
    "/images/vividmotion/grid/gridSeven.avif",
    "/images/vividmotion/grid/gridEight.avif",
    "/images/vividmotion/grid/gridNine.avif",
    "/images/vividmotion/grid/gridTen.avif",
  ];

  const items = [
    {
      title: "توسعه فرانت‌اند",
      subtitles: [
        "ری‌اکت (React)",
        "نکست‌جی‌اس (Next.js)",
        "تیلویند CSS",
        "طراحی واکنش‌گرا",
      ],
    },
    {
      title: "انیمیشن",
      subtitles: [
        "GSAP",
        "اسکرول تریگر",
        "SplitText",
        "Timeline",
        "Page Transition",
      ],
    },
    {
      title: "گرافیک و سه‌بعدی",
      subtitles: [
        "Three.js",
        "React Three Fiber",
        "GLSL",
        "Shaders",
        "WebGL",
      ],
    },
  ];

  function spawnImage(x, y) {
    const img = document.createElement("img");

    img.src = images[currentImage.current];
    currentImage.current =
      (currentImage.current + 1) % images.length;

    img.className =
      "pointer-events-none absolute w-30 rounded-xl";

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = "translate(-50%,-50%) scale(.5)";

    trailRef.current.appendChild(img);

    gsap.fromTo(
      img,
      {
        scale: 0.5,
        opacity: 0,
        
      },
      {
        scale: 1,
        opacity: 1,
        transformOrigin:'center center',
        duration: 0.85,
        ease: "power2.out",
      }
    );

    gsap.to(img, {
      opacity: 0,
      scale: 1.3,
      duration: 0.8,
      transformOrigin:'center center',
      delay: 1.8,
      ease: "power2.out",
      onComplete: () => img.remove(),
    });
  }

  function handleMove(e) {
    const rect = containerRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastPoint.current.x;
    const dy = y - lastPoint.current.y;

    const distance = Math.hypot(dx, dy);

    if (distance < 120) return;

    spawnImage(x, y);

    lastPoint.current = { x, y };
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      className="relative overflow-hidden"
    >
      <div
        ref={trailRef}
        className="pointer-events-none absolute inset-0 z-30"
      />

      <div className="grid grid-cols-1 gap-px bg-gray-500 relative z-10">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex px-4 py-6 bg-black text-white items-center">
              <h1 className="w-1/3 text-6xl opacity-80">
                0{index + 1}
              </h1>

              <h1 className="text-8xl">
                {item.title}
              </h1>
            </div>

            {item.subtitles.map((subtitle) => (
              <HoveredText
                key={subtitle}
                text={subtitle}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}