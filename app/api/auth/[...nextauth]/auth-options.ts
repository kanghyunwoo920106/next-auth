import type { AuthOptions, DefaultUser } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as z from "zod";

// 로그인 시 사용할 유효성 검사 스키마 정의
const loginSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
});

// interface User extends DefaultUser {
//   role: string;
// }

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "이메일을 입력해주세요",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "비밀번호를 입력해주세요",
        },
      },
      async authorize(credentials) {
        // 이메일 입력 확인
        if (!credentials?.email) {
          throw new Error("이메일을 입력해주세요.");
        }

        // 비밀번호 입력 확인
        if (!credentials?.password) {
          throw new Error("비밀번호를 입력해주세요.");
        }

        // 입력값 검증
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          const errors = validatedFields.error.errors;
          const firstError = errors[0];
          throw new Error(firstError?.message || "입력값이 올바르지 않습니다.");
        }

        // 이메일 검증
        if (credentials.email !== "hyunwoo@test.com") {
          throw new Error("이메일이 일치하지 않습니다.");
        }

        // 비밀번호 검증
        if (credentials.password !== "12345678!") {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        return {
          id: "1",
          email: credentials.email,
          name: "Test User",
          role: "admin",
        };
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
