'use client'
import { useRouter, usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'


const PUBLIC_ROUTES = ['/','/about-us','/event', '/explore','/admin-auth','/signup']
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser(token)
    } else if (!PUBLIC_ROUTES.includes(pathname)) {
      router.push('/')
    }
  }, [pathname, router])

  function login(token) {
    localStorage.setItem('token', token)
    setUser(token)
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/')
  }

  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}