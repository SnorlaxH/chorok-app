'use client'

import { useEffect, useState } from 'react'

import { create } from 'zustand'

type AuthStore = {
    token: string | null
    isLogin: boolean
    login: (token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: null,
    isLogin: false,

    login: (token) =>
        set({
            token,
            isLogin: true,
        }),

    logout: () =>
        set({
            token: null,
            isLogin: false,
        }),
}))

export const useIsMobile = (width: number = 1024) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < width)
        }

        checkMobile()

        window.addEventListener('resize', checkMobile)

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [width])

    return isMobile
}