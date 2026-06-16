import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { authStorage } from '../services/authStorage'
import { useInactivityTimer } from '../hooks/hookGlobals/useInactivityTimer'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  // Rehidratar sesión al iniciar la aplicación
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

  // Control de inactividad
  useInactivityTimer(isAuthenticated, logout)

  const value = {
    isAuthenticated,
    userData,
    role: userData?.role ?? null,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error(
      'useAuthContext must be used within an AuthProvider'
    )
  }

  return context
}