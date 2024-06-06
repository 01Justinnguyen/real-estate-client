import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-current-path', request.nextUrl.pathname)
  return NextResponse.next({ headers })
}

// See "Matching Paths" below to learn more
export const config = {
  // Quy định bắt buộc: có cái gì khai báo cái đó, không thực hiện tính toán ở trong config
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
