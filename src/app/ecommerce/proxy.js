import { NextResponse } from "next/server";
import { verifyJWT } from "../lib/utils";

const LOGIN_PATH = "/ecommerce/Login";
const USER_HOME_PATH = "/ecommerce/homePage";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("jwt_token")?.value;
  const user = token ? await verifyJWT(token) : false;

  if (pathname === USER_HOME_PATH) {
    return NextResponse.next();
  }

  if (pathname === LOGIN_PATH) {
    if (user) {
      return NextResponse.redirect(new URL("/ecommerce", request.url));
    }

    return NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL(USER_HOME_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ecommerce/:path*"],
};