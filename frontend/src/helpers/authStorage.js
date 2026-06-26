const IS_AUTHENTICATED_KEY = 'isAuthenticated'
const USER_KEY = 'userData'
const ACTIVITY_KEY = 'lastActivity'

export const authStorage = {
  saveUser(user) {
    localStorage.setItem(IS_AUTHENTICATED_KEY, 'true')
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    localStorage.setItem(ACTIVITY_KEY, Date.now().toString())
  },

  getUser() {
    try {
      const user = localStorage.getItem(USER_KEY)
      return user ? JSON.parse(user) : null
    } catch {
      return null
    }
  },   

  isAuthenticated() {
    return localStorage.getItem(IS_AUTHENTICATED_KEY) === 'true'
  },

  updateActivity() {
    localStorage.setItem(ACTIVITY_KEY, Date.now().toString())
  },

  getLastActivity() {
    const value = localStorage.getItem(ACTIVITY_KEY)
    return value ? Number(value) : null
  },

  clear() {
    localStorage.removeItem(IS_AUTHENTICATED_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(ACTIVITY_KEY)
  }
}