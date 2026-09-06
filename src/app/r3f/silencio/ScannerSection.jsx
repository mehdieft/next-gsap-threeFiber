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

  // ---------------------------------------------------------------------------
  // Purchase animation
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
      // Purchase element
      // -----------------------------------------------------------------------

      const purchasedElement = purchasedRef.current;

      if (!purchasedElement) return;

      // -----------------------------------------------------------------------
      // Audio
      // -----------------------------------------------------------------------

      const audio = new Audio("/sound/checkout.mp3");

      audio.preload = "auto";
      audio.volume = 1;

      soundRef.current = audio;

      // Start loading immediately
      audio.load();

      // -----------------------------------------------------------------------
      // Unlock audio on first user interaction
      //
      // Browsers may block programmatic audio until the user interacts
      // with the page once.
      // -----------------------------------------------------------------------

      const unlockAudio = () => {
        audio
          .play()
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
          })
          .catch(() => {
            // It's okay if this fails.
            // The actual purchase sound will try again later.
          });
      };

      window.addEventListener("pointerdown", unlockAudio, {
        once: true,
      });

      // -----------------------------------------------------------------------
      // Measure purchase badge
      // -----------------------------------------------------------------------

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
      // Initial number state
      // -----------------------------------------------------------------------

      gsap.set(numberOneRef.current, {
        xPercent: 0,
      });

      gsap.set(numberTwoRef.current, {
        xPercent: -100,
      });

      // -----------------------------------------------------------------------
      // Play purchase sound
      // -----------------------------------------------------------------------

      const playPurchaseSound = () => {
        // Already played
        if (hasPlayedPurchaseSoundRef.current) {
          return;
        }

        const sound = soundRef.current;

        if (!sound) {
          console.warn("Purchase sound does not exist.");
          return;
        }

        // Mark as played before attempting playback.
        hasPlayedPurchaseSoundRef.current = true;

        sound.currentTime = 0;
        sound.volume = 1;

        sound
          .play()
          .then(() => {
            console.log("Purchase sound playing");
          })
          .catch((error) => {
            console.warn(
              "Purchase sound was blocked:",
              error
            );

            // Allow another attempt if browser blocked it.
            hasPlayedPurchaseSoundRef.current = false;
          });
      };

      // -----------------------------------------------------------------------
      // Purchase badge animation
      // -----------------------------------------------------------------------

      const playPurchaseAnimation = () => {
        // Already animated
        if (hasPlayedPurchaseAnimRef.current) {
          return;
        }

        hasPlayedPurchaseAnimRef.current = true;

        // Circle -> pill
        gsap.to(purchasedElement, {
          width: purchasedWidth,
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          borderRadius: "0.75rem",
          duration: 1,
          ease: "power2.inOut",
        });

        // Text appears
        gsap.to(purchasedTextRef.current, {
          autoAlpha: 1,
          duration: 0.6,
          delay: 0.4,
          ease: "power1.out",
        });
      };

      // -----------------------------------------------------------------------
      // Main timeline
      // -----------------------------------------------------------------------

      let previousTime = 0;
      let purchaseTime = null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scannerRef.current,

          start: "top top",

          endTrigger: endRef.current,

          pin: true,

          pinSpacing: true,

          scrub: 4,

          markers: false,

          // -------------------------------------------------------------------
          // ScrollTrigger update
          //
          // Instead of tl.call(), we watch the timeline position and detect
          // when it crosses the purchase label.
          // -------------------------------------------------------------------

          onUpdate: () => {
            if (purchaseTime === null) {
              return;
            }

            const currentTime = tl.time();

            // Timeline is moving forward and has crossed purchase point
            if (
              !hasPlayedPurchaseSoundRef.current &&
              previousTime < purchaseTime &&
              currentTime >= purchaseTime
            ) {
              // IMPORTANT:
              // Sound first
              playPurchaseSound();

              // Then visual animation
              playPurchaseAnimation();
            }

            previousTime = currentTime;
          },

          // -------------------------------------------------------------------
          // Light
          // -------------------------------------------------------------------

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
        // PURCHASE MOMENT
        // ---------------------------------------------------------------------
        //
        // We use a label instead of tl.call().
        //
        // This gives us an exact timeline position that ScrollTrigger can
        // detect even though the timeline is scrubbed.
        // ---------------------------------------------------------------------

        tl.addLabel("purchase");

        purchaseTime = tl.labels.purchase;

        // ---------------------------------------------------------------------
        // Spacer
        // ---------------------------------------------------------------------

        tl.to(
          {},
          {
            duration: 1.6,
          }
        );

        // ---------------------------------------------------------------------
        // 3. Hide / remove 3D model
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
      // 4. Fade scanner content out
      // -----------------------------------------------------------------------

      tl.to(select(".scan-reveal"), {
        opacity: 0,
        y: -24,
        stagger: 0.05,
        duration: 3.6,
        ease: "power2.in",
      });

      // -----------------------------------------------------------------------
      // 5. Shrink information card
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
      // 6. Move information card
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
      // 7. Number swap
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
        window.removeEventListener(
          "pointerdown",
          unlockAudio
        );

        audio.pause();
        audio.currentTime = 0;

        soundRef.current = null;

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