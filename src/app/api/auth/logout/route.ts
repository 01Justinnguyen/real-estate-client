import authApiRequest from '@/apis/auth'
import { HttpError } from '@/app/http'
import { serialize } from 'cookie'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()
  const force = res.force as boolean
  const deleteCookie = (name: string) =>
    serialize(name, '', {
      expires: new Date(0),
      path: '/'
    })

  if (force) {
    const headers = new Headers()
    headers.set('Set-Cookie', deleteCookie('accessToken'))
    headers.append('Set-Cookie', deleteCookie('refreshToken'))

    return new NextResponse(JSON.stringify({ message: 'Buộc đăng xuất thành công' }), {
      status: 200,
      headers
    })
  }

  const accessToken = cookies().get('accessToken')?.value
  const refreshToken = cookies().get('refreshToken')?.value

  if (!accessToken || !refreshToken) {
    return new NextResponse(
      JSON.stringify({
        message: 'Không nhận được token'
      }),
      { status: 400 }
    )
  }

  try {
    const result = await authApiRequest.logoutFromNextServerToServer({ accessToken, refreshToken })

    const headers = new Headers()
    headers.set('Set-Cookie', deleteCookie('accessToken'))
    headers.append('Set-Cookie', deleteCookie('refreshToken'))

    return new NextResponse(JSON.stringify(result.payload.message), {
      status: 200,
      headers
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
