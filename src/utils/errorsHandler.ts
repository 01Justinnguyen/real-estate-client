import { EntityError } from '@/app/http'
import { createStandaloneToast } from '@chakra-ui/react'
import { UseFormSetError } from 'react-hook-form'

export const handleErrorApi = ({
  errors,
  setError,
  duration
}: {
  errors: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  const { toast } = createStandaloneToast()
  if (errors instanceof EntityError && setError) {
    errors.payload.errors.forEach((error) =>
      setError(error.path, {
        type: 'server',
        message: error.message
      })
    )
  } else {
    toast({
      title: 'Lỗi.',
      description: errors?.payload?.message ?? 'Lỗi không xác định',
      status: 'error',
      position: 'top-right',
      duration: duration ?? 4500,
      isClosable: true
    })
  }
}
