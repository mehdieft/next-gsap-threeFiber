// app/actions/userActions.js
'use server';

import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';

const MIN_PASSWORD_LENGTH = 6;
const PASSWORD_POLICY_MESSAGE =
    `Password must be between ${MIN_PASSWORD_LENGTH} and 72 characters.`;

function validateStrongPassword(password) {
    return password.length >= MIN_PASSWORD_LENGTH && password.length <= 72;
}

function hashPassword(plainPassword) {
    const saltRounds = 10;
    return bcrypt.hashSync(plainPassword, saltRounds);
}

export const createUser = async (formData) => {
    const userName = String(formData.get('username') || '').trim();
    const userType = String(formData.get('userType') || 'user').trim();
    const password = String(formData.get('password') || '');
    const confirmPassword = String(formData.get('confirmPassword') || '');

    if (!userName || userName.length < 3) {
        redirect(`/ecommerce/user/create?error=${encodeURIComponent('Username must be at least 3 characters.')}`);
    }

    if (!password || !confirmPassword) {
        redirect(`/ecommerce/user/create?error=${encodeURIComponent('Password and repeat password are required.')}`);
    }

    if (password !== confirmPassword) {
        redirect(`/ecommerce/user/create?error=${encodeURIComponent('Password and repeat password do not match.')}`);
    }

    if (!validateStrongPassword(password)) {
        redirect(`/ecommerce/user/create?error=${encodeURIComponent(PASSWORD_POLICY_MESSAGE)}`);
    }

    const findIfUsernameUsed = await prisma.adminUser.findUnique({
        where: { userName },
    });

    if (findIfUsernameUsed) {
        redirect(`/ecommerce/user/create?error=${encodeURIComponent('Username already exists.')}`);
    }

    await prisma.adminUser.create({
        data: {
            userName,
            userType,
            password: hashPassword(password),
        },
    });

    revalidatePath('/ecommerce/user');
    redirect('/ecommerce/user?success=' + encodeURIComponent('User created successfully'));
};

export const updateUserAction = async (id, formData) => {
    const userId = Number(id);
    const user = await prisma.adminUser.findUnique({
        where: { id: userId },
    });

    if (!user) {
        redirect(`/ecommerce/user/edit/${id}?error=${encodeURIComponent('User not found.')}`);
    }

    const userName = String(formData.get('username') || '').trim();
    const userType = String(formData.get('userType') || 'user').trim();
    const password = String(formData.get('password') || '');
    const confirmPassword = String(formData.get('confirmPassword') || '');
    const wantsPasswordUpdate = password.trim() !== '' || confirmPassword.trim() !== '';

    if (!userName || userName.length < 3) {
        redirect(`/ecommerce/user/edit/${id}?error=${encodeURIComponent('Username must be at least 3 characters.')}`);
    }

    const duplicatedUserName = await prisma.adminUser.findFirst({
        where: {
            userName,
            id: { not: userId },
        },
    });

    if (duplicatedUserName) {
        redirect(`/ecommerce/user/edit/${id}?error=${encodeURIComponent('Username already exists.')}`);
    }

    const data = { userName, userType };

    if (wantsPasswordUpdate) {
        if (!password || !confirmPassword) {
            redirect(`/ecommerce/user/edit/${id}?error=${encodeURIComponent('Enter both password fields to update password.')}`);
        }

        if (password !== confirmPassword) {
            redirect(`/ecommerce/user/edit/${id}?error=${encodeURIComponent('Password and repeat password do not match.')}`);
        }

        if (!validateStrongPassword(password)) {
            redirect(`/ecommerce/user/edit/${id}?error=${encodeURIComponent(PASSWORD_POLICY_MESSAGE)}`);
        }

        data.password = hashPassword(password);
    }

    await prisma.adminUser.update({
        where: { id: userId },
        data,
    });

    revalidatePath('/ecommerce/user');
    redirect('/ecommerce/user?success=' + encodeURIComponent('User updated successfully'));

};

export const deleteUser = async (id) => {
    await prisma.adminUser.delete({
        where: { id },
    });

    revalidatePath('/ecommerce/user');
    redirect(`/ecommerce/user?success=${encodeURIComponent('User deleted successfully')}`);
};
export const LoginUser = async (formData) => {
    const userName = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '');
}