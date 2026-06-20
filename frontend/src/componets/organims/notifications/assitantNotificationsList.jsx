import { Title } from "../../atoms/title";
import { NotificationCard } from "../../molecules/notifications/cardAssitant";

function NotificationsList({
  notifications,
  markAsRead
}) {

  return (
    <div className="
        flex flex-col gap-3 px-5 pb-5 rounded-md
        border border-borderC bg-white
        max-h-[55vh] overflow-y-auto 
        md:mt-6 w-[96%] md:w-[90%]
        md:max-w-6xl mx-auto
    ">
      <Title
        text='TODAS LAS NOTIFICACIONES'
        level="h3"
        weight="bold"
        variant="secondary"
        className="sticky top-0 bg-white w-full py-3"
      />

      <div className="flex flex-col gap-2 ">
        {
          notifications.map(notification => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              notifications = {notifications}
              markAsRead={markAsRead}
            />
          ))
        }
      </div>
    </div>
  );
}

export { NotificationsList };