import { BannerNotifications } from "../../organims/notifications/banner";
import { MyTemplate } from "../../templates/myTemplate";
import { notificationsFatherMock } from "../../../mocks/notificatiosFather";
import { useState } from "react";
import { SectionNotifications } from "../../organims/notifications/sectionNotifications";
import { useNotifications } from "../../../hooks/hooksAssistant/useNotifications";


function NotificationsStudentPage() {

  //Verifiacmos cantida de notificaciones
  const {
    notifications, 
    unreadCount,
    markAllRead, 
    markAsRead,
    totalCount,
    todayCount
  } = useNotifications()

  return (
    <MyTemplate>
      <BannerNotifications
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllRead}
        notifications={notificationsFatherMock}
        today={todayCount}
        total={totalCount}
      />
      <SectionNotifications
      notifications={notifications}
      markAsRead={markAsRead}
      />
    </MyTemplate>
  )
}

export { NotificationsStudentPage }