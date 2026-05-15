import { CardRecentNotifications } from "../../molecules/dashboardStudent/cardLeftRecentNotis";
import { AttendanceClassCard } from "./attendanceCardLeft";
import { GiCheckMark, GiAlarmClock } from "react-icons/gi";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { TitlesHomeOverview } from "../../molecules/dashboardStudent/titleshomeOverview"

function LeftOverview() {
  const title = 'MIS NOTIFICACIONES RECIENTES'
  const title2 = 'ASISTENCIAS DE ESTA SEMANA'

  const RecentNotifications = [
    {
      title: 'TARDANZA REGISTRADA',
      status: 'TARDANZA',
      message: 'El estudiante Wynsley llego tarde a clases',
      dateTime: '12 de mayo de 2026 09:30 AM'
    },
    {
      title: 'FALTA REGISTRADA',
      status: 'FALTÓ',
      message: 'El estudiante Wynsley no llego a la institución',
      dateTime: '12 de mayo de 2026 09:30 AM'
    },
    {
      title: 'COMPORTAMIENTO INDEBIDO',
      status: 'COMPORTAMIENTO',
      message: 'El estudiante Wynsley falto el respeto',
      dateTime: '12 de mayo de 2026 09:30 AM'
    },
  ]

  const AttendancesClasses = [
    {
      day: "vie.",
      date: "11 May.",
      hour: "6:50 AM",
      icon: <GiCheckMark size={22} className="text-green-600"/>,
      stats: "Asistió",
    },
    {
      day: "jue.",
      date: "11 May.",
      hour: "7:30 AM",
      icon: <GiAlarmClock size={22} className="text-yellow-800"/>,
      stats: "Tarde",
    },
    {
      day: "mie.",
      date: "11 May.",
      hour: "8:00 AM",
      icon: <FiX size={22} className="text-red-700"/>,
      stats: "Faltó",
    },
      {
      day: "mar.",
      date: "11 May.",
      hour: "6:50 AM",
      icon: <GiCheckMark size={22} className="text-green-600"/>,
      stats: "Asistió",
    },
      {
      day: "lun.",
      date: "11 May.",
      hour: "6:50 AM",
      icon: <GiCheckMark size={22} className="text-green-600"/>,
      stats: "Asistió",
    },
  ];
  return (
    <section className="flex flex-col gap-6 font-poppins">

      {/*NOTIFICAIONES RECIENTES*/}
      <div className="flex flex-col gap-2 bg-white rounded-md border border-borderC p-6 shadow-sm">
        <TitlesHomeOverview
          title={title}
          icon={IoNotificationsSharp}
          text={'Ver Todo'}
          href='/notifications-student'
        />
        <CardRecentNotifications
          RecentNotifications={RecentNotifications}
        />
      </div>
      <div className="bg-white rounded-md border border-borderC p-6 shadow-sm">
        <TitlesHomeOverview
          title={title2}
          icon={MdDateRange}
          text={'Ver Todo'}
          href='/attendance-student'
        />
        <AttendanceClassCard
          AttendancesClasses={AttendancesClasses}
        />
      </div>
    </section>
  )
}

export { LeftOverview }