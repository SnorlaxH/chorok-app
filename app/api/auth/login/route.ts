import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
    const body = await req.json()

    const apiRes = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    const data = await apiRes.json()

    if (!apiRes.ok) {
        return NextResponse.json(data, { status: apiRes.status })
    }

    const res = NextResponse.json({
        ...data,
    })

    res.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
    })

    res.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 14,
    })

    return res
}