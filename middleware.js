import { NextResponse } from 'next/server'
export async function middleware(req, res) {
  const { pathname } = req.nextUrl
  const protocol = req.headers.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${req.headers.get('host')}`
  let response = NextResponse.next()
  response.headers.append('x-app-base-url', baseUrl)
  if (pathname === '/') {
    return NextResponse.redirect(`${baseUrl}/login`)
  }
  return response
}
export const config = {
  matcher: ['/', '/login', '/home', '/travel']
}
