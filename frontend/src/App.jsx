import { Route, Routes } from 'react-router-dom'
import { Navbar } from './componets/organims/navbar'
import { useAuth } from './hooks/useAuth'
// PAGES
import { LoginPage } from './componets/pages/auth/loginPage'
import { InstitutioPage } from './componets/pages/institution/institutionPage'
// FATHER-STUDENT
import { DashboardStudentPage } from './componets/pages/dashboard/dashboardStudentPage'
import { AttendanceStudentPage } from './componets/pages/attendance/attendanceStudentPage'
import { BehaviorStudentPage } from './componets/pages/behavior/behaviorStudentPage'
import { NotificationsStudentPage } from './componets/pages/notifiacitons/notificationStudentPage'
// ASSISTANT
import { DashboardAssitantPage } from './componets/pages/dashboard/dashboardAssistant'
import { AttendanceControlPage } from './componets/pages/attendance/attendanceControlPage'
import { BehaviorControlPage } from './componets/pages/behavior/behaviorControlPage'
import { NotificationsAssistantPage } from './componets/pages/notifiacitons/notificationsAssistantPage'
// ADMIN
import { DashboardAdminPage } from './componets/pages/dashboard/dashboardAdmin'
import { RegisterUser } from './componets/pages/admin/registerUserPage'
import { RegisterStudent } from './componets/pages/admin/registerStudentPage'

function App() {
  const {
    isAuthenticated,
    userData,
    login
  } = useAuth()

  const pages = [
    { path: '/father', component: <DashboardStudentPage userData={userData}/> },
    { path: '/assistant', component: <DashboardAssitantPage userData={userData}/> },
    { path: '/admin', component: <DashboardAdminPage userData={userData}/> },
    { path: '/attendance-control', component: <AttendanceControlPage /> },
    { path: '/attendance-student', component: <AttendanceStudentPage /> },
    { path: '/behavior-control', component: <BehaviorControlPage /> },
    { path: '/behavior-student', component: <BehaviorStudentPage /> },
    { path: '/institution', component: <InstitutioPage /> },
    { path: '/notifications-student', component: <NotificationsStudentPage /> },
    { path: '/notifications-assistant', component: <NotificationsAssistantPage /> },
    { path: '/admin/register-student', component: <RegisterStudent /> },
    { path: '/admin/register-user', component: <RegisterUser /> },
  ]

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />
  }

  return (
    <>
      <Navbar />
      <Routes>
        {pages.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
    </>
  )
}

export default App