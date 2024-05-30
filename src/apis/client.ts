import http from '@/app/http'

const accountApiRequest = {
  getMeProfile: () => http.get('/v1/client/getMeProfile')
}

export default accountApiRequest
