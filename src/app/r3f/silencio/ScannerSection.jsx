"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef,useEffect } from "react";
import useSelencio from "../../store/useSelencio";
gsap.registerPlugin(ScrollTrigger);

export default function ScannerSection({
  modelRef,
  scannerId,
  position,
  count = 1,
}) {
  const { turnOnTheLight, turnOffTheLight } = useSelencio();

  const soundRef = useRef();
  const containerRef = useRef();
  const scannerRef = useRef();
  const endRef = useRef();
  const infoRef = useRef();
  const numberOneRef = useRef();
  const numberTwoRef = useRef();
  const purchasedRef = useRef();
  const purchasedTextRef = useRef();
  const hasPlayedPurchaseAnimationRef = useRef(false);
  const positionClass =
    {
      left: "left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0",
      center: "left-1/2 -translate-x-1/2",
      right:
        "left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0",
    }[position] ?? "left-1/2 -translate-x-1/2";

     useEffect(() => {
    if (typeof window !== 'undefined') {
      soundRef.current = new Audio("/sound/checkout.mp3");
      soundRef.current.preload = 'auto';
      
      // Cleanup
      return () => {
        if (soundRef.current) {
          soundRef.current.pause();
          soundRef.current = null;
        }
      };
    }
  }, []);
    const playSound = () => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current || !scannerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scannerRef.current,
          start: "top top",
          endTrigger: endRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 7,
          markers: false,
          onEnter: () => turnOnTheLight(),
          onLeave: () => turnOffTheLight(),
          onEnterBack: () => turnOnTheLight(),
          onLeaveBack: () => turnOffTheLight(),
        },
      });

      const select = gsap.utils.selector(containerRef);

      // اندازه‌ی طبیعی span (قبل از هرگونه دستکاری) را می‌خوانیم
      const purchasedWidth =
        purchasedRef.current?.getBoundingClientRect().width;
      const purchasedHeight =
        purchasedRef.current?.getBoundingClientRect().height;

      // حالت اولیه: یک دایره‌ی کامل و بدون متن
      gsap.set(purchasedRef.current, {
        width: purchasedHeight,
        paddingLeft: 0,
        paddingRight: 0,
        borderColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: "9999px",
      });
      gsap.set(purchasedTextRef.current, { autoAlpha: 0 });

      const purchaseTimeline = gsap
        .timeline({ paused: true })
        .to(purchasedRef.current, {
          width: purchasedWidth,
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          borderRadius: "0.75rem",
          duration: 2,
          ease: "power2.inOut",
        })
        .call(() => {
          playSound();
        })
        .to(purchasedTextRef.current, {
          autoAlpha: 1,
          duration: 1,
          ease: "power1.out",
        });

      tl.from(select(".scan-reveal"), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      });

      if (modelRef) {
        tl.to(modelRef.rotation, {
          y: `+=${Math.PI * 4}`,
          ease: "none",
          duration: 8,
        });

        tl.call(
          () => {
            if (hasPlayedPurchaseAnimationRef.current) return;

            hasPlayedPurchaseAnimationRef.current = true;
            purchaseTimeline.play(0);
          },
          [],
          "<",
        );

        tl.to(modelRef.scale, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power2.in",
          duration: 1.8,
        });
      }

      tl.to(select(".scan-reveal"), {
        opacity: 0,
        y: -24,
        stagger: 0.05,
        duration: 1.6,
        ease: "power2.in",
      });
      tl.to(infoRef.current, {
        width: "96px",
        minWidth: "0px",
        height: "96px",
        overflow: "hidden",
        transformOrigin: "center center",
        duration: 1.2,
        ease: "power3.inOut",
      });
      // add position change
      tl.to(infoRef.current, {
        x:
          {
            left: "20vw",
            center: "20vw",
            right: "-20vw",
          }[position] ?? "0vw",
        duration: 3.2,
        ease: "power3.in",
      });
      tl.to(
        numberOneRef.current,
        {
          xPercent: 120,
          duration: 3.2,
          ease: "power2.inOut",
        },
        "<",
      );

      tl.to(
        numberTwoRef.current,
        {
          xPercent: 97,
          duration: 1,
          ease: "power2.inOut",
        },
        "<",
      );
    },
    { scope: containerRef, dependencies: [modelRef], revertOnUpdate: true },
  );

  return (
    <div ref={containerRef}>
      <section
        id={scannerId}
        ref={scannerRef}
        className="scanner relative   h-svh w-svw overflow-hidden p-10"
      >
        <div
          ref={infoRef}
          dir="ltr"
          className={`silencio-scanner scan-info absolute top-1/2 -translate-y-1/2 flex h-[70vh] w-[90vw] md:w-[30vw] min-w-[320px] flex-col justify-between rounded-xl border border-black/60 p-3 ${positionClass}`}
        >
          <div className="flex items-start justify-between">
            <div className="relative number-container h-10 w-16 flex overflow-hidden">
              <h2
                ref={numberOneRef}
                className="w-full  text-3xl font-bold leading-none tracking-tight"
              >
                #۰{count}
              </h2>
              <h2
                ref={numberTwoRef}
                className="absolute -left-full top-0 text-3xl font-bold leading-none tracking-tight"
              >
                #۰{count + 1}
              </h2>
            </div>
            <p className="scan-reveal silencio-meta text-[8px] [writing-mode:vertical-rl]">
              هویت کسب‌وکار خود را تازه کنید
            </p>
          </div>
          <p className="scan-reveal silencio-meta absolute left-2 top-1/2 -translate-y-1/2 rotate-180 text-[8px] [writing-mode:vertical-rl]">
            تفکر جسورانه به‌عنوان پایه
          </p>
          <div className="flex-1" />
          <div className="scan-reveal mb-2 relative flex items-center gap-2">
            <div className="relative">
            
            <Image
              src="/images/selencio/barcode.svg"
              alt="barcode"
              width={160}
              height={40}
              className="h-8 w-36 object-fill"
            />
            </div>
            <span
              ref={purchasedRef}
              className="purched inline-flex overflow-hidden whitespace-nowrap rounded-xl border border-black/60 py-2 px-2 text-sm font-bold uppercase text-red-600"
            >
              <span ref={purchasedTextRef}>خریده شد</span>
            </span>
          </div>
          <div className="scan-reveal flex items-start justify-between gap-3">
            <div className="w-[38%] text-[10px] leading-[1.3]">
              <p className="font-bold">برای</p>
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
                <p key={label} className="flex justify-between font-medium">
                  <span>{label}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>
            <div className="w-[34%] space-y-1 text-[10px] leading-[1.4]">
              <p>
                <span className="font-bold">مواد تشکیل‌دهنده: </span>مفهوم،
                نام‌گذاری، روایت داستان، هویت کلامی، جایگاه‌سازی، هدف برند
              </p>
              <p className="py-3 font-bold">* مفاهیم تاریخ انقضا ندارند.</p>
              <p className="font-bold">محصولات دیجیتال برای برندهای معاصر</p>
            </div>
          </div>
        </div>
      </section>
      <div ref={endRef} className="end-animation"></div>
    </div>
  );
}
