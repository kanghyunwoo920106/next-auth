'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type ErrorType = {
    email: string | null
    password: string | null
}

export default function SignView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<ErrorType>({
        email: null,
        password: null,
    });
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({
            email: null,
            password: null
        })

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })
        if (result?.error) {
            // setErrors(result.error);
        } else {
            router.push("/main");
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-sm mx-auto p-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력해주세요" />
                        {errors?.email}
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력해주세요" />
                    </div>
                    <Button className="w-full mt-4 bg-slate-200" type="submit">로그인</Button>
                </form>
            </div>
        </div>
    );
}
