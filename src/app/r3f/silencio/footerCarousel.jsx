"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function FooterCarousel() {
  const containerRef = useRef(null);
  const frontRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current || !frontRef.current) return;

      const mm = gsap.matchMedia();

      // ============================================================
      // DESKTOP
      // ============================================================

      mm.add("(min-width: 796px)", () => {
        const front = frontRef.current;

        gsap.fromTo(
          front,
          {
            yPercent: 0,
          },
          {
            yPercent: -100,
            ease: "none",

            scrollTrigger: {
              trigger: containerRef.current,

              start: "top top",

              end: "+=100vh",

              scrub: 1,

              pin: true,

              pinSpacing: true,

              invalidateOnRefresh: true,

              markers: false,
            },
          }
        );
      });

      // ============================================================
      // MOBILE
      // ============================================================

      mm.add("(max-width: 795px)", () => {
        const front = frontRef.current;

        gsap.fromTo(
          front,
          {
            yPercent: 0,
          },
          {
            yPercent: -100,
            ease: "none",

            scrollTrigger: {
              trigger: containerRef.current,

              start: "top top",

              end: "+=100vh",

              scrub: 0.8,

              pin: true,

              pinSpacing: true,

              invalidateOnRefresh: true,

              markers: false,
            },
          }
        );
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section
      ref={containerRef}
      className="
        relative
        w-full
      "
    >
      {/* ================================================================
          FOOTER — BACKGROUND / BEHIND
      ================================================================= */}

      <footer
        ref={footerRef}
        dir="rtl"
        className="
          absolute
          left-0
          top-0
          z-0
          flex
          h-[100svh]
          w-full
          flex-col
          justify-between
          overflow-hidden
          bg-[#e9e9e9]
          px-5
          py-6
          text-black
          sm:px-8
          sm:py-8
          lg:px-[4vw]
          lg:py-[2vw]
        "
      >
        {/* ==============================================================
            FOOTER TOP
        ============================================================== */}

        <div
          className="
            flex
            w-full
            items-start
            justify-between
            text-[10px]
            font-medium
            leading-none
            sm:text-xs
          "
        >
          <p>
            این وب‌سایت ۲۴ ساعت باز است
          </p>

          <p>
            ممنون که سر زدید
          </p>
        </div>

        {/* ==============================================================
            FOOTER CENTER
        ============================================================== */}

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            <h2
              className="
                text-center
                text-[clamp(70px,16vw,230px)]
                font-light
                leading-[0.82]
                tracking-[-0.08em]
              "
            >
              بیایید
              <br />
              صحبت کنیم
            </h2>

            <div className="mt-8 text-center">
              <a
                href="mailto:hello@example.com"
                dir="ltr"
                className="
                  text-xs
                  underline
                  underline-offset-4
                  transition-opacity
                  duration-300
                  hover:opacity-50
                  sm:text-sm
                "
              >
                hello@example.com
              </a>
            </div>
          </div>
        </div>

        {/* ==============================================================
            FOOTER BOTTOM
        ============================================================== */}

        <div
          dir="ltr"
          className="
            flex
            items-end
            justify-between
            text-[10px]
            font-medium
            leading-none
            sm:text-xs
          "
        >
          <div className="flex gap-5 sm:gap-8">
            <a
              href="#"
              className="transition-opacity hover:opacity-50"
            >
              Instagram
            </a>

            <a
              href="#"
              className="transition-opacity hover:opacity-50"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="transition-opacity hover:opacity-50"
            >
              Behance
            </a>
          </div>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="transition-opacity hover:opacity-50"
          >
            Back / To TOP ↑
          </button>
        </div>
      </footer>

      {/* ================================================================
          FRONT BLACK SECTION
      ================================================================= */}

      <div
        ref={frontRef}
        className="
          relative
          z-20
          w-full
          origin-bottom
        "
      >
        <section
          dir="rtl"
          className="
            relative
            w-full
            overflow-hidden
            rounded-2xl
            bg-black
            text-[#e9e9e9]
          "
        >
          {/* ==============================================================
              MAIN CANVAS
          ============================================================== */}

          <div
            className="
              relative
              mx-auto
              grid
              w-full
              max-w-[1600px]
              grid-cols-2
              gap-x-4
              gap-y-5
              px-5
              pb-12
              pt-10
              sm:px-8
              sm:pt-12
              lg:block
              lg:min-h-[100svh]
              lg:px-[4vw]
              lg:py-[5vw]
            "
          >
            {/* ==========================================================
                SMALL LABELS
            ========================================================== */}

            <div
              className="
                col-span-2
                flex
                items-center
                justify-between
                px-1
                text-[11px]
                font-medium
                leading-none
                lg:absolute
                lg:left-[13.7%]
                lg:top-[8.2%]
                lg:z-20
                lg:w-[72.6%]
                lg:text-[10px]
              "
            >
              <p className="whitespace-nowrap">
                مشتریان جسور
              </p>

              <p
                className="
                  whitespace-nowrap
                  lg:absolute
                  lg:left-[45.6%]
                "
              >
                متفاوت باش
              </p>

              <p
                className="
                  whitespace-nowrap
                  line-through
                  lg:absolute
                  lg:right-0
                "
              >
                کسل‌کننده
              </p>
            </div>

            {/* ==========================================================
                HERO TEXT
            ========================================================== */}

            <div
              className="
                col-span-2
                py-2
                sm:py-4
                lg:relative
                lg:z-10
                lg:pt-[4vw]
              "
            >
              <h1
                className="
                  text-center
                  text-[clamp(52px,13vw,180px)]
                  font-light
                  leading-[0.92]
                  tracking-[-0.065em]
                "
              >
                <span className="block">
                  برندهای جسور
                </span>

                <span className="block">
                  می‌خواهند
                </span>

                <span className="block">
                  مسیر
                </span>

                <span className="block">
                  خودشان را پیدا کنند
                </span>
              </h1>
            </div>

            {/* ==========================================================
                IMAGE 01
            ========================================================== */}

            <div
              className="
                relative
                col-span-1
                h-28
                w-24
                justify-self-end
                overflow-hidden
                rounded-[8px]
                sm:h-36
                sm:w-28
                lg:absolute
                lg:left-[17.8%]
                lg:top-[29.5%]
                lg:z-20
                lg:h-[240px]
                lg:w-[185px]
              "
            >
              <Image
                src="/images/selencio/bolsaplastico_mano.jpg"
                alt=""
                fill
                priority
                sizes="
                  (min-width: 1024px) 185px,
                  (min-width: 640px) 112px,
                  96px
                "
                className="object-cover"
              />
            </div>

            {/* ==========================================================
                IMAGE 02
            ========================================================== */}

            <div
              className="
                relative
                col-span-1
                mt-7
                h-28
                w-24
                overflow-hidden
                rounded-[8px]
                sm:mt-10
                sm:h-36
                sm:w-28
                lg:absolute
                lg:right-[17.8%]
                lg:top-[26.8%]
                lg:z-20
                lg:mt-0
                lg:h-[245px]
                lg:w-[185px]
              "
            >
              <Image
                src="/images/selencio/grupo_encajaregistradora.jpg"
                alt=""
                fill
                sizes="
                  (min-width: 1024px) 185px,
                  (min-width: 640px) 112px,
                  96px
                "
                className="object-cover"
              />
            </div>

            {/* ==========================================================
                DESCRIPTION RIGHT
            ========================================================== */}

            <div
              dir="rtl"
              className="
                col-span-2
                pt-2
                text-right
                text-[15px]
                font-normal
                leading-[1.8]
                tracking-[-0.02em]
                sm:text-base
                lg:absolute
                lg:right-[19.7%]
                lg:top-[74.5%]
                lg:z-20
                lg:w-[26%]
                lg:max-w-[430px]
                lg:pt-0
                lg:text-[11px]
                lg:leading-[1.35]
              "
            >
              <p>
                ما با برندهایی از حوزه‌های مختلف کار می‌کنیم؛
                برندهایی متفاوت که نقطه‌ی مشترکشان میل به
                متفاوت بودن از رقباست. آن‌ها می‌خواهند شیوه‌ی
                ارتباط خود را با خلاقیت، اصالت و طراحی متمایز
                کنند و مسیر خودشان را بسازند.
              </p>
            </div>

            {/* ==========================================================
                DESCRIPTION LEFT
            ========================================================== */}

            <div
              dir="rtl"
              className="
                col-span-2
                text-right
                text-[15px]
                font-normal
                leading-[1.8]
                tracking-[-0.02em]
                sm:text-base
                lg:absolute
                lg:left-[19.5%]
                lg:top-[74.5%]
                lg:z-20
                lg:w-[25%]
                lg:max-w-[430px]
                lg:text-[11px]
                lg:leading-[1.35]
              "
            >
              <p>
                ما با برندهایی همراه می‌شویم که می‌خواهند
                خودشان را از دیگران متمایز کنند؛ مشتریانی جسور
                که باور دارند متفاوت بودن یک انتخاب است.
                برای همه‌ی آن‌ها، ما به دنبال ساختن برندهایی
                صادق، منحصربه‌فرد و قابل باور هستیم.
              </p>
            </div>

            {/* ==========================================================
                IMAGE 03
            ========================================================== */}

            <div
              className="
                relative
                col-span-1
                mt-2
                h-32
                w-32
                justify-self-end
                overflow-hidden
                rounded-[8px]
                sm:h-40
                sm:w-40
                lg:absolute
                lg:left-[11.2%]
                lg:top-[82.2%]
                lg:z-10
                lg:mt-0
                lg:h-[250px]
                lg:w-[255px]
              "
            >
              <Image
                src="/images/selencio/lata_escanear.jpg"
                alt=""
                fill
                sizes="
                  (min-width: 1024px) 255px,
                  (min-width: 640px) 160px,
                  128px
                "
                className="object-cover"
              />
            </div>

            {/* ==========================================================
                IMAGE 04
            ========================================================== */}

            <div
              className="
                relative
                col-span-1
                mt-10
                h-32
                w-32
                overflow-hidden
                rounded-[8px]
                sm:mt-16
                sm:h-40
                sm:w-40
                lg:absolute
                lg:right-[19.8%]
                lg:top-[71.8%]
                lg:z-10
                lg:mt-0
                lg:h-[255px]
                lg:w-[255px]
              "
            >
              <Image
                src="/images/selencio/latas_estanteriaarriba-2.jpg"
                alt=""
                fill
                sizes="
                  (min-width: 1024px) 255px,
                  (min-width: 640px) 160px,
                  128px
                "
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}