"use client";

import { useRef } from "react";
import gsap from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";


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
  useGSAP(()=>{

  },{scope:containerRef})

  function spawnImage(x, y, angle, speed) {
  const img = document.createElement("img");

  img.src = images[currentImage.current];
  currentImage.current =
    (currentImage.current + 1) % images.length;

  img.className =
    "pointer-events-none absolute w-30 rounded-xl select-none";

  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
  img.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(.4)`;

  trailRef.current.appendChild(img);

  const randomRotation = gsap.utils.random(-12, 12);
  const finalScale = gsap.utils.clamp(
    0.85,
    1.3,
    0.8 + speed * 0.004
  );

  const tl = gsap.timeline({
    onComplete: () => img.remove(),
  });

  tl.fromTo(
    img,
    {
      opacity: 0,
      scale: 0.4,
      rotation: angle + randomRotation,
      y: 15,
    },
    {
      opacity: 1,
      scale: finalScale,
      rotation: angle,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    }
  ).to(img, {
    opacity: 0,
    scale: finalScale * 1.15,
    duration: 0.9,
    ease: "power2.inOut",
    delay: 0.45,
  });
}

function handleMove(e) {
  const rect = containerRef.current.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const dx = x - lastPoint.current.x;
  const dy = y - lastPoint.current.y;

  const distance = Math.hypot(dx, dy);

  // First movement
  if (
    lastPoint.current.x === 0 &&
    lastPoint.current.y === 0
  ) {
    lastPoint.current = { x, y };
    return;
  }

  // Spawn every 35px
  const step = 235;

  if (distance >= step) {
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const speed = distance;

    for (let d = step; d <= distance; d += step) {
      const t = d / distance;

      const ix = lastPoint.current.x + dx * t;
      const iy = lastPoint.current.y + dy * t;

      spawnImage(ix, iy, angle, speed);
    }

    lastPoint.current = { x, y };
  }
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
            <div className="flex px-4 py-6 bg-black text-white items-center grid-parent">
              <h1 className="w-1/3 text-6xl opacity-80">
                0{index + 1}
              </h1>

              <h1 className="text-2xl md:text-6xl absolute left-1/2 -translate-x-1/2  ">
                {item.title}
              </h1>
            </div>

            {item.subtitles.map((subtitle) => (
              <div
                key={subtitle}
                className="flex h-16 items-center border-b border-zinc-800 bg-black px-4 text-white"
              >
                <h1 className="uppercase text-center w-full">{subtitle}</h1>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}