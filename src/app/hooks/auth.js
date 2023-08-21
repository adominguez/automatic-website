import { useEffect, useState, createContext, useContext } from 'react'
import { AUTH_TOKEN } from '@/app/constants/auth'

export const useToken = () => {
  const [token, setToken] = useState(undefined)

  useEffect(() => {
    // esto sólo se ejecuta en cliente
    const newToken = window.localStorage.getItem(AUTH_TOKEN)
    setToken(newToken)
  }, []) // dejamos las dependencias vacías para que sólo se ejecute la primera vez

  const getToken = () => token

  const setNewToken = (newToken) => {
    if (newToken) {
      window.localStorage.setItem(AUTH_TOKEN, newToken)
      setToken(newToken)
    }
  }

  const removeToken = (newToken) => {
    window.localStorage.removeItem(AUTH_TOKEN)
    setToken(undefined)
  }

  return { token, getToken, setNewToken, removeToken }
}

export const AuthContext = createContext({
  user: undefined,
  isLoading: false,
  setUser: () => {}
})

export const useAuthContext = () => useContext(AuthContext)
