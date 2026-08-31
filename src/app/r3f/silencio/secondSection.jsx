"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FaFire, FaExclamationTriangle } from "react-icons/fa";
import { FiArrowUpLeft, FiBookOpen } from "react-icons/fi";
gsap.registerPlugin(ScrollTrigger);
const categories = [
  { title: "برندینگ دیجیتال", num: "#۰۱" },
  { title: "زبان‌های بصری", num: "#۰۲" },
  { title: "وب‌سایت‌های تعاملی", num: "#۰۳" },
  { title: "ارتباطات خلاقانه", num: "#۰۴" },
];

export default function SecondSection() {
    const mainRef=useRef()
    const categoriesRef=useRef()
    const headlineRef=useRef()
    useGSAP(()=>{
        gsap.from(categoriesRef.current.children, {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
                trigger: categoriesRef.current,
                start: "top 85%",
                end: "top 45%",
                scrub: 1,
                once:true
            },
        });

        gsap.from(".headline-line", {
            yPercent: 110,
            stagger: 0.15,
            ease: "none",
            scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 80%",
                end: "top 40%",
                scrub: 1,
                once:true
            },
        });

    },{scope:mainRef})
  return (
    <section
    ref={mainRef}
      dir="rtl"
      className="info relative mx-auto pb-40 flex w-full md:w-3/4 flex-col gap-40 overflow-hidden items-center pt-20  px-6 text-[#111] md:px-20"
    >
  

      {/* categories row */}
      <div
        ref={categoriesRef}
        className="grid grid-cols-2 gap-4 pt-24 md:grid-cols-4 md:pt-16"
      >
        {categories.map((cat) => (
          <p
            key={cat.num}
            className="text-center text-[10px] uppercase tracking-widest md:text-[15px]"
          >
            {cat.title}
            <span className="mr-1 text-black/60">{cat.num}</span>
          </p>
        ))}
      </div>

      {/* headline */}
      <div className="flex flex-1 flex-col justify-center">
        <h2 ref={headlineRef} className="space-y-0 leading-[40px] md:leading-[150px] md:space-y-1 text-xl md:text-4xl font-bold  md:text-6xl lg:text-7xl">
          <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
            <span className="headline-line text-shadow-lg/15 flex items-center justify-between  gap-2">
              <span>®</span>
              <span>سلنسیو</span>
              <span>یک</span>
              <span>استودیو</span>
              <span>طراحی</span>
              <span>متمرکز</span>
              <span>بر</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
            <span className="headline-line text-shadow-lg/15 flex items-center justify-between gap-2">
              <span>زبان‌های</span>
              <span>بصری</span>
              <span>دیجیتال</span>
              <span className="whitespace-nowrap text-center text-[8px] font-medium leading-[1.2] tracking-wide md:text-[10px]">
                منحصربه‌فرد
                <br />
                نوآورانه و
                <br />
                ماندگار
              </span>
              <span>برای</span>
              <span>برندهای</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
            <span className="headline-line text-shadow-lg/15 flex items-center justify-between gap-2">
              <span>جسور</span>
              <span>و</span>
              <span>خارج</span>
              <span>از</span>
              <span className="inline-flex items-center gap-2">
                <FaFire className="text-[0.85em]" />
                <FaExclamationTriangle className="text-[0.75em]" />
              </span>
              <span>هنجار</span>
            </span>
          </span>
        </h2>

        {/* paragraphs */}
        <div className="mt-14 flex flex-wrap items-start justify-center  md:justify-between gap-8 md:mt-20">
          <p className="max-w-[20rem] text-justify text-[14px] md:text-[20px] leading-relaxed ">
            ما یک استودیو طراحی متخصص در زبان‌های بصری تعاملی برای سازمان‌هایی
            هستیم که می‌خواهند مرزها را جابه‌جا کنند. ما برندهایی منعطف و چابک
            می‌سازیم که توانایی انطباق با بستر معاصر را دارند؛ بستری که در آن
            سرعت مصرف، محتوای پُرتأثیر را برای مرتبط ماندن ضروری می‌کند.
          </p>
          <p className="max-w-[20rem] text-justify text-[14px] leading-relaxed md:text-[20px]">
            ما محصولات دیجیتالی می‌سازیم که در آن‌ها تعامل با کاربر و حرکت از
            اهمیت فراوانی برخوردار است و همین به ما اجازه می‌دهد احساسات و
            تجربه‌هایی منحصربه‌فرد خلق کنیم.
          </p>
        </div>

        {/* read carefully pill */}
        <div className="mt-10 flex justify-end md:mt-12">
          <button className="flex items-center gap-2 rounded-lg border border-black/60 px-3 py-2 text-[9px] leading-tight tracking-wide transition-colors hover:bg-black hover:text-white">
            <FiBookOpen className="text-base" />
            <span>
              لطفاً با دقت
              <br />
              بخوانید
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
