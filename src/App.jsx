import { useState, useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './componets/organims/navbar'
// PAGES
import { LoginPage } from './componets/pages/auth/loginPage'
import { InstitutioPage } from './componets/pages/institution/institutionPage'
//FATHER-STUDENT
import { DashboardStudentPage } from './componets/pages/dashboard/dashboardStudentPage'
import { AttendanceStudentPage } from './componets/pages/attendance/attendanceStudentPage'
import { BehaviorStudentPage } from './componets/pages/behavior/behaviorStudentPage'
import { NotificationsStudentPage } from './componets/pages/notifiacitons/notificationStudentPage'

//ASSITANT-AUXILIAR
import { DashboardAssitantPage } from './componets/pages/dashboard/dashboardAssistant'
import { AttendanceControlPage } from './componets/pages/attendance/attendanceControlPage'
import { BehaviorControlPage } from './componets/pages/behavior/behaviorControlPage'
import { NotificationsAssistantPage } from './componets/pages/notifiacitons/notificationsAssistantPage'

// ADMIN
import { DashboardAdminPage } from './componets/pages/dashboard/dashboardAdmin'
import { RegisterUser } from './componets/pages/admin/registerUserPage'
import { RegisterStudent } from './componets/pages/admin/registerStudentPage'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)
  const inactivityTimerRef = useRef(null)
  const lastResetRef = useRef(0)

  const INACTIVITY_TIME = 30 * 60 * 1000 // 20 min

  // LOGIN CHECK

  useEffect(() => {
    const savedUser = localStorage.getItem('userData')
    const savedAuth = localStorage.getItem('isAuthenticated')
    const lastActivity = localStorage.getItem('lastActivity')

    if (savedUser && savedAuth === 'true') {
      if (lastActivity) {
        const diff = Date.now() - parseInt(lastActivity)
        if (diff > INACTIVITY_TIME) {
          handleLogout()
          return
        }
      }

      setIsAuthenticated(true)
      setUserData(JSON.parse(savedUser))
      localStorage.setItem('lastActivity', Date.now().toString())
    }
  }, [])

  // LOGIN / LOGOUT
  const handleLogin = (user) => {
    setIsAuthenticated(true)
    setUserData(user)

    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userData', JSON.stringify(user))
    localStorage.setItem('lastActivity', Date.now().toString())
  }

  const handleLogout = () =>{
    setIsAuthenticated(false)
        setUserData(null)

        
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userData')
        localStorage.removeItem('lastActivity')
    
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current)
        }
  }

  // INACTIVITY SYSTEM (FIXED)

  useEffect(() => {
    if (!isAuthenticated) return

    const resetTimer = () => {
      const now = Date.now()

      // debounce 1s
      if (now - lastResetRef.current < 1000) return
      lastResetRef.current = now

      // clear previous timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }

      localStorage.setItem('lastActivity', now.toString())

      inactivityTimerRef.current = setTimeout(() => {
        alert('Sesión cerrada por inactividad')
        handleLogout()
      }, INACTIVITY_TIME)
    }

    const events = ['click', 'keydown', 'scroll', 'mousemove']

    events.forEach(e => window.addEventListener(e, resetTimer))

    resetTimer()

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
      events.forEach(e => window.removeEventListener(e, resetTimer))
    }
  }, [isAuthenticated])

  // ROUTES
  const pages = [
    { path: '/', component: <DashboardStudentPage userData={userData}/> },
    { path: '/', component: <DashboardAssitantPage userData={userData}/> },
    { path: '/', component: <DashboardAdminPage userData={userData}/> },
    { path: '/attendance-control', component: <AttendanceControlPage /> },
    { path: '/attendance-student', component: <AttendanceStudentPage /> },
    { path: '/behavior-control', component: <BehaviorControlPage/> },
    { path: '/behavior-student', component: <BehaviorStudentPage/> },
    { path: '/institution', component: <InstitutioPage/> },
    { path: '/notifications', component: <NotificationsStudentPage /> },
    { path: '/notifications', component: <NotificationsAssistantPage /> },
    { path: '/admin/register-student', component: <RegisterStudent /> },
    { path: '/admin/register-user', component: <RegisterUser /> },
  ]

  // LOGIN GATE
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  // APP

  return (
    <>
      <Navbar 
        handleLogout={handleLogout}
      />
      <Routes>
        {pages.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  )
}

export default App