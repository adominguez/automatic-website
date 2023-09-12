'use client'
import { createContext, useContext } from 'react'

export const AuthContext = createContext({
  isLoadingLogin: false,
  onLogin: () => {},
  errorLogin: false,
  onLogout: () => {},
  user: undefined,
  authorized: false
})

export const useAuthContext = () => useContext(AuthContext)
