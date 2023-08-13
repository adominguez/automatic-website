import { useEffect } from 'react'
import {
  Button, Typography
} from '@/app/components/MaterialComponents'
import Dropzone from "dropzone";
import 'dropzone/dist/dropzone.css'

const ManageImageDropzone = ({handlerSuccesUpload}) => {
  useEffect(() => {
    const dropzone = new Dropzone(`#dropzoneForm`, {
      uploadMultiple: false,
      acceptedFiles: '.png,.jpg,.webp',
      maxFiles: 1
    })

    dropzone.on('sending', (file, xhr, formData) => {
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
      formData.append('timestamp', (Date.now() / 1000))
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
    })

    dropzone.on('success', (file, response) => {
      handlerSuccesUpload(response)
    })

    dropzone.on('error', (file, response) => {
      console.log(response)
    })
  }, [])

  return (
  <form id="dropzoneForm" className='flex flex-col items-center justify-center w-full border-2 border-dashed rounded-md shadow-md border-blue-gray-500 aspect-video'
    action={`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`}>
    <Typography variant="h5" color="blue-gray">
      Arrastra los archivos para subirlos
    </Typography>
    <Button className="m-2 pointer-events-none" color="blue-gray">
      Seleccionar archivos
    </Button>
  </form>)
}

export default ManageImageDropzone