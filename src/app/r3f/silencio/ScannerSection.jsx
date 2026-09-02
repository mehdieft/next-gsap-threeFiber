"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import useSelencio from "../../store/useSelencio";

gsap.registerPlugin(ScrollTrigger);

export default function ScannerSection({
  modelRef,
  scannerId,
  position,
  count = 1,
}) {
  const { turnOnTheLight, turnOffTheLight } = useSelencio();

  // ---------------------------------------------------------------------------
  // Refs
  // ---------------------------------------------------------------------------

  const containerRef = useRef(null);
  const scannerRef = useRef(null);
  const endRef = useRef(null);

  const infoRef = useRef(null);
  const numberOneRef = useRef(null);
  const numberTwoRef = useRef(null);

  const purchasedRef = useRef(null);
  const purchasedTextRef = useRef(null);

  // ---------------------------------------------------------------------------
  // Sound
  // ---------------------------------------------------------------------------

  const soundRef = useRef(null);
  const hasPlayedPurchaseSoundRef = useRef(false);

  const playPurchaseSound = () => {
    // Already played → do nothing
    if (hasPlayedPurchaseSoundRef.current) return;

    hasPlayedPurchaseSoundRef.current = true;

    const audio = new Audio("/sound/checkout.mp3");

    audio.volume = 1;
    soundRef.current = audio;

    audio.play().catch(() => {
      // Browser blocked playback.
      // We intentionally don't retry, so it can never play twice.
    });
  };

  // ---------------------------------------------------------------------------
  // Purchase badge animation ("خریده شد")
  //
  // This runs OUTSIDE the scrubbed timeline on purpose. It's triggered by a
  // tl.call() (which can fire on scroll forward AND backward, like the sound
  // call), but guarded so it only ever plays once and is never reversed.
  // ---------------------------------------------------------------------------

  const hasPlayedPurchaseAnimRef = useRef(false);

  // ---------------------------------------------------------------------------
  // Position
  // ---------------------------------------------------------------------------

  const positionClass =
    {
      left: "left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0",
      center: "left-1/2 -translate-x-1/2",
      right:
        "left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0",
    }[position] ?? "left-1/2 -translate-x-1/2";

  // ---------------------------------------------------------------------------
  // GSAP
  // ---------------------------------------------------------------------------

  useGSAP(
    () => {
      if (!containerRef.current || !scannerRef.current) return;

      const select = gsap.utils.selector(containerRef);

      // -----------------------------------------------------------------------
      // Measure purchase badge
      // -----------------------------------------------------------------------

      const purchasedElement = purchasedRef.current;

      if (!purchasedElement) return;

      const purchasedWidth =
        purchasedElement.getBoundingClientRect().width;

      const purchasedHeight =
        purchasedElement.getBoundingClientRect().height;

      // -----------------------------------------------------------------------
      // Initial purchase badge state
      // -----------------------------------------------------------------------

      gsap.set(purchasedElement, {
        width: purchasedHeight,
        paddingLeft: 0,
        paddingRight: 0,
        borderColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: "9999px",
        overflow: "hidden",
      });

      gsap.set(purchasedTextRef.current, {
        autoAlpha: 0,
      });

      // -----------------------------------------------------------------------
      // Initial scanner info state
      // -----------------------------------------------------------------------

      gsap.set(infoRef.current, {
        transformOrigin: "center center",
      });

      // -----------------------------------------------------------------------
      // Initial number swap state
      //
      // Both numbers occupy the exact same box (absolute inset-0 w-full) and
      // are positioned purely with xPercent, so entry/exit always measure
      // against the same width. #02 starts one full width to the left.
      // -----------------------------------------------------------------------

      gsap.set(numberOneRef.current, {
        xPercent: 0,
      });

      gsap.set(numberTwoRef.current, {
        xPercent: -100,
      });

      // -----------------------------------------------------------------------
      // Purchase animation (badge circle → pill, text fade in)
      //
      // Independent, non-scrubbed tween. Runs once, never reverses.
      // -----------------------------------------------------------------------

      const playPurchaseAnimation = () => {
        if (hasPlayedPurchaseAnimRef.current) return;
        hasPlayedPurchaseAnimRef.current = true;

        gsap.to(purchasedElement, {
          width: purchasedWidth,
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          borderRadius: "0.75rem",
          duration: 1,
          ease: "power2.inOut",
        });

        gsap.to(purchasedTextRef.current, {
          autoAlpha: 1,
          duration: 0.6,
          delay: 0.4,
          ease: "power1.out",
        });
      };

      const playPurchaseEvent = () => {
        playPurchaseSound();
        playPurchaseAnimation();
      };

      // -----------------------------------------------------------------------
      // Main timeline
      // -----------------------------------------------------------------------

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scannerRef.current,

          start: "top top",

          endTrigger: endRef.current,

          pin: true,

          pinSpacing: true,

          scrub: 4,

          markers: false,

          onEnter: () => {
            turnOnTheLight();
          },

          onLeave: () => {
            turnOffTheLight();
          },

          onEnterBack: () => {
            turnOnTheLight();
          },

          onLeaveBack: () => {
            turnOffTheLight();
          },
        },
      });

      // -----------------------------------------------------------------------
      // 1. Reveal scanner content
      // -----------------------------------------------------------------------

      tl.from(select(".scan-reveal"), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      });

      // -----------------------------------------------------------------------
      // 2. Rotate model
      // -----------------------------------------------------------------------

      if (modelRef) {
        tl.to(modelRef.rotation, {
          y: `+=${Math.PI * 4}`,
          ease: "none",
          duration: 8,
        });

        // ---------------------------------------------------------------------
        // 3. PURCHASE EVENT (sound + badge animation)
        //
        // This call can be triggered by the scrubbed timeline many times
        // (forward and backward), but playPurchaseEvent() guards both the
        // sound and the visual so each only ever plays once, and the visual
        // is never reversed on scroll-back.
        // ---------------------------------------------------------------------

        tl.call(playPurchaseEvent);

        // Spacer to preserve original scroll pacing/pin distance now that
        // the badge tweens run outside the scrubbed timeline.
        tl.to({}, { duration: 1.6 });

        // ---------------------------------------------------------------------
        // 4. Hide / remove 3D model
        // ---------------------------------------------------------------------

        tl.to(modelRef.scale, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power2.in",
          duration: 1.8,
        });
      }

      // -----------------------------------------------------------------------
      // 5. Fade scanner content out
      // -----------------------------------------------------------------------

      tl.to(select(".scan-reveal"), {
        opacity: 0,
        y: -24,
        stagger: 0.05,
        duration: 3.6,
        ease: "power2.in",
      });

      // -----------------------------------------------------------------------
      // 6. Shrink information card
      // -----------------------------------------------------------------------

      tl.to(infoRef.current, {
        width: "96px",
        minWidth: "0px",
        height: "96px",
        overflow: "hidden",
        transformOrigin: "center center",
        duration: 8.2,
        ease: "power3.inOut",
      });

      // -----------------------------------------------------------------------
      // 7. Move information card
      // -----------------------------------------------------------------------

      const positionX =
        {
          left: "20vw",
          center: "20vw",
          right: "-20vw",
        }[position] ?? "0vw";

      tl.to(
        infoRef.current,
        {
          x: positionX,
          duration: 8.2,
          ease: "power3.in",
        },
        "<"
      );

      // -----------------------------------------------------------------------
      // 8. Move number #01 out / #02 in
      //
      // Both driven purely by xPercent against the same-size box, so #02
      // lands fully in view instead of stopping short.
      // -----------------------------------------------------------------------

      tl.to(
        numberOneRef.current,
        {
          xPercent: 100,
          duration: 3.2,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(
        numberTwoRef.current,
        {
          xPercent: 0,
          duration: 3.2,
          ease: "power2.inOut",
        },
        "<"
      );

      // -----------------------------------------------------------------------
      // Cleanup
      // -----------------------------------------------------------------------

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [modelRef, position, count],
      revertOnUpdate: true,
    }
  );

  // ---------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------

  return (
    <div ref={containerRef}>
      <section
        id={scannerId}
        ref={scannerRef}
        className="scanner relative h-svh w-svw overflow-hidden p-10"
      >
        <div
          ref={infoRef}
          dir="ltr"
          className={`
            silencio-scanner
            scan-info
            absolute
            top-1/2
            -translate-y-1/2
            flex
            h-[70vh]
            w-[70vw]
            md:w-[35vw]
            xl:w-[30vw]
            min-w-[260px]
            flex-col
            justify-between
            rounded-xl
            border
            border-black/60
            p-3
            ${positionClass}
          `}
        >
          {/* Header */}

          <div className="flex items-start justify-between">
            <div className="relative number-container flex h-10 w-16 overflow-hidden">
              <h2
                ref={numberOneRef}
                className="absolute inset-0 w-full text-3xl font-bold leading-none tracking-tight"
              >
                #۰{count}
              </h2>

              <h2
                ref={numberTwoRef}
                className="absolute inset-0 w-full text-3xl font-bold leading-none tracking-tight"
              >
                #۰{count + 1}
              </h2>
            </div>

            <p className="scan-reveal silencio-meta [writing-mode:vertical-rl]">
              هویت کسب‌وکار خود را تازه کنید
            </p>
          </div>

          {/* Side text */}

          <p
            className="
              hidden
              md:block
              scan-reveal
              silencio-meta
              absolute
              left-2
              top-1/2
              -translate-y-1/2
              rotate-180
              text-[8px]
              [writing-mode:vertical-rl]
            "
          >
            تفکر جسورانه به‌عنوان پایه
          </p>

          <div className="flex-1" />

          {/* Barcode + Purchased */}

          <div className="scan-reveal relative mb-2 flex items-center justify-between gap-2">
            <div className="relative h-10 w-24 md:w-40">
              <Image
                src="/images/selencio/barcode.svg"
                alt="barcode"
                width={160}
                height={40}
                className="h-full w-full object-fill contrast-150"
              />
            </div>

            <span
              ref={purchasedRef}
              className="
                purched
                inline-flex
                overflow-hidden
                whitespace-nowrap
                rounded-xl
                border
                border-black/60
                py-2
                px-2
                text-sm
                font-bold
                uppercase
                text-red-600
              "
            >
              <span ref={purchasedTextRef}>
                خریده شد
              </span>
            </span>
          </div>

          {/* Bottom information */}

          <div className="scan-reveal flex items-end justify-between gap-3">
            {/* Left */}

            <div
              dir="rtl"
              className="w-[38%] text-[10px] leading-[1.3]"
            >
              <p className="font-bold">
                برای
              </p>

              {[
                ["اینوفرمیسم", "۸۵٪"],
                ["نوآوری", "۹۱٪"],
                ["سفارشی‌سازی", "۸۳٪"],
                ["تفکر", "۹۲٪"],
                ["تمایز", "۷۱٪"],
                ["دقت", "۹۷٪"],
                ["طراحی برای صفحه", "۹۶٪"],
                ["پروژه‌های خسته‌کننده", "۰٪"],
              ].map(([label, value]) => (
                <p
                  key={label}
                  dir="rtl"
                  className="flex justify-between font-medium"
                >
                  <span>{label}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>

            {/* Right */}

            <div
              className="
                w-[34%]
                space-y-0
                md:space-y-1
                text-right
                text-[10px]
                leading-[1.4]
              "
            >
              <p>
                <span className="font-bold">
                  مواد تشکیل‌دهنده:{" "}
                </span>
                مفهوم، نام‌گذاری، روایت داستان، هویت کلامی،
                جایگاه‌سازی، هدف برند
              </p>

              <p className="py-1 md:py-2 font-bold">
                * مفاهیم تاریخ انقضا ندارند.
              </p>

              <p className="font-bold">
                محصولات دیجیتال برای برندهای معاصر
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        ref={endRef}
        className="end-animation"
      />
    </div>
  );
}