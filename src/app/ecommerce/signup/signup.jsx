"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LuArrowLeft, LuLockKeyhole, LuShoppingBag, LuSparkles } from "react-icons/lu";
import { authClient } from "../../lib/auth-client";
import Toast from "../../components/eccomerce/Toast";

const signupSchema = z.object({
  name: z.string().trim().min(2, "نام باید حداقل ۲ کاراکتر باشد."),
  email: z.email("ایمیل معتبر وارد کنید."),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد.").max(128, "رمز عبور نمی‌تواند بیشتر از ۱۲۸ کاراکتر باشد."),
  confirmPassword: z.string(),
}).refine((values) => values.password === values.confirmPassword, {
  message: "رمزهای عبور یکسان نیستند.",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values) {
    setAuthError("");
    try {
      const { error } = await authClient.signUp.email({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        callbackURL: "/ecommerce/admin",
      });

      if (error) {
        setAuthError(error.message || "ساخت حساب کاربری انجام نشد. دوباره تلاش کنید.");
        return;
      }

      router.push("/ecommerce/admin");
      router.refresh();
    } catch {
      setAuthError("ارتباط با سرویس ورود برقرار نشد. دوباره تلاش کنید.");
    }
  }

  return (
    <main lang="fa" dir="rtl" className="ecommerce min-h-screen bg-[#f7f5f0] p-4 text-[#1d2939] sm:p-6 lg:p-8">
      {authError && <Toast message={authError} type="error" />}
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
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-9 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#344054]">نام</label>
                <input id="name" autoComplete="name" {...register("name")} placeholder="نام خود را وارد کنید" className="h-12 w-full border border-[#d0d5dd] bg-white px-4 text-right text-sm text-[#1d2939] outline-none transition placeholder:text-[#98a2b3] focus:border-[#25463a] focus:ring-3 focus:ring-[#25463a]/15" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-700">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#344054]">ایمیل</label>
                <input id="email" type="email" autoComplete="email" dir="ltr" {...register("email")} placeholder="example@email.com" className="h-12 w-full border border-[#d0d5dd] bg-white px-4 text-left text-sm text-[#1d2939] outline-none transition placeholder:text-[#98a2b3] focus:border-[#25463a] focus:ring-3 focus:ring-[#25463a]/15" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-700">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#344054]">رمز عبور</label>
                <input id="password" type="password" autoComplete="new-password" dir="ltr" {...register("password")} placeholder="حداقل ۸ کاراکتر" className="h-12 w-full border border-[#d0d5dd] bg-white px-4 text-left text-sm text-[#1d2939] outline-none transition placeholder:text-right placeholder:text-[#98a2b3] focus:border-[#25463a] focus:ring-3 focus:ring-[#25463a]/15" aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined} />
                {errors.password && <p id="password-error" className="mt-1 text-sm text-red-700">{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-[#344054]">تکرار رمز عبور</label>
                <input id="confirmPassword" type="password" autoComplete="new-password" dir="ltr" {...register("confirmPassword")} placeholder="رمز عبور را دوباره وارد کنید" className="h-12 w-full border border-[#d0d5dd] bg-white px-4 text-left text-sm text-[#1d2939] outline-none transition placeholder:text-right placeholder:text-[#98a2b3] focus:border-[#25463a] focus:ring-3 focus:ring-[#25463a]/15" aria-invalid={!!errors.confirmPassword} aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined} />
                {errors.confirmPassword && <p id="confirm-password-error" className="mt-1 text-sm text-red-700">{errors.confirmPassword.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="flex h-12 w-full items-center justify-center gap-2 bg-[#25463a] px-5 text-sm font-semibold text-white transition hover:bg-[#1c362c] focus:outline-none focus:ring-3 focus:ring-[#25463a]/25 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "در حال ساخت حساب..." : "ایجاد حساب"} <LuArrowLeft size={18} aria-hidden="true" /></button>
            </form>
            <p className="mt-8 text-center text-sm text-[#667085]">قبلاً حساب ساخته‌اید؟ <Link href="/ecommerce/Login" className="font-semibold text-[#356250] underline decoration-[#356250]/35 underline-offset-4 transition hover:text-[#1f4034]">ورود به حساب</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
