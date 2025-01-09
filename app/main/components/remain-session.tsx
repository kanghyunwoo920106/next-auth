"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function RemainSession() {
    const { data: session } = useSession()
    const [remainingTime, setRemainingTime] = useState(0)

    useEffect(() => {
        // 페이지 로드 시, localStorage에 저장된 남은 시간을 먼저 가져옴
        const savedTime = localStorage.getItem("remainingTime")

        if (savedTime) {
            setRemainingTime(Number.parseInt(savedTime, 10))
        } else if (session?.expires) {
            const expirationTime = new Date(session.expires).getTime()
            const initialTime = expirationTime - Date.now()

            // 남은 시간이 0 이하일 경우, 초기화
            setRemainingTime(initialTime > 0 ? initialTime : 0)
            localStorage.setItem("remainingTime", initialTime.toString()) // 초기 시간 저장
        }
    }, [session?.expires]) // session.expires가 변경될 때만 실행

    useEffect(() => {
        if (remainingTime <= 0) return;

        const interval = setInterval(() => {
            const timeLeft = remainingTime - 1000

            if (timeLeft <= 0) {
                clearInterval(interval) // 세션이 만료되면 카운터를 멈춤
                localStorage.removeItem("remainingTime") // 남은 시간 초기화
            } else {
                setRemainingTime(timeLeft)
                localStorage.setItem("remainingTime", timeLeft.toString()) // 남은 시간 저장
            }
        }, 1000)

        return () => clearInterval(interval) // 컴포넌트가 언마운트될 때 interval을 정리
    }, [remainingTime]) // remainingTime이 변경될 때마다 실행

    const formatTime = (time: number) => {
        const seconds = Math.floor((time / 1000) % 60)
        const minutes = Math.floor((time / 1000 / 60) % 60)

        return `${minutes}분 ${seconds}초`
    }

    return (
        <div className="text-base text-gray-500 me-3">
            {session ? (
                remainingTime > 0 ? (
                    <div>{formatTime(remainingTime)}</div>
                ) : (
                    <div>
                        <p>세션이 만료되었습니다.</p>
                    </div>
                )
            ) : (
                <div>
                    <p>세션이 만료되었습니다.</p>
                </div>
            )}
        </div>
    )
}
