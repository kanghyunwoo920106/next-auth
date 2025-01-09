"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Icons } from "@/components/ui/icons"
import { useSession, signOut } from "next-auth/react"

export function UserNav() {
  const { data: session } = useSession()

  if (!session) return null

  const handleSignOut = () => {
    // 로그아웃 시 localStorage의 remainingTime 제거
    localStorage.removeItem("remainingTime")
    signOut({ callbackUrl: "/" })  // 로그아웃 후 리디렉션
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={session.user?.image ?? ""} alt={session.user?.name ?? ""} />
            <AvatarFallback>{session.user?.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-56 bg-white' align='end' forceMount>
        <div className='flex flex-col space-y-1'>
            <p className='font-medium text-sm leading-none'>{session.user?.name}</p>
            <p className='text-muted-foreground text-xs leading-none'>{session.user?.email}</p>
            <Button className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400" onClick={handleSignOut}>
                <Icons.logout size={16} className='mr-2' />로그아웃
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
