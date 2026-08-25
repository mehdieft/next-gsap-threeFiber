"use client";
import Image from "next/image";
export default function ThirdSection() {
  return (
    <section
      dir="rtl"
      className="relative h-svh w-svw pt-20 flex flex-col justify-center items-center"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 aspect-square w-24 p-2 rounded-xl border flex flex-col justify-between text-right gap-4">
        <h1 className="text-2xl font-bold">#1</h1>
        <h1 className="text-sm text-gray-700">
          دیجیتال <br /> برندینگ
        </h1>
      </div>
      <h1 className="text-3xl md:text-9xl text-gray-800 leading-[1.45] font-light text-center">
        هر ایده‌ی خوب
        <br />
        <span className="inline-flex items-center gap-3">
          از یک
          <Image
            src="/images/selencio/coca.jpg"
            alt="coca"
            className="w-20 rounded-sm object-cover"
            width={200}
            height={200}
          />
          نگاه متفاوت
        </span>
        <br />
        شروع می‌شود
      </h1>
    </section>
  );
}
