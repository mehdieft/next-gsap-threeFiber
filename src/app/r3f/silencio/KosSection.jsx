/* eslint-disable react-hooks/static-components */
"use client";

import Image from "next/image";
import { FiAperture } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function KosSection() {
  const container = useRef(null);
  const trackRef = useRef(null);
  const groupRef = useRef(null);

  useGSAP(
    () => {
      if (!trackRef.current || !groupRef.current) return;

      const track = trackRef.current;
      const group = groupRef.current;

      const getGroupWidth = () => group.getBoundingClientRect().width;

      const animation = gsap.to(track, {
        x: () => -getGroupWidth(),
        duration: 8,
        ease: "none",
        repeat: -1,
      });

      const resizeObserver = new ResizeObserver(() => {
        animation.invalidate();
      });

      resizeObserver.observe(group);

      return () => {
        resizeObserver.disconnect();
        animation.kill();
      };
    },
    { scope: container }
  );

  const MarqueeContent = () => (
    <h2
      className="
        flex
        shrink-0
        items-center
        whitespace-nowrap
        text-[clamp(4rem,11vw,11rem)]
        font-light
        leading-none
        tracking-[-0.045em]
      "
    >
      <span>ضروری</span>

      <span
        className="
          relative
          mx-[0.12em]
          inline-block
          aspect-[1.5]
          w-[clamp(5rem,13vw,13rem)]
          shrink-0
          translate-y-[0.06em]
          overflow-hidden
          rounded-[0.18em]
          align-middle
          shadow-[0_12px_40px_rgba(0,0,0,.12)]
        "
      >
        <Image
          src="/images/selencio/coca.jpg"
          alt="کیسه خرید روی نیمکت"
          fill
          priority
          sizes="(max-width: 768px) 30vw, 15vw"
          className="
            object-cover
            grayscale-[15%]
            transition-transform
            duration-700
            ease-out
            hover:scale-105
          "
        />

        <span
          aria-hidden="true"
          className="absolute inset-0 bg-black/5"
        />
      </span>

      <span>است</span>
    </h2>
  );

  return (
    <section
      ref={container}
      id="kos"
      dir="rtl"
      aria-labelledby="kos-title"
      className="
        relative
        isolate
        min-h-svh
        overflow-hidden
        px-[clamp(1.25rem,4vw,5rem)]
        py-[clamp(1.25rem,3vw,2.5rem)]
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[72svh]
          max-w-[1400px]
          flex-col
          justify-between
        "
      >
        <div>
          {/* Label */}
          <div
            className="
              mt-[clamp(4rem,10vw,8rem)]
              flex
              items-center
              gap-3
              text-sm
              text-black/55
              sm:text-base
            "
          >
            <FiAperture
              className="size-5 shrink-0"
              aria-hidden="true"
            />

            <span>پروژه‌های واقعاً متفاوت</span>
          </div>

          {/* MARQUEE */}
          <div
            className="
              mt-4
              h-[clamp(5rem,12vw,12rem)]
              w-full
              overflow-hidden
            "
            dir="ltr"
          >
            <div
              ref={trackRef}
              className="
                flex
                w-max
                shrink-0
              "
            >
              {/* FIRST GROUP */}
              <div
                ref={groupRef}
                className="shrink-0"
                dir="rtl"
              >
                <MarqueeContent />
              </div>

              {/* EXACT DUPLICATE */}
              <div
                className="shrink-0"
                dir="rtl"
              >
                <MarqueeContent />
              </div>
            </div>
          </div>

          {/* Supporting copy */}
          <div
            className="
              mt-[clamp(2rem,5vw,4rem)]
              max-w-[650px]
              text-base
              leading-8
              text-black/60
              sm:text-lg
            "
          >
            <p>
              بعضی پروژه‌ها فقط برای دیده شدن ساخته نمی‌شوند؛
              قرار است چیزی را در ذهن مخاطب تغییر دهند.
            </p>
          </div>
        </div>

        {/* Bottom statement */}
        <div
          className="
            mt-16
            flex
            items-end
            justify-between
            gap-8
            border-t
            border-black/10
            pt-5
          "
        >
          <p className="max-w-[500px] text-sm leading-7 text-black/50 sm:text-base">
            ما به دنبال ساختن تجربه‌هایی هستیم که معمولی نباشند.
          </p>

          <span className="text-xs text-black/40">
            02 / 04
          </span>
        </div>
      </div>

      {/* Decorative index */}
      <div
        aria-hidden="true"
        className="
          absolute
          bottom-5
          left-5
          text-[10px]
          tracking-[0.2em]
          text-black/30
        "
      >
      </div>
    </section>
  );
}