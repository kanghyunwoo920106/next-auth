"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
export default function RemainSession() {
    const { data: session } = useSession()
    const [remainingTime, setRemainingTime] = useState(0)

    useEffect(() => {
        if (session?.expires) {
            const expirationTime = new Date(session.expires).getTime()
            const interval = setInterval(() => {
                const currentTime = Date.now()
                const timeLeft = expirationTime - currentTime

                if (timeLeft <= 0) {
                    clearInterval(interval) // 세션이 만료되면 카운터를 멈춤
                } else {
                    setRemainingTime(timeLeft)
                }
            }, 1000)

            return () => clearInterval(interval) // 컴포넌트가 언마운트될 때 interval을 정리
        }
    }, [session?.expires])

    const formatTime = (time: number) => {
        const seconds = Math.floor((time / 1000) % 60)
        const minutes = Math.floor((time / 1000 / 60) % 60)

        return `${minutes}분 ${seconds}초`
    }

    return <div className="text-base text-gray-500 me-3">
        {session ? (
            <div>
                {formatTime(remainingTime)}     
            </div>
        ) : (
            <div>
                <p>세션이 만료되었습니다.</p>
            </div>
        )}
    </div>
}