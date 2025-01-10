import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

// 로그인 시 사용할 유효성 검사
const loginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

// 인증 처리 함수
const validateCredentials = (credentials: { email?: string; password?: string }) => {
  try {
    // Zod를 사용한 유효성 검사
    const validatedCredentials = loginSchema.parse(credentials);

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
    throw new Error(error.message || "유효성 검사 실패");
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = validateCredentials(credentials);
          return user;
        } catch (error) {
          throw new Error(error.message);
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
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
