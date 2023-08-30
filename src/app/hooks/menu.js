'use client'
import { useEffect } from 'react'

const useClickMenu = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}

export default useClickMenu
