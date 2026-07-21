// app/actions/userActions.js
'use server';  // ← Move this to the VERY TOP of the file

import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt'
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';  // ← FIXED: Correct import path

export const createUser = async (formData) => {
    "use server"
    const salt = bcrypt.genSaltSync(5)
    const hashedPassword = bcrypt.hashSync(formData.get('password'), salt)

    const data = {
        userName: formData.get('username'),  // ← Also fix: 'userName' → 'username'
        userType: formData.get('userType'),
        password: hashedPassword
    };
    const findIfUsernameUsed = await prisma.adminUser.findUnique({
        where: { userName: data.userName }
    })
    if (findIfUsernameUsed) redirect('/ecommerce/user/create?error=username-exists')

    await prisma.adminUser.create({
        data
    });

    revalidatePath('/ecommerce/user');
    redirect('/ecommerce/user');
};

export const updateUserAction = async (id, formData) => {
    console.log('______>', formData);
    const user = await prisma.adminUser.findUnique({
        where: { id }
    })
    if(!user)redirect(`/ecommerce/user/edit/${id}/?error=${encodeURIComponent('کاربر پیدا نشد')}`)
    const userName = formData.get('username')
    const userType = formData.get('userType')
    const password = formData.get('password')
    const confirmedPass = formData.get('confirmPassword')

    //check the username exists?
    const duplicatedUserName = await prisma.adminUser.findFirst({
        where: {
            userName,
            id: { not: id }
        }
    })
    const data={userName,userType}
    if (duplicatedUserName) redirect(`/ecommerce/user/edit/${id}/?error= نام کاربری تکراری است`)
    if (password !== '') {
        if (password.length < 8) redirect(`/ecommerce/user/edit/${id}/?error= ${encodeURIComponent("password must at least 8 charactors")}`)
        if (password !== confirmedPass) {
            redirect(`/ecommerce/user/edit/${id}/?error= password and confirm password not same`)
        }
        const salt = bcrypt.genSaltSync(5)
        data.password = bcrypt.hashSync(password, salt)
    }
    await prisma.adminUser.update({
        where:{id},
        data
    })
     revalidatePath('/ecommerce/user');
    redirect('/ecommerce/user')



}