import { Route, Routes } from 'react-router-dom'
import { Navbar } from './componets/organims/navbar'
import { Footer } from './componets/organims/footer'
import { useAuth } from './hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { dashboardRoutes } from './config/dashboardRutes'
// PAGES
import { LoginPage } from './componets/pages/auth/loginPage'
import { InstitutionPage } from './componets/pages/institution/institutionPage'
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
import { MainLayout } from './componets/layouts/mainlayout'

function App() {
  const {
    isAuthenticated,
    userData,
    login
  } = useAuth()

  const pages = [
    { path: '/father', component: <DashboardStudentPage userData={userData} /> },
    { path: '/assistant', component: <DashboardAssitantPage userData={userData} /> },
    { path: '/admin', component: <DashboardAdminPage userData={userData} /> },
    { path: '/attendance-control', component: <AttendanceControlPage /> },
    { path: '/attendance-student', component: <AttendanceStudentPage /> },
    { path: '/behavior-control', component: <BehaviorControlPage /> },
    { path: '/behavior-student', component: <BehaviorStudentPage /> },
    { path: '/institution', component: <InstitutionPage /> },
    { path: '/notifications-student', component: <NotificationsStudentPage /> },
    { path: '/notifications-assistant', component: <NotificationsAssistantPage /> },
    { path: '/admin/register-student', component: <RegisterStudent /> },
    { path: '/admin/register-user', component: <RegisterUser /> },
  ]

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path='/'
          element={
            <Navigate
              to={dashboardRoutes[userData?.role]}
              replace
            />
          }
        />

        {pages.map((page, index) => (
          <Route
            key={index}
            path={page.path}
            element={page.component}
          />
        ))}
      </Route>
    </Routes>
  )
}

export default App