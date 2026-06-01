import { useEffect, useRef } from 'react'
import { authStorage } from '../services/authStorage'

export function useInactivityTimer(
  isAuthenticated,
  onLogout,
  timeout = 60 * 60 * 1000
) {
  const timerRef = useRef(null)
  const lastResetRef = useRef(0)

  useEffect(() => {
    if (!isAuthenticated) return
    const resetTimer = () => {
      const now = Date.now()
      if (now - lastResetRef.current < 1000) return
      lastResetRef.current = now
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      authStorage.updateActivity()

      timerRef.current = setTimeout(() => {
        alert('Sesión cerrada por inactividad')
        onLogout()
      }, timeout)
    }

    const events = [
      'click',
      'keydown',
      'mousemove',
      'scroll'
    ]

    events.forEach(event =>
      window.addEventListener(event, resetTimer)
    )
    resetTimer()
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      events.forEach(event =>
        window.removeEventListener(event, resetTimer)
      )
    }
  }, [isAuthenticated, onLogout, timeout])
}