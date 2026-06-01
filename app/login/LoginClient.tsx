'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthStore } from '@/hooks/core'

export default function LoginClient() {
    const router = useRouter()
    const { login } = useAuthStore()


    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const res = await fetch('api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password })
        });
        if (res.status === 200) {
            const { user } = await res.json();

            login(user);

            router.replace('/')
            router.refresh()
        }
        else {
            alert('로그인에 실패했습니다.');
        }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
            return;
        }
        setPassword(e.currentTarget.value)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8 border-(-border-gray) rounded bg-white">
            <Image src="/images/logo.png" alt="Logo" width={80} height={40} loading="eager" />
            <input type="text" onKeyUp={(e) => setId(e.currentTarget.value)} className="rounded-lg border-2 px-2 py-1 border-zinc-200" placeholder="아이디" />
            <input type="password" onKeyUp={(e) => handleKeyUp(e)} className="rounded-lg border-2 px-2 py-1 border-zinc-200" placeholder="패스워드" />
            <button type="button" onClick={() => handleLogin()} className="w-full py-2 rounded bg-(--main-deep-color) text-white cursor-pointer">로그인</button>
        </div>
    )
}