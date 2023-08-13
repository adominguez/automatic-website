import { useCallback, useState, useEffect } from 'react'
import { MANAGE_IMAGE_TABS } from '../constants/ManageImage'

let loadingMoreImages = false

const useFetchImages = ({current, activeTab, maxResults}) => {
  const [images, setImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(false)
  const [nextCursor, setNextCursor] = useState(false)

  const fetchImages = async () => {
    const { data } = await fetch(`${process.env.CLOUDINARY_API_URL}?max_results=${maxResults || 12}${nextCursor ? `&next_cursor=${nextCursor}` : ''}`).then((res) => res.json());
    setImages(loadingMoreImages ? [...images, ...data.resources] : data.resources)
    setNextCursor(data.next_cursor)
  }

  const loadImages = () => {
    setLoadingImages(true)
    fetchImages().catch(console.error).finally(() => setLoadingImages(false));
  }

  useEffect(() => {
    if (activeTab === MANAGE_IMAGE_TABS[1].value && !images?.length) {
      loadImages()
    }
  }, [activeTab])

  const handleScroll = useCallback(() => {
    if (!current) return;
    if (loadingMoreImages) return; // Evitar múltiples llamadas
  
    const scrollTop = current.scrollTop;
    const scrollHeight = current.scrollHeight;
    const clientHeight = current.clientHeight;
  
    if ((scrollHeight - scrollTop - clientHeight <= 50) && nextCursor) {
      loadingMoreImages = true;
      fetchImages()
        .catch(console.error)
        .finally(() => loadingMoreImages = false);
    }
  }, [current, loadingMoreImages, nextCursor]);
  
  
  useEffect(() => {
    if (current) {
      current.addEventListener('scroll', handleScroll);
    }
    return () => current?.removeEventListener('scroll', handleScroll);
  }, [current, handleScroll, loadingMoreImages]);

  const resetImages = () => {
    setImages([])
    setLoadingImages(false)
    loadingMoreImages = false
    setNextCursor(undefined)
  }

  return {images, loadingImages, loadingMoreImages, resetImages}
}

export default useFetchImages