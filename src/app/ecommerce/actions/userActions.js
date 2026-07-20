// app/actions/userActions.js
'use server';  // ← Move this to the VERY TOP of the file

import { revalidatePath } from 'next/cache';
 import bcrypt from 'bcrypt'
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';  // ← FIXED: Correct import path

export const createUser = async (formData) => {
    "use server"
    const salt=bcrypt.genSaltSync(5)
    const hashedPassword=bcrypt.hashSync(formData.get('password'),salt)
   
    const data = {
        userName: formData.get('username'),  // ← Also fix: 'userName' → 'username'
        userType: formData.get('userType'),
        password: hashedPassword
    };
    
    await prisma.adminUser.create({
        data
    });
    
    revalidatePath('/ecommerce/user');
    redirect('/ecommerce/user');
};

export const updateUserAction=async(id,formData)=>{
    console.log('______________________>',id);

}