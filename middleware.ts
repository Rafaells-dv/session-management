import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value

    if (session && !request.nextUrl.pathname.startsWith('/profile')) {
        return Response.redirect(new URL('/profile', request.url))
    } 
    
    if (!session && request.nextUrl.pathname.startsWith('/profile')){
        return Response.redirect(new URL('/login', 'http://localhost:3000/login'))
    }

    if (!session && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|).*)',
    ],
}