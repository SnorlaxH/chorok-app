'use client'

import { useAuthStore } from '@/hooks/core'
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function HeaderClient() {
    const { isLogin, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
        });

        logout();

        router.refresh()
    }

    return (
        <>

            {!isLogin ? <Link href="/login" className="w-full flex items-center gap-2 text-xs text-zinc-400 text-left hover:text-(--sub-color)">관리자</Link> :
                <div className="w-full flex items-center gap-2 text-xs text-zinc-400 text-left hover:text-(--sub-color)">
                    <button type="button" onClick={handleLogout} className="w-full flex items-center gap-2 text-xs text-zinc-400 text-left hover:text-(--sub-color) cursor-pointer">로그아웃</button>
                </div>
            }
        </>
    )
}