import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value

    const isLoginPage = req.nextUrl.pathname === '/login'

    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico|images).*)'],
}