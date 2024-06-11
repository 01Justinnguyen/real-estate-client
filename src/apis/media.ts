import http from '@/app/http'

const mediaApiRequest = {
  uploadAvatar: (file: FormData) =>
    http.post<{
      message: string
      data: string
    }>('v1/medias/upload-avatar', file)
}

export default mediaApiRequest
