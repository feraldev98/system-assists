import { BannerNotifications } from "../../organims/notifications/banner";
import { MyTemplate } from "../../templates/myTemplate";
import { notificationsMock } from "../../../mocks/notificatios";
import { useState } from "react";
import { SectionNotifications } from "../../organims/notifications/sectionNotifications";


function NotificationsStudentPage() {

  const [notifications, setNotifications] =
    useState(notificationsMock);

  //Verifiacmos cantida de notificaciones
  const unreadCount = notifications.filter(
    notification => !notification.isRead
  ).length;

  //cambiamos de estado 
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  return (
    <MyTemplate>
      <BannerNotifications
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllAsRead}
        notifications={notifications}
      />
      <SectionNotifications
        notifications={notifications}

      />
    </MyTemplate>
  )
}

export { NotificationsStudentPage }