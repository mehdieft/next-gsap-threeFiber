"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { createJWT } from "@/app/lib/utils";
import { setCookie } from "@/app/lib/cookies";

export async function loginUser(formData) {
    console.log("this is formData", formData);
    const data = {
        username: formData.get("username"),
        password: formData.get("password"),
    };
    const user = await prisma.adminUser.findUnique({
        where: { userName: data.username },
    });
    if (!user){
        redirect(`/ecommerce/Login?error=${encodeURIComponent('نام کاربری یا رمز عبور اشتباه است')}`);
    }

    const isvalidPassword = await bcrypt.compare(data.password, user.password);

    if (!isvalidPassword){
        
        redirect(`/ecommerce/Login?error=${encodeURIComponent('نام کاربری یا رمز عبور اشتباه است')}`);
    }
    const token= await createJWT(user);
    await setCookie('jwt_token', token, { maxAge: 2 * 60 * 60 });
    redirect('/ecommerce/admin');

}

export async function signupUser(formData) {
    const userName = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (!userName || userName.length < 3) {
        redirect(`/ecommerce/signup?error=${encodeURIComponent("نام کاربری باید حداقل ۳ کاراکتر باشد")}`);
    }

    if (password.length < 6 || password.length > 72) {
        redirect(`/ecommerce/signup?error=${encodeURIComponent("رمز عبور باید بین ۶ تا ۷۲ کاراکتر باشد")}`);
    }

    if (password !== confirmPassword) {
        redirect(`/ecommerce/signup?error=${encodeURIComponent("رمزهای عبور یکسان نیستند")}`);
    }

    const existingUser = await prisma.adminUser.findUnique({
        where: { userName },
    });

    if (existingUser) {
        redirect(`/ecommerce/signup?error=${encodeURIComponent("این نام کاربری قبلاً استفاده شده است")}`);
    }

    await prisma.adminUser.create({
        data: {
            userName,
            password: await bcrypt.hash(password, 10),
            userType: "user",
        },
    });

    redirect(`/ecommerce/Login?success=${encodeURIComponent("حساب کاربری با موفقیت ایجاد شد")}`);
}