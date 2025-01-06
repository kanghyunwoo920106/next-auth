import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// 인증 필요한 페이지 설정
export const config = {
  matcher: ["/", "/main/:path*", "/login"],
};

export default async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/main", req.url));
  }

  return NextResponse.next();
}
