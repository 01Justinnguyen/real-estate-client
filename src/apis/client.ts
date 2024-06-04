import http from '@/app/http'

const accountApiRequest = {
  getMeServer: (token: string) =>
    http.get('/v1/client/getMeProfile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  getMeProfile: () => http.get('/v1/client/getMeProfile')
}

export default accountApiRequest
