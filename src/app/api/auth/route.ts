import { serialize } from 'cookie'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()
  console.log('🐻 ~ POST ~ res:', res)
  const accessToken = res.accessToken
  const refreshToken = res.refreshToken
  const accessExpiresDate = res.accessExpiresDate
  const refreshExpiresDate = res.refreshExpiresDate

  if (!accessToken || !refreshToken) {
    return new NextResponse(
      JSON.stringify({
        message: 'Không nhận được token'
      }),
      { status: 400 }
    )
  }

  // Accesstoken cookie
  const accessTokenCookie = serialize('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(refreshExpiresDate)
  })

  // Refresh token cookie
  const refreshTokenCookie = serialize('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(accessExpiresDate)
  })

  const headers = new Headers()
  headers.append('Set-Cookie', accessTokenCookie)
  headers.append('Set-Cookie', refreshTokenCookie)

  const response = new NextResponse(JSON.stringify(res), {
    status: 200,
    headers: headers
  })

  return response
}
