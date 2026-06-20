import { useVisible } from "../../../hooks/hookGlobals/useVisible";
import { Small } from "../../atoms/small";
import { FaBell, FaEnvelopeOpen, FaCalendarDay } from "react-icons/fa";

function StatsNotificationsAssistant({ 
  total,
  today,
  unread
}) {

  //animacion para las tarjetas
  const {visible} = useVisible(90)

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4
        mt-6
        w-[96%]
        md:w-[90%]
        md:max-w-6xl
        mx-auto
    ">
      {
        stats.map((stat, index) => {
          const Icon = stat.icon
          return(
            <div
            key={index}
            className={`
              bg-white rounded-lg p-4 shadow-md
              border border-borderC/50
              flex items-center justify-between gap-4
              transition-all duration-300 hover:-translate-y-1 hover:shadow-blueT
              ${visible
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-3'
              }
              `}
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

export { StatsNotificationsAssistant };