"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import ShaderImage from "./ShaderImage";

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
      shaderImage:'/images/vividmotion/shaders/shaderImage.avif',
      bg: "#111111",
    },
    {
      title: "Creative Development",
      desc: "Modern web experiences.",
      image: "/images/vividmotion/imageTwo.png",
      shaderImage:'/images/vividmotion/shaders/shaderImageTwo.avif',
      bg: "#1f2937",
    },
    {
      title: "Motion Design",
      desc: "Every interaction tells a story.",
      image: "/images/vividmotion/imageThree.png",
       shaderImage:'/images/vividmotion/shaders/shaderImageThree.avif',
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
      markers: false,
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
    <section ref={containerRef} className="flex w-full px-4 bg-black overflow-x-clip">
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
            <div className="absolute bottom-5 left-5 panel-image">
              <Image
                width={96}
                height={96}
                alt={item.title}
                src={item.image}
                className="w-15 rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div ref={rightRef} className="w-1/2 overflow-x-clip">
        {data.map((item, index) => (
          <section
            key={index}
            className="right-panel  relative h-screen flex items-center justify-center text-6xl font-bold border-b overflow-hidden"
          >
            <ShaderImage
              src={item.shaderImage}
              className="absolute inset-0 w-full h-full"
            />
            {/* <div className="relative z-10 px-6 py-4 rounded-xl bg-black/30 text-white backdrop-blur-sm">
              Section {index + 1}
            </div> */}
          </section>
        ))}
      </div>
    </section>
  );
}
