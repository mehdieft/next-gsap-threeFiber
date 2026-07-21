"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function PinSection() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);

  const rightRef = useRef(null);

  const data = [
    {
      title: "Featured Work",
      desc: "A collection of immersive experiences.",
      image: "/images/vividmotion/imageOne.png",
      bg: "#111111",
    },
    {
      title: "Creative Development",
      desc: "Modern web experiences.",
      image: "/images/vividmotion/imageTwo.png",
      bg: "#1f2937",
    },
    {
      title: "Motion Design",
      desc: "Every interaction tells a story.",
      image: "/images/vividmotion/imageThree.png",
      bg: "#f5f5f5",
    },
  ];
  useGSAP(() => {
    const leftPanels = gsap.utils.toArray(".left-panel");

    const rightPanels = gsap.utils.toArray(".right-panel");
    const splits = leftPanels.map((panel) =>
      SplitText.create(panel.querySelector(".panel-title"), {
        type: "chars",
      }),
    );
    console.log("this is splits", splits);

    // initial state
    gsap.set(leftPanels, {
      autoAlpha: 0,
      y: 0,
    });

    gsap.set(leftPanels[0], {
      autoAlpha: 1,
      y: 0,
    });

    // pin the left side
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      endTrigger: rightRef.current,
      end: "bottom bottom",
      pin: leftRef.current,
      markers: true,
    });

    // function to switch content
   const showPanel = (index, direction = 1) => {
  const panel = leftPanels[index];

  const desc = panel.querySelector(".panel-desc");
  const image = panel.querySelector(".panel-image");

  // Hide every panel
  gsap.set(leftPanels, {
    autoAlpha: 0,
    pointerEvents: "none",
  });

  gsap.set(panel, {
    autoAlpha: 1,
    pointerEvents: "auto",
  });

  // Stop previous tweens
  gsap.killTweensOf(splits[index].chars);
  gsap.killTweensOf(desc);
  gsap.killTweensOf(image);

  // Reset states
  gsap.set(splits[index].chars, {
    opacity: 0,
    yPercent: direction > 0 ? 120 : -120,
    rotate: direction > 0 ? 8 : -8,
  });

  gsap.set(desc, {
    opacity: 0,
    y: direction > 0 ? 40 : -40,
  });

  gsap.set(image, {
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    rotate: direction > 0 ? 10 : -10,
    scale: 0.7,
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
    },
  });

  tl.to(splits[index].chars, {
    opacity: 1,
    yPercent: 0,
    rotate: 0,
    duration: 0.8,
    stagger: 0.03,
  })
    .to(
      desc,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.45"
    )
    .to(
      image,
      {
        opacity: 1,
        x: 0,
        rotate: 0,
        scale: 1,
        duration: 0.8,
      },
      "-=0.35"
    );
};

    rightPanels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        scrub: true,

        onEnter: () => showPanel(index, 1),
        onEnterBack: () => showPanel(index, -1),
      });
    });
  });

  return (
    <section ref={containerRef} className="flex">
      {/* LEFT */}
      <div
        ref={leftRef}
        className="relative w-1/2 h-screen overflow-hidden bg-black text-white"
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="left-panel absolute inset-0 flex items-center justify-center gap-10 p-20 will-change-transform will-change-opacity"
          >
            <div className="">
              <h2 className=" panel-title text-4xl font-bold mb-6">
                {item.title}
              </h2>

              <p className="text-xl panel-desc text-zinc-300">{item.desc}</p>
            </div>
            <div className="absolute bottom-5 left-5 panel-imgae">
              <Image
                width={20}
                height={20}
                alt={item.title}
                src={item.image}
                className="w-20 bottom-9  rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div ref={rightRef} className="w-1/2">
        {data.map((item, index) => (
          <section
            key={index}
            className="right-panel h-screen flex items-center justify-center text-6xl font-bold border-b"
          >
            Section {index + 1}
          </section>
        ))}
      </div>
    </section>
  );
}
