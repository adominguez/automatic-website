'use client'
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { AuthContext } from '@/app/hooks/auth'
import { useRouter } from 'next/navigation'

export function Providers ({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(undefined)
  const [token, setToken] = useState(undefined)
  const [authorized, setAuthorized] = useState(undefined)
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const [errorLogin, setErrorLogin] = useState(false)

  const updateData = (data) => {
    const { jwt, user, auth } = data
    setToken(jwt)
    setUser(user)
    setAuthorized(auth)
  }

  const onLogin = async (value) => {
    if (!token) {
      setIsLoadingLogin(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(value)
        })
        const data = await response.json()
        if (data?.error) {
          setErrorLogin(data.error)
        } else {
          updateData({
            ...data,
            auth: true
          })
          router.replace('/admin')
        }
      } catch (error) {
        console.error(error)
        setErrorLogin(error?.message ?? 'Something went wrong!')
      } finally {
        setIsLoadingLogin(false)
      }
    }
  }

  const onLogout = async () => {
    if (token) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_API_URL}/logout`, { method: 'GET' })
      const {
        user: { value: userValue } = {},
        authenticated: { value: authenticated } = {},
        token: { value: tokenValue } = {}
      } = await response.json()
      updateData({
        auth: authenticated === 'true',
        jwt: tokenValue,
        user: JSON.parse(userValue)
      })
      router.replace('/')
    }
  }

  const getAuthdata = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_API_URL}/auth`, {
      method: 'GET'
    })
    const {
      user: { value: userValue } = {},
      authenticated: { value: authenticated } = {},
      token: { value: tokenValue } = {}
    } = await response.json()
    if (tokenValue) {
      updateData({
        auth: authenticated === 'true',
        jwt: tokenValue,
        user: JSON.parse(userValue)
      })
    }
  }

  useEffect(() => {
    getAuthdata()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoadingLogin, onLogin, errorLogin, onLogout, user, authorized }}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </AuthContext.Provider>
  )
}
