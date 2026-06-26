import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import { NavbarProvider } from './context/navbarContext.jsx'
import { NotificationsProvider } from './context/notificationsContext.jsx'
import { ToastProvider } from './context/toastContext.jsx' // nuevo import
import { Toast } from './componets/atoms/toast.jsx'// nuevo import (ajusta el path si tu carpeta no es "componets")

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <Toast /> 
        <AuthProvider>
          <NavbarProvider>
            <NotificationsProvider>
              <App />
            </NotificationsProvider>
          </NavbarProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)