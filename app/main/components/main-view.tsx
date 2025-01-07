"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MainView() {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400" onClick={handleLogout}>로그아웃</Button>
    </div>
  );
}
