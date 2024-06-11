import http from '@/app/http'
import { GetMeProfileResType, UpdateProfileBodyType } from '@/schemaValidations/client.schema'
import { MessageResType } from '@/schemaValidations/common.schema'

const accountApiRequest = {
  getMeServer: (token: string) =>
    http.get<GetMeProfileResType>('/v1/client/getMeProfile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  getMeProfile: () => http.get<GetMeProfileResType>('/v1/client/getMeProfile'),
  updateMeProfile: (body: UpdateProfileBodyType) => http.patch<MessageResType>('/v1/client/updateMeProfile', body)
}

export default accountApiRequest
