import http from '@/app/http'
import { GetMeProfileResType } from '@/schemaValidations/client.schema'

const accountApiRequest = {
  getMeServer: (token: string) =>
    http.get<GetMeProfileResType>('/v1/client/getMeProfile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  getMeProfile: () => http.get<GetMeProfileResType>('/v1/client/getMeProfile')
}

export default accountApiRequest
