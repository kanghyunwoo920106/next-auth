import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// 로그인 시 사용할 유효성 검사
const validateCredentials = (credentials: { email?: string; password?: string }) => {
  if (!credentials?.email) throw new Error("이메일을 입력해주세요.");
  if (!credentials?.password) throw new Error("비밀번호를 입력해주세요.");
  
  // 이메일과 비밀번호 검증
  if (credentials.email !== "hyunwoo@test.com") throw new Error("이메일이 일치하지 않습니다.");
  if (credentials.password !== "12345678!") throw new Error("비밀번호가 일치하지 않습니다.");
  
  return {
    id: "1",
    email: credentials.email,
    name: "강현우",
    role: "사용자",
    image: "https://github.com/shadcn.png",
  };
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
