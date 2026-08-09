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
    const isvalidPassword = await bcrypt.compare(data.password, user?.password);

    if (!user || !isvalidPassword){
        
        redirect(`/ecommerce/Login?error=${encodeURIComponent('نام کاربری یا رمز عبور اشتباه است')}`);
    }
    const token= await createJWT(user);
    await setCookie('jwt_token', token, { maxAge: 2 * 60 * 60 });


}