import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const API_BASE_URL = process.env.API_BASE_URL

type Context = {
    params: Promise<{
        path: string[]
    }>
}

async function proxyHandler(req: NextRequest, context: Context) {
    if (!API_BASE_URL) {
        return NextResponse.json(
            { message: 'API_BASE_URL is not configured' },
            { status: 500 }
        )
    }

    const { path } = await context.params

    const targetUrl = new URL(path.join('/'), API_BASE_URL)

    req.nextUrl.searchParams.forEach((value, key) => {
        targetUrl.searchParams.set(key, value)
    })

    const headers = new Headers(req.headers)

    headers.delete('host')
    headers.delete('connection')

    // 필요하면 백엔드 인증 토큰 추가
    if (process.env.API_TOKEN) {
        headers.set('Authorization', `Basic ${Buffer.from(process.env.API_TOKEN).toString('base64')}`)
    }

    const body =
        req.method === 'GET' || req.method === 'HEAD'
            ? undefined
            : await req.arrayBuffer()

    const response = await fetch(targetUrl.toString(), {
        method: req.method,
        headers,
        body,
        cache: 'no-store',
    })

    const responseHeaders = new Headers(response.headers)

    responseHeaders.delete('content-encoding')
    responseHeaders.delete('transfer-encoding')

    return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
    })
}

export const GET = proxyHandler
export const POST = proxyHandler
export const PUT = proxyHandler
export const PATCH = proxyHandler
export const DELETE = proxyHandler