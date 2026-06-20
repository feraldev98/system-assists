import { NotificationIcon } from "../../atoms/notificationIcon";
import { NotificationPriority } from "../../atoms/nottificationPriority";
import { IoNotifications } from "react-icons/io5";
import { Title } from "../../atoms/title";
import { Small } from "../../atoms/small";
function NotificationCard({
  notification,
  markAsRead
}) {

  return (
    <div
      className={`
        rounded-md py-3 px-6
        shadow-sm border border-gray-200
        ${notification.isRead
          ? "bg-white"
          : "bg-blueT/5"
        }
      `}
    >
      <div className="flex gap-4">
        <NotificationIcon
          type={notification.type}
        />
        <div className="flex-1">
          <div className="
            flex justify-between
            items-center
          ">
            <Title 
              text={notification.title}
              level="h4"
            />
            <NotificationPriority
              priority={notification.priority}
            />
          </div>
          <Small 
          text={notification.message}
          />

          <div className=" flex justify-between
            items-center
          ">
            <Small
              text={notification.date}
            />

            {
              !notification.isRead && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  < IoNotifications size={20} className="text-cyan-700"/>
                </button>
              )
            }
  
          </div>

        </div>

      </div>
    </div>
  );
}

export { NotificationCard };