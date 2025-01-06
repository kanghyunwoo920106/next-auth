"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type ErrorType = {
  email: string | null;
  password: string | null;
};

export default function SignView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType | null>({
    email: null,
    password: null,
  });
  const router = useRouter();

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
  };

  const handleSign = () => {
    router.push("/signup");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-sm mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
              />

              {errors?.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
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
          <Button
            className="w-full mt-2 bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
            type="button"
            onClick={handleSign}
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}
