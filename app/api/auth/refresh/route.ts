import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
        return NextResponse.json(
            { message: 'refreshToken 없음' },
            { status: 401 }
        )
    }

    const apiRes = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refreshToken,
        }),
    })

    const data = await apiRes.json()

    if (!apiRes.ok) {
        const res = NextResponse.json(data, {
            status: apiRes.status,
        })

        res.cookies.delete('accessToken')
        res.cookies.delete('refreshToken')

        return res
    }

    const res = NextResponse.json({
        message: '토큰 재발급 완료',
    })

    res.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
    })

    return res
}