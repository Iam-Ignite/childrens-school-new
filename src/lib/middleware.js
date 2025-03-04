import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAuthenticated = request.cookies.get('auth_token') // Replace with your auth check
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
