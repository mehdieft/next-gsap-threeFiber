"use client"
import { useState } from "react";
import {
  LuArrowLeft,
  LuEye,
  LuEyeOff,
  LuLockKeyhole,
  LuShoppingBag,
  LuSparkles,
} from "react-icons/lu";
import { loginUser } from "../actions/authActions";
import Toast from "@/app/components/eccomerce/toast.jsx";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  function validateLogin(event) {
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "");

    if (username.length < 3) {
      event.preventDefault();
      setValidationMessage("نام کاربری باید حداقل ۳ کاراکتر باشد.");
      return;
    }

    if (password.length < 6) {
      event.preventDefault();
      setValidationMessage("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    setValidationMessage("");
  }

  return (
    <main
      lang="fa"
      dir="rtl"
      className="ecommerce min-h-screen bg-[#f7f5f0] p-4 text-[#1d2939] sm:p-6 lg:p-8"
    >
      {validationMessage && <Toast message={validationMessage} type="error" />}
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden border border-[#dedbd2] bg-white shadow-[0_24px_80px_rgba(35,44,31,0.12)] lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#25463a] p-12 text-[#fbfaf6] lg:flex lg:flex-col">
          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full border border-[#d4a24c]/35" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-[#d4a24c]/25" />

          <a
            href="/ecommerce"
            className="relative z-10 inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-wide"
          >
            <span className="grid size-9 place-items-center rounded-full bg-[#d4a24c] text-[#25463a]">
              <LuShoppingBag aria-hidden="true" />
            </span>
            نورث‌لاین
          </a>

          <div className="relative z-10 my-auto max-w-md pt-20">
            <span className="mb-5 inline-flex items-center gap-2 border border-[#fbfaf6]/20 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-[#e8c985]">
              <LuSparkles aria-hidden="true" /> عضویت
            </span>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">
              بهترین‌ها از آنچه فکر می‌کنید نزدیک‌ترند.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#d8e0d8]">
              وارد حساب کاربری خود شوید، موارد ذخیره‌شده را ببینید، سفارش‌ها را
              پیگیری کنید و تازه‌ها را کشف کنید.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 border-t border-[#fbfaf6]/15 pt-6 text-sm text-[#d8e0d8]">
            <span className="grid size-9 place-items-center rounded-full border border-[#fbfaf6]/20">
              <LuLockKeyhole aria-hidden="true" />
            </span>
            حساب کاربری و سفارش‌های شما، همه در یک جا.
          </div>
        </section>

        <section className="flex min-h-[calc(100vh-2rem)] flex-col px-6 py-8 sm:px-12 sm:py-10 lg:min-h-0 lg:px-16 lg:py-12">
          <a
            href="/ecommerce"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold tracking-wide text-[#25463a] lg:hidden"
          >
            <span className="grid size-9 place-items-center rounded-full bg-[#d4a24c] text-[#25463a]">
              <LuShoppingBag aria-hidden="true" />
            </span>
            نورث‌لاین
          </a>

          <div className="my-auto w-full max-w-md py-12 lg:py-0">
            <p className="text-sm font-semibold text-[#9a6c22]">خوش آمدید</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d2939]">
              ورود به حساب کاربری
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#667085]">
              برای ادامه، اطلاعات حساب خود را وارد کنید.
            </p>

            <form action={loginUser} noValidate onSubmit={validateLogin} className="mt-9 space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-[#344054]"
                >
                 نام کاربری
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                    autoComplete="username"
                  placeholder="example@email.com"
                  dir="ltr"
                  className="h-12 w-full border border-[#d0d5dd] bg-white px-4 text-left text-sm text-[#1d2939] outline-none transition placeholder:text-[#98a2b3] focus:border-[#25463a] focus:ring-3 focus:ring-[#25463a]/15"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#344054]"
                  >
                    رمز عبور
                  </label>
                  <a
                    href="#forgot-password"
                    className="text-sm font-semibold text-[#356250] underline decoration-[#356250]/35 underline-offset-4 transition hover:text-[#1f4034]"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="رمز عبور خود را وارد کنید"
                    dir="ltr"
                    className="h-12 w-full border border-[#d0d5dd] bg-white py-0 pl-12 pr-4 text-left text-sm text-[#1d2939] outline-none transition placeholder:text-right placeholder:text-[#98a2b3] focus:border-[#25463a] focus:ring-3 focus:ring-[#25463a]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"
                    }
                    className="absolute inset-y-0 left-0 grid w-12 place-items-center text-[#667085] transition hover:text-[#25463a] focus:outline-none"
                  >
                    {showPassword ? (
                      <LuEyeOff size={20} aria-hidden="true" />
                    ) : (
                      <LuEye size={20} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-[#475467]">
                <input
                  type="checkbox"
                  name="remember"
                  className="size-4 accent-[#25463a]"
                />
                مرا وارد حساب نگه دارید
              </label>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 bg-[#25463a] px-5 text-sm font-semibold text-white transition hover:bg-[#1c362c] focus:outline-none focus:ring-3 focus:ring-[#25463a]/25"
              >
                ورود به حساب
                <LuArrowLeft size={18} aria-hidden="true" />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#667085]">
              تازه به نورث‌لاین آمده‌اید؟{" "}
              <a
                href="/ecommerce/signup"
                className="font-semibold text-[#356250] underline decoration-[#356250]/35 underline-offset-4 transition hover:text-[#1f4034]"
              >
                ایجاد حساب کاربری
              </a>
            </p>
          </div>

          <p className="text-center text-xs text-[#98a2b3] lg:text-right">
            محافظت‌شده با رمزنگاری امن
          </p>
        </section>
      </div>
    </main>
  );
}
