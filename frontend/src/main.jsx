import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import { NavbarProvider } from './context/navbarContext.jsx'
import { NotificationsProvider } from './context/notificationsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavbarProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </NavbarProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
