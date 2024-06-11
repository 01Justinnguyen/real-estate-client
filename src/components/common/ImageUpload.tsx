'use client'

import { Button, Image } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

interface ImageUploadProps {
  image?: File | null
  className?: string
  handleDeleteImage?: () => void
  imageUrl?: string // URL của hình ảnh mặc định
  onChange: (file: File | null) => void
}

export default function ImageUpload({ image, className, handleDeleteImage, onChange, imageUrl }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null) // Tạo một tham chiếu đến phần tử input

  useEffect(() => {
    if (image && inputRef.current) {
      inputRef.current.value = '' // Reset giá trị của input khi image thay đổi
    }
  }, [image])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null // Lấy file đầu tiên được chọn hoặc null
    onChange(file) // Gọi hàm onChange truyền từ parent component
  }
  return (
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed h-[200px] w-[200px] relative overflow-hidden group ${className}`}
    >
      {!image && (
        <input
          type='file'
          name='upload'
          className='hidden-input'
          accept='image/*'
          ref={inputRef} // Gán tham chiếu vào phần tử input
          onChange={handleChange} // Gọi hàm handleChange khi người dùng chọn file
        />
      )}

      {!image && (
        <div className='flex flex-col items-center text-center pointer-events-none'>
          <Image src='/images/img-upload.png' alt='upload-img' className='max-w-[80px] mb-5 object-cover' />
          <p className='font-semibold'>Choose photo</p>
        </div>
      )}

      {image && (
        <>
          <Image src={URL.createObjectURL(image)} alt='image' className='object-cover w-full h-full ' />
          <Button
            type='button'
            className='absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:visible group-hover:opacity-100'
            onClick={handleDeleteImage}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </Button>
        </>
      )}

      {/* {!image && imageUrl && (
        <>
          <Image src={imageUrl} alt='image' className='object-cover w-full h-full ' />
          <Button
            type='button'
            className='absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:visible group-hover:opacity-100'
            onClick={handleDeleteImage}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </Button>
        </>
      )} */}
      <div className='absolute w-0 h-1 bg-green-400 bottom-0 left-0 transition-all'></div>
    </label>
  )
}
