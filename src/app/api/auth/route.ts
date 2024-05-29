export async function POST(request: Request) {
  const res = await request.json()
  const refreshToken = res.payload?.data?.refresh_token
  const expiresDate = res.payload?.data?.refresh_token_expiresAt
  if (!refreshToken) {
    return Response.json(
      {
        message: 'Không nhận được token'
      },
      {
        status: 400
      }
    )
  }
  return Response.json(res.payload, {
    status: 200,
    headers: {
      'Set-Cookie': `refreshToken=${refreshToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`
    }
  })
}
