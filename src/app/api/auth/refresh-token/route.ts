import authApiRequest from '@/apis/auth'
import { HttpError } from '@/app/http'
import { serialize } from 'cookie'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const refreshToken = cookies().get('refreshToken')?.value

  if (!refreshToken) {
    return new NextResponse(
      JSON.stringify({
        message: 'Không nhận được token'
      }),
      { status: 400 }
    )
  }

  try {
    const res = await authApiRequest.refreshTokenFromNextServerToServer(refreshToken)
    console.log('🐻 ~ POST ~ res:', res)
    const new_access_token = res.payload.data.new_access_token
    const new_refresh_token = res.payload.data.new_refresh_token
    const new_access_token_expiresAt = new Date(res.payload.data.access_token_expiresAt)
    const new_refresh_token_expiresAt = new Date(res.payload.data.refresh_token_expiresAt)

    // Accesstoken cookie
    const accessTokenCookie = serialize('accessToken', new_access_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      expires: new_access_token_expiresAt
    })

    // // Refreshtoken cookie
    const refreshTokenCookie = serialize('refreshToken', new_refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      expires: new_refresh_token_expiresAt
    })

    const headers = new Headers()
    headers.append('Set-Cookie', accessTokenCookie)
    headers.append('Set-Cookie', refreshTokenCookie)

    return new NextResponse(JSON.stringify(res.payload), {
      status: 200,
      headers: headers
    })
  } catch (error) {
    if (error instanceof HttpError) {
      return new NextResponse(JSON.stringify(error.payload), {
        status: error.status
      })
    } else {
      return new NextResponse(JSON.stringify({ message: 'Lỗi không xác định' }))
    }
  }
}
