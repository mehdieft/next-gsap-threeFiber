// app/actions/userActions.js
'use server';  // ← Move this to the VERY TOP of the file

import { revalidatePath } from 'next/cache';
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';  // ← FIXED: Correct import path

export const createUser = async (formData) => {
    "use server"
    const data = {
        userName: formData.get('username'),  // ← Also fix: 'userName' → 'username'
        userType: formData.get('userType'),
        password: formData.get('password')
    };
    
    await prisma.adminUser.create({
        data
    });
    
    revalidatePath('/ecommerce/user');
    redirect('/ecommerce/user');
};