import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isHomePage = request.nextUrl.pathname === '/'
  console.log(`Path: ${request.nextUrl.pathname}, IsHomePage: ${isHomePage}`)
  const response = NextResponse.next()
  response.headers.set('x-is-home-page', isHomePage.toString())
  return response
}

// See "Matching Paths" below to learn more
export const config = {
  // Quy định bắt buộc: có cái gì khai báo cái đó, không thực hiện tính toán ở trong config
  matcher: ['/']
}
