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
    useGSAP(()=>{

    },{})
  return (
    <section
    ref={mainRef}
      dir="rtl"
      className="info relative mx-auto flex h-svh w-3/4 flex-col overflow-hidden items-center  justify-center px-6 text-[#111] md:px-20"
    >
      {/* selected works pill */}
      <div className="absolute right-6 top-6 md:right-10 md:top-8">
        <button className="flex items-center gap-1.5 rounded-full border border-black/60 px-4 py-1.5 text-[10px] tracking-widest transition-colors hover:bg-black hover:text-white">
          کارهای منتخب
          <FiArrowUpLeft className="text-sm" />
        </button>
      </div>

      {/* categories row */}
      <div className="grid grid-cols-2 gap-4 pt-24 md:grid-cols-4 md:pt-16">
        {categories.map((cat) => (
          <p
            key={cat.num}
            className="text-center text-[10px] uppercase tracking-widest md:text-[11px]"
          >
            {cat.title}
            <span className="mr-1 text-black/60">{cat.num}</span>
          </p>
        ))}
      </div>

      {/* headline */}
      <div className="flex flex-1 flex-col justify-center">
        <h2 className="space-y-1 text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
          <span className="flex items-center justify-between gap-2">
            <span>®</span>
            <span>سلنسیو</span>
            <span>یک</span>
            <span>استودیو</span>
            <span>طراحی</span>
            <span>متمرکز</span>
            <span>بر</span>
          </span>
          <span className="flex items-center justify-between gap-2">
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
          <span className="flex items-center justify-between gap-2">
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
        </h2>

        {/* paragraphs */}
        <div className="mt-14 flex flex-wrap items-start justify-between gap-8 md:mt-20">
          <p className="max-w-[16rem] text-justify text-[10px] leading-relaxed md:text-[11px]">
            ما یک استودیو طراحی متخصص در زبان‌های بصری تعاملی برای سازمان‌هایی
            هستیم که می‌خواهند مرزها را جابه‌جا کنند. ما برندهایی منعطف و چابک
            می‌سازیم که توانایی انطباق با بستر معاصر را دارند؛ بستری که در آن
            سرعت مصرف، محتوای پُرتأثیر را برای مرتبط ماندن ضروری می‌کند.
          </p>
          <p className="max-w-[16rem] text-justify text-[10px] leading-relaxed md:text-[11px]">
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
