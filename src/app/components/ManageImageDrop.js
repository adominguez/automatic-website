'use client'
import React, { useState } from 'react'
import {
  Typography
} from '@/app/components/MaterialComponents'
import ManageImageList from './ManageImageList'

const ManageImageDrop = ({ onSelectImages }) => {
  const [images, setImages] = useState([])
  const [uploadProgress, setUploadProgress] = useState([])
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const newImages = [...images]
    const newUploadProgress = [...uploadProgress]

    for (let i = 0; i < files.length; i++) {
      newImages.push({ file: files[i] })
      newUploadProgress.push(0)
    }

    setImages(newImages)
    setUploadProgress(newUploadProgress)
    startUpload(newImages)
  }

  const uploadFile = async (file, index) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
    const folder = 'mi-carpeta'
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    formData.append('folder', folder)
    formData.append('context', JSON.stringify({ alt: file.name, public_id: `folder/${file.name}` }))

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          const newUploadProgress = [...uploadProgress]
          newUploadProgress[index] = percentCompleted
          setUploadProgress(newUploadProgress)
        }
      })

      const imageCreated = await response.json()
      setImages((oldImages) => oldImages.map((item, i) => ({
        ...(index === i ? imageCreated : item)
      })))

      const newUploadProgress = [...uploadProgress]
      newUploadProgress[index] = 100
      setUploadProgress(newUploadProgress)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const startUpload = async (newImages) => {
    setUploading(true)
    for (let i = 0; i < newImages.length; i++) {
      await uploadFile(newImages[i].file, i)
    }
    setUploading(false)
  }

  const clearImages = () => {
    setImages([])
    setUploadProgress([])
  }

  return (
    <div className="p-4">
      <div
        id="drop-area"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        className={`border-2 border-dashed ${dragging ? 'border-blue-gray-800 bg-blue-gray-200' : 'border-blue-gray-400'} p-8 text-center cursor-pointer relative transition-colors duration-300 flex flex-col justify-center items-center gap-4`}
      >
        <Typography variant="h5">Arrastra los archivos para subirlos</Typography>
        <label htmlFor="file-input" className="px-4 py-2 text-white rounded cursor-pointer bg-blue-gray-500 hover:bg-blue-gray-700">
          Subir archivos
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          id="file-input"
          className="hidden"
        />
      </div>
      <ManageImageList images={images} uploading={uploading} uploadProgress={uploadProgress} onSelectImages={onSelectImages} />
      {images.length > 0 && (
        <button
          onClick={clearImages}
          className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
        >
          Limpiar imágenes
        </button>
      )}
    </div>
  )
}

export default ManageImageDrop
