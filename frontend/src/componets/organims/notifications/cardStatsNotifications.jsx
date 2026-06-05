import { Small } from "../../atoms/small";
import { FaBell, FaEnvelopeOpen, FaCalendarDay } from "react-icons/fa";

function CardStatsNotifications({ notifications }) {

  const unread = notifications.filter(
    notification => !notification.isRead
  ).length;

  const total = notifications.length;

  const today = notifications.filter(
    notification => notification.date.includes("Hoy")
  ).length;

  const stats = [
    {
      title: "No leídas",
      value: unread,
      icon: FaBell 
    },
    {
      title: "Total",
      value: total,
      icon: FaEnvelopeOpen 
    },
    {
      title: "Hoy",
      value: today,
      icon: FaCalendarDay 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {
        stats.map((stat, index) => {
          const Icon = stat.icon
          return(
            <div
            key={index}
            className="
              bg-white rounded-lg p-4 shadow-sm
              border border-borderC
              flex items-center justify-between gap-4
            "
          >
            <div>
              <Small 
                text={stat.title}
                size="base"
                />
              <p className="text-2xl font-bold">
                {stat.value}
              </p>
            </div>
            <Icon className="text-cyan-700 size-6"/>
          </div>
          )
        }
          
        )
      }
    </div>
  );
}

export { CardStatsNotifications };