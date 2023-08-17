import { useState } from 'react';
import { Progress, Checkbox, Button, Typography } from '@/app/components/MaterialComponents'
import { EmptyFolder } from '@/app/components/Icons'
import { v4 as uuidv4 } from 'uuid';

const ManageImageList = ({ images, uploading, loadingImages, isEmpty, uploadProgress, onSelectImages, multipleSelection }) => {
  const [selectedImages, setSelectedImages] = useState([])

  const handleCheckboxChange = (e, id) => {
    const { checked } = e.currentTarget
    let newImages = [];
    if (checked) {
      const image = images.find(({ public_id }) => public_id === id)
      newImages = multipleSelection ? [...selectedImages, image]: [image]
    } else {
      newImages = selectedImages.filter(({ public_id }) => public_id !== id)
    }
    setSelectedImages(newImages);
    onSelectImages && onSelectImages(newImages)
  };

  const isSelected = (id) => selectedImages.some(({ public_id }) => public_id === id)

  const loadImagesArray = new Array(24).fill().map(() => uuidv4())

  return (
    <div>
      {loadingImages ?
        <div className="grid grid-cols-1 gap-3 my-4 grid-auto-flow sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
          {
            loadImagesArray.map(id => <div role="status" key={id} className="flex flex-col items-center justify-center h-full gap-2 animate-pulse min-h-max">
              <div className="flex items-center justify-center flex-1 w-full p-20 bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <span className="sr-only">Loading...</span>
            </div>)
          }
        </div>
        : null}
      {images?.length ?
        <>
          {
            multipleSelection ?
              <div className='flex justify-end gap-2'>
                <Button color="blue-gray" onClick={() => setSelectedImages([])}>
                  Deseleccionar todo
                </Button>
                <Button color='blue' onClick={() => setSelectedImages(images)}>
                  Seleccionar todo
                </Button>
              </div>
            : null
          }
          <ul className="grid grid-cols-1 gap-3 my-4 grid-auto-flow sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
            {
              images.map(({ secure_url, public_id }, index) => (
                <li className='relative' key={public_id}>
                  {
                    secure_url ?
                      <>
                        <label className="absolute w-full h-full cursor-pointer">
                          <Checkbox
                            checked={isSelected(public_id)}
                            ripple={false}
                            color="blue"
                            onChange={(e) => handleCheckboxChange(e, public_id)}
                            className="w-8 h-8 m-0 transition-all rounded-full border-blue-gray-900/20 bg-blue-gray-900/10 hover:scale-105 hover:before:opacity-0"
                          />
                        </label>
                        <img alt={`Image ${index}`} src={secure_url} className={`object-cover aspect-square ${isSelected(public_id) ? 'p-4 border-2 border-blue-gray-800' : ''}`} />
                      </> : null
                  }
                  {uploading && uploadProgress[index] < 100 && (
                    <div role="status" className="flex flex-col items-center justify-center h-full gap-2 animate-pulse min-h-max">
                      <div className="flex items-center justify-center flex-1 w-full p-24 bg-gray-300 rounded dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                      <Progress color="blue-gray" value={uploadProgress[index]} size="lg" label="Large" />
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </li>
              ))
            }
          </ul>
        </>
        : null}
        {
          isEmpty ? <div className='flex flex-col items-center justify-center flex-1 w-full gap-4 py-20 text-center px-36 text-blue-gray-400'>
            <div className='w-32'>
              <EmptyFolder />
            </div>
            <Typography variant="h3" className="balance">Todavía no tienes imágenes subidas, puedes comenzar subiendo una nueva</Typography></div> : null
        }
    </div>
  )
}

export default ManageImageList