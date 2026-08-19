"use client";

import Link from "next/link";
import { useState } from "react";
import { LuArrowLeft, LuLockKeyhole, LuShoppingBag, LuSparkles } from "react-icons/lu";
import { signupUser } from "../actions/authActions";
import Toast from "@/app/components/eccomerce/toast.jsx";

export default function SignupPage() {
  const [validationMessage, setValidationMessage] = useState("");

  function validateSignup(event) {
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (username.length < 3) {
      event.preventDefault();
      setValidationMessage("نام کاربری باید حداقل ۳ کاراکتر باشد.");
      return;
    }

    if (password.length < 6 || password.length > 72) {
      event.preventDefault();
      setValidationMessage("رمز عبور باید بین ۶ تا ۷۲ کاراکتر باشد.");
      return;
    }

    if (password !== confirmPassword) {
      event.preventDefault();
      setValidationMessage("رمزهای عبور یکسان نیستند.");
      return;
    }

    setValidationMessage("");
  }

  return (
    <main lang="fa" dir="rtl" className="ecommerce min-h-screen bg-[#f7f5f0] p-4 text-[#1d2939] sm:p-6 lg:p-8">
      {validationMessage && <Toast message={validationMessage} type="error" />}
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden border border-[#dedbd2] bg-white shadow-[0_24px_80px_rgba(35,44,31,0.12)] lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#25463a] p-12 text-[#fbfaf6] lg:flex lg:flex-col">
          <a href="/ecommerce" className="relative z-10 inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-wide">
            <span className="grid size-9 place-items-center rounded-full bg-[#d4a24c] text-[#25463a]"><LuShoppingBag aria-hidden="true" /></span>
            نورث‌لاین
          </a>
          <div className="relative z-10 my-auto max-w-md pt-20">
            <span className="mb-5 inline-flex items-center gap-2 border border-[#fbfaf6]/20 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-[#e8c985]"><LuSparkles aria-hidden="true" /> عضویت</span>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">حساب خود را بسازید.</h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#d8e0d8]">به فروشگاه بپیوندید و سفارش‌ها و علاقه‌مندی‌های خود را در یک جا مدیریت کنید.</p>
          </div>
          <div className="relative z-10 flex items-center gap-3 border-t border-[#fbfaf6]/15 pt-6 text-sm text-[#d8e0d8]"><span className="grid size-9 place-items-center rounded-full border border-[#fbfaf6]/20"><LuLockKeyhole aria-hidden="true" /></span> اطلاعات شما با امنیت نگهداری می‌شود.</div>
        </section>

        <section className="flex min-h-[calc(100vh-2rem)] flex-col px-6 py-8 sm:px-12 sm:py-10 lg:min-h-0 lg:px-16 lg:py-12">
          <Link href="/ecommerce" className="inline-flex items-center gap-2 self-start text-sm font-semibold tracking-wide text-[#25463a] lg:hidden"><span className="grid size-9 place-items-center rounded-full bg-[#d4a24c] text-[#25463a]"><LuShoppingBag aria-hidden="true" /></span>نورث‌لاین</Link>
          <div className="my-auto w-full max-w-md py-12 lg:py-0">
            <p className="text-sm font-semibold text-[#9a6c22]">شروع کنید</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d2939]">ایجاد حساب کاربری</h2>
            <p className="mt-3 text-sm leading-6 text-[#667085]">اطلاعات خود را وارد کنید تا حساب شما ساخته شود.</p>
            <form action={signupUser} noValidate onSubmit={validateSignup} className="mt-9 space-y-5">
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-semibold text-[#344054]">نام کاربری</label>
                <input id="username" name="username" type="text" autoComplete="username" dir="ltr" required placeholder="نام کاربری خود را وارد کنید" className="h-12 w-full border border-[#d0d5dd] bg-white px-4 text-left text-sm text-[#1d2939] outline-none transition placeholder:text-[#98a2b3] focus:border-[#25463a] focus:ring-3 focus:ring-[#25463a]/15" />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#344054]">رمز عبور</label>
                <input id="password" name="password" type="password" autoComplete="new-password" dir="ltr" required minLength={6} maxLength={72} placeholder="حداقل ۶ کاراکتر" className="h-12 w-full border border-[#d0d5dd] bg-white px-4 text-left text-sm text-[#1d2939] outline-none transition placeholder:text-right placeholder:text-[#98a2b3] focus:border-[#25463a] focus:ring-3 focus:ring-[#25463a]/15" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-[#344054]">تکرار رمز عبور</label>
                <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" dir="ltr" required minLength={6} maxLength={72} placeholder="رمز عبور را دوباره وارد کنید" className="h-12 w-full border border-[#d0d5dd] bg-white px-4 text-left text-sm text-[#1d2939] outline-none transition placeholder:text-right placeholder:text-[#98a2b3] focus:border-[#25463a] focus:ring-3 focus:ring-[#25463a]/15" />
              </div>
              <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 bg-[#25463a] px-5 text-sm font-semibold text-white transition hover:bg-[#1c362c] focus:outline-none focus:ring-3 focus:ring-[#25463a]/25">ایجاد حساب <LuArrowLeft size={18} aria-hidden="true" /></button>
            </form>
            <p className="mt-8 text-center text-sm text-[#667085]">قبلاً حساب ساخته‌اید؟ <Link href="/ecommerce/Login" className="font-semibold text-[#356250] underline decoration-[#356250]/35 underline-offset-4 transition hover:text-[#1f4034]">ورود به حساب</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
