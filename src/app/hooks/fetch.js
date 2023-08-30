'use client'
import { useState, useEffect } from 'react'

let loading = false

export const useFetchApi = ({ endpoint }) => {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [isEmpty, setEmpty] = useState(false)

  const loadData = async () => {
    setEmpty(false)
    setError(false)
    setResponse(undefined)
    loading = true
    try {
      const { data, meta } = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_API_URL}/${endpoint}`).then(res => res.json())
      if (!data?.length) {
        setEmpty(true)
        setResponse([])
      } else {
        setEmpty(false)
        setResponse({ data, meta })
      }
    } catch (e) {
      setError(e)
    } finally {
      loading = false
    }
  }

  useEffect(() => {
    if (!loading) {
      loadData()
    }
  }, [])

  return { response, error, loading, isEmpty, loadData }
}
