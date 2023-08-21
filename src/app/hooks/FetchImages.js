import { useCallback, useState, useEffect } from 'react'
import { MANAGE_IMAGE_TABS } from '../constants/ManageImage'
import { NEXT_PUBLIC_REQUEST_API_URL } from '@/app/config'

let loadingMoreImages = false

const useFetchImages = ({ current, activeTab, maxResults }) => {
  const [images, setImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(false)
  const [isEmpty, setEmpty] = useState(false)
  const [nextCursor, setNextCursor] = useState(false)

  const fetchImages = async () => {
    const { data } = await fetch(`${NEXT_PUBLIC_REQUEST_API_URL}/images?max_results=${maxResults || 24}${nextCursor ? `&next_cursor=${nextCursor}` : ''}`).then((res) => res.json())
    if (!data?.resources?.length) {
      setEmpty(true)
    } else {
      setEmpty(false)
      setImages(loadingMoreImages ? [...images, ...data.resources] : data.resources)
      setNextCursor(data.next_cursor)
    }
  }

  const loadImages = () => {
    setLoadingImages(true)
    fetchImages().catch(console.error).finally(() => setLoadingImages(false))
  }

  const loadMoreImages = () => {
    loadingMoreImages = true
    fetchImages()
      .catch(console.error)
      .finally(() => {
        loadingMoreImages = false
      })
  }

  useEffect(() => {
    if (activeTab === MANAGE_IMAGE_TABS[1].value && !images?.length) {
      loadImages()
    }
  }, [activeTab])

  const handleScroll = useCallback(() => {
    if (!current) return
    if (loadingMoreImages) return // Evitar múltiples llamadas

    const scrollTop = current.scrollTop
    const scrollHeight = current.scrollHeight
    const clientHeight = current.clientHeight

    if ((scrollHeight - scrollTop - clientHeight <= 100) && nextCursor && images?.length) {
      loadMoreImages()
    }
  }, [current, loadingMoreImages, nextCursor])

  useEffect(() => {
    if (current) {
      current.addEventListener('scroll', handleScroll)
    }
    return () => current?.removeEventListener('scroll', handleScroll)
  }, [current, handleScroll, loadingMoreImages])

  const resetImages = () => {
    setImages([])
    setLoadingImages(false)
    loadingMoreImages = false
    setNextCursor(undefined)
  }

  return { images, loadingImages, loadingMoreImages, nextCursor, isEmpty, resetImages, loadMoreImages }
}

export default useFetchImages
