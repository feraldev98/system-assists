import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authStorage } from '../services/authStorage'
import { useInactivityTimer } from '../hooks/useInactivityTimer'

const AuthContext = createContext({
  isAuthenticated: false,
  userData: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  // Rehidratar sesión al montar
  useEffect(() => {
    const user = authStorage.getUser()
    
    if (user && authStorage.isAuthenticated()) {
      setUserData(user)
      setIsAuthenticated(true)
    }
  }, [])

  const login = useCallback((user) => {
    setIsAuthenticated(true)
    setUserData(user)
    authStorage.saveUser(user)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUserData(null)
    authStorage.clear()
  }, [])

  useInactivityTimer(isAuthenticated, logout)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}