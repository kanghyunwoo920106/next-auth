"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod"; // Zod 임포트

type ErrorType = {
  email: string | null;
  password: string | null;
};

// 로그인 시 사용할 Zod 유효성 검사 스키마
const loginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType | null>({
    email: null,
    password: null,
  });
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (email) {
      setErrors((prev) => ({
        ...prev,
        email: null,
        password: prev?.password ?? null,
      }));
    }
    if (password) {
      setErrors((prev) => ({
        ...prev,
        password: null,
        email: prev?.email ?? null,
      }));
    }
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      email: null,
      password: null,
    });

    try {
      // Zod 유효성 검사
      loginSchema.parse({ email, password });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        if (result.error.includes("이메일")) {
          setErrors((prev) => ({
            ...prev,
            email: result.error,
            password: prev?.password ?? null,
          }));
        } else if (result.error.includes("비밀번호")) {
          setErrors((prev) => ({
            ...prev,
            password: result.error,
            email: prev?.email ?? null,
          }));
        } else {
          console.error(result.error);
        }
      } else {
        router.push("/main");
      }
    } catch (error: any) {
      // Zod 유효성 검사 오류 처리
      if (error instanceof z.ZodError) {
        const newErrors: ErrorType = { email: null, password: null };
      
        error.errors.forEach((err) => {
          if (err.path[0] === "email") {
            newErrors.email = err.message;
          } else if (err.path[0] === "password") {
            newErrors.password = err.message;
          }
        });
      
        setErrors(newErrors);
      }
    }
  };

  const handleSign = () => {
    router.push("/signup");
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full max-w-sm bg-white rounded-md p-6">
          <h2 className="text-lg font-bold">로그인</h2>
          <p className="text-sm mb-4">이메일과 비밀번호로 로그인해주세요.</p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요"
                  required
                  value={email}
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                  required
                  value={password}
                />
                {errors?.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>
            <Button
              className="w-full mt-4 bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
              type="submit"
            >
              로그인
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
