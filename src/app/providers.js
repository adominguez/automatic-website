'use client'
import React, { useState, useEffect } from 'react'
import { BEARER } from '@/app/constants/auth'
import { ThemeProvider } from 'next-themes'
import { useToken, AuthContext } from '@/app/hooks/auth'

export function Providers ({ children }) {
  const [userData, setUserData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { getToken } = useToken()

  const authToken = getToken()

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` }
      })
      const data = await response.json()

      setUserData(data)
    } catch (error) {
      console.error(error)
      console.error('Error While Getting Logged In User Details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUser = (user) => {
    setUserData(user)
  }

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken)
    }
  }, [authToken])

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading }}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </AuthContext.Provider>
  )
}
