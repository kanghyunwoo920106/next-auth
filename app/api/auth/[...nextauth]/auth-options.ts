import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

// 로그인 시 사용할 유효성 검사
const loginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

interface ValidType {
  email: string;
  password: string;
}

// 인증 처리 함수
const validateCredentials = (credentials: ValidType | undefined) => {
  try {
    // Zod를 사용한 유효성 검사
    const validatedCredentials: ValidType = loginSchema.parse(credentials);

    // 이메일과 비밀번호 검증
    if (validatedCredentials.email !== "hyunwoo@test.com") {
      throw new Error("이메일이 일치하지 않습니다.");
    }
    if (validatedCredentials.password !== "12345678!") {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    return {
      id: "1",
      email: validatedCredentials.email,
      name: "강현우",
      role: "사용자",
      image: "https://github.com/shadcn.png",
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "유효성 검사 실패");
    }
    throw new Error("유효성 검사 실패");
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "이메일을 입력해주세요." },
        password: { label: "Password", type: "password", placeholder: "비밀번호를 입력해주세요." },
      },
      async authorize(credentials: ValidType | undefined) {
        try {
          const user = validateCredentials(credentials as ValidType);
          return user;

          // 백엔드 연동 시 사용할 코드
          // 1. 클라이언트 유효성 검사
          // const validatedCredentials = loginSchema.parse(credentials);

          // // 2. 백엔드 API로 로그인 요청
          // const res = await fetch("https://your-backend.com/api/auth/login", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(validatedCredentials),
          // });

          // if (!res.ok) {
          //   const errorResponse = await res.json();
          //   throw new Error(errorResponse.message || "백엔드 인증 실패");
          // }

          // // 3. 백엔드 응답 확인
          // const user = await res.json();

          // // 백엔드 유효성 검사 추가
          // if (!user || !user.accessToken || !user.refreshToken) {
          //   throw new Error("백엔드 응답이 올바르지 않습니다.");
          // }

          // // 4. 사용자 정보 반환
          // return {
          //   id: user.id,
          //   email: user.email,
          //   name: user.name,
          //   role: user.role,
          //   image: user.image,
          //   accessToken: user.accessToken,
          //   refreshToken: user.refreshToken,
          // };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("인증 실패");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // JWT 방식으로 세션 관리
    maxAge: 30 * 60, // 30분
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        // session.user.image = token.image as string;

        // 백엔드 연동 시 사용할 코드
        // session.user.accessToken = token.accessToken as string;
        // session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
