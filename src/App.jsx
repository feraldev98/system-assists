import { useState, useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
// PAGES
import { LoginPage } from './componets/pages/loginPage'
import { Navbar } from './componets/organims/navbar'
import { HomePage } from './componets/pages/homePage'
import { AboutUs } from './componets/pages/aboutUs'
// STUDENTS
import { StudentsSchedules } from './componets/pages/students/studentsSchedulesPage'
import { StudentesCourses } from './componets/pages/students/studentsCoursesPage'
import { StudentsGrades } from './componets/pages/students/studentsGradesPage'
import { StudentsAttendance } from './componets/pages/students/studentsAttendance'
// TEACHERS
import { TeachersCourses } from './componets/pages/teachers/teachersCoursesPage'
import { TeachersSchedules } from './componets/pages/teachers/teachersSchedulesPag'
import { TeachersEvaluations } from './componets/pages/teachers/teachersEvaluationsPage'
// ATTENDANCE
import { Entry } from './componets/pages/attendances/entry'
import { Classroom } from './componets/pages/attendances/classroom'
// MODALS
import { ModalNotifications } from './componets/modals/modalNotifications'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)
  const inactivityTimerRef = useRef(null)
  const lastResetRef = useRef(0)

  //MODALS
  const [modalNotiOpen, setModalNotiOpen] = useState(false) 

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

  const handleLogout = () => {
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
    { path: '/', component: <HomePage userData={userData}/> },
    { path: '/students/schedules', component: <StudentsSchedules /> },
    { path: '/students/courses', component: <StudentesCourses /> },
    { path: '/students/grades', component: <StudentsGrades /> },
    { path: '/students/attendance', component: <StudentsAttendance /> },
    { path: '/teachers/courses', component: <TeachersCourses /> },
    { path: '/teachers/schedule', component: <TeachersSchedules /> },
    { path: '/teachers/evaluations', component: <TeachersEvaluations /> },
    { path: '/attendance/entry', component: <Entry /> },
    { path: '/attendance/classroom', component: <Classroom /> },
    { path: '/aboutUs', component: <AboutUs /> },
  ]

  // LOGIN GATE
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  // APP

  return (
    <>
      <Navbar 
        setModalNotiOpen={setModalNotiOpen} 
        handleLogout={handleLogout}
      />

      {modalNotiOpen && <ModalNotifications setModalNotiOpen={setModalNotiOpen}/>}
      <Routes>
        {pages.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  )
}

export default App