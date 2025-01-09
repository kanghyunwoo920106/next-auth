import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!req.nextauth.token;

    // 로그인된 사용자가 /login으로 접근하면 /main으로 리디렉션
    if (pathname.startsWith("/login") && isAuthenticated) {
      return NextResponse.redirect(new URL("/main", req.url));
    }

    // 로그인된 사용자가 /로 접근하면 /main으로 리디렉션
    if (pathname.startsWith("/") && pathname === "/" && isAuthenticated) {
      return NextResponse.redirect(new URL("/main", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // 인증 여부 확인 함수
        const isAuthenticated = !!token;

        // 로그인 페이지 처리
        if (pathname.startsWith("/login")) {
          return !isAuthenticated; // 인증되지 않은 사용자만 허용
        }

        // 보호된 페이지 처리
        return isAuthenticated; // 인증된 사용자만 허용
      },
    },
    pages: {
      signIn: "/login", // 인증되지 않은 사용자는 `/login`으로 리디렉션
    },
  }
);

export const config = {
  matcher: ["/main/:path*", "/login", "/", "/:path*"], // 보호된 경로와 로그인 페이지
};