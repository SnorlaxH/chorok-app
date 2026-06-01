import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST() {
    const res = NextResponse.json({
        success: true,
    })

    res.cookies.delete('accessToken')
    res.cookies.delete('refreshToken')

    return res
}