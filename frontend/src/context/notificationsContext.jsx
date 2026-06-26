import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/hookGlobals/useAuth";
import { notificationsAssitantMock } from "../mocks/notificationsAssitantMock";
import { notificationsFatherMock } from "../mocks/notificatiosFather";

export const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const { role } = useAuth();

  const [notifications, setNotifications] = useState([]);

  const getInitial = () => {
    switch (role) {
      case "AUXILIAR":
      case "ADMIN":
        return notificationsAssitantMock;

      case "PARENT":
        return notificationsFatherMock;

      default:
        return [];
    }
  };

  //  reaccionar al role
  useEffect(() => {
    setNotifications(getInitial());
  }, [role]);

  //marcar uno como leido
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  //marcar todas como leidas
  const markAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  //Notificaciones sin leer
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  //Todas las notificaciones
  const totalCount = notifications.length;

  //Notificaciones de hoy
  const todayCount = notifications.filter(n =>
    n.date?.includes("Hoy")
  ).length;

  return (
    <NotificationsContext.Provider value={{
      notifications,
      unreadCount,
      totalCount,
      todayCount,
      markAsRead,
      markAllRead
    }}>
      {children}
    </NotificationsContext.Provider>
  );
}