import { cookies } from "next/headers";

export async function setCookie(name, value, options = {}) {
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    ...options,
  };

  cookieStore.set(name, value, cookieOptions);
}

export async function getCookie(name) {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(name);

  return cookie?.value ?? null;
}