const AUTH_KEY = 'isAuthenticated'
const USER_KEY = 'userData'
const ACTIVITY_KEY = 'lastActivity'

export const authStorage = {
  saveUser(user) {
    localStorage.setItem(AUTH_KEY, 'true')
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    localStorage.setItem(ACTIVITY_KEY, Date.now().toString())
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true'
  },

  updateActivity() {
    localStorage.setItem(ACTIVITY_KEY, Date.now().toString())
  },

  getLastActivity() {
    return localStorage.getItem(ACTIVITY_KEY)
  },

  clear() {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(ACTIVITY_KEY)
  }
}