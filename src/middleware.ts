import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePath = ['']
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  // Quy định bắt buộc: có cái gì khai báo cái đó, không thực hiện tính toán ở trong config
  matcher: ['/login', '/register']
}
