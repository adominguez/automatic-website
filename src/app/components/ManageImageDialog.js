'use client'
import { useState, useRef } from 'react'
import {
  Dialog, DialogHeader, DialogBody, DialogFooter, Button, IconButton, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Typography, Spinner
} from '@/app/components/MaterialComponents'
import { Close } from '@/app/components/Icons'
// import ManageImageDropzone from './ManageImageDropzone'
import ManageImageDrop from './ManageImageDrop'
import ManageImageList from './ManageImageList'
import ManageImageDetail from './ManageImageDetail'
import useFetchImages from '../hooks/FetchImages'
import { MANAGE_IMAGE_TABS } from '../constants/ManageImage'

const ManageImageDialog = ({ children, maxResults }) => {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedImage] = selectedImages?.slice(-1)
  const tabRef = useRef(null)
  const {current} = tabRef || {}
  const { images, loadingImages, loadingMoreImages, resetImages } = useFetchImages({current, activeTab, maxResults})

  const selectImages = (newSelectedImages) => {
    setSelectedImages(newSelectedImages)
  }

  const handleOpen = () => {
    if (open) {
      setSelectedImages([])
      resetImages()
      setActiveTab('upload')
    }
    setOpen(!open)
  };

  return (
    <>
      {typeof children === 'function' && children({
        handleOpen,
      })}
      <Dialog open={open} handler={handleOpen} size="xxl" className='overflow-hidden'>
        <DialogHeader className='flex items-center justify-between p-2'>
          <Typography variant="h4">
            Gestionar imágenes
          </Typography>
          <IconButton variant="text" color="blue-gray" className="rounded-full" onClick={handleOpen}>
            <Close />
          </IconButton>
        </DialogHeader>
        <DialogBody divider className='flex flex-col flex-1 p-0 overflow-hidden'>
          <div className='flex flex-1 w-full h-full'>
            <div className='flex flex-col flex-1 overflow-auto border-blue-gray-100'>
              <Tabs value={activeTab} className="flex flex-col flex-1">
                <TabsHeader
                  className="p-0 bg-transparent border-b rounded-none border-blue-gray-50"
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                  }}
                >
                  {MANAGE_IMAGE_TABS.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setActiveTab(value)}
                      className={activeTab === value ? "text-blue-gray-900" : ""}
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody className='flex flex-col flex-1'>
                  {MANAGE_IMAGE_TABS.map(({ value }) => (
                    <TabPanel ref={tabRef} key={value} value={value} className='flex-1 overflow-auto'>
                      {
                        value === 'upload' ? <ManageImageDrop onSelectImages={selectImages} /> : null
                      }
                      {
                        value === 'medios' ? <>
                          <ManageImageList images={images} loadingImages={loadingImages} onSelectImages={selectImages} />
                          {
                            loadingMoreImages ? <Spinner /> : null
                          }
                        </> : null
                      }
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>
            {
              activeTab === 'medios' ? <div className='hidden w-0 p-2 overflow-auto sm:block sm:border-l sm:w-60 border-blue-gray-100'>
                <ManageImageDetail selectedImage={selectedImage} />
              </div> : null
            }
          </div>
        </DialogBody>
        <DialogFooter>
          <Button disabled={!selectedImages?.length} color="blue-gray" onClick={handleOpen}>
            Utilizar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default ManageImageDialog