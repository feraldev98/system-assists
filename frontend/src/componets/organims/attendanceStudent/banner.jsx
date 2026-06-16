import { AttendanceCards } from "./attendanceCard";
import { HiOutlineCalendarDateRange, } from "react-icons/hi2";
import { GiCheckMark } from "react-icons/gi";
import { FiX } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Titlebanner } from "../../molecules/attendanceStudent/titleBanner";
import { FilterStudents } from "../../molecules/filterStudents";

function BannerAttendances({
  students,
  currentStudent,
  setSelectedStudent,
  selectedStudent
}) {
  const title = `Asistencias de`

  const attendanceStats = [
    {
      icon: <HiOutlineCalendarDateRange size={30} className="text-blue-500 " />,
      stats: currentStudent?.stats?.days ?? 0,
      text: 'Días registrados'
    },
    {
      icon: <GiCheckMark size={30} className="text-green-700 " />,
      stats: currentStudent?.stats?.presents ?? 0,
      text: 'Asistencias'
    },
    {
      icon: <FiX size={30} className="text-red-700 " />,
      stats: currentStudent?.stats?.late ?? 0,
      text: 'Inasistencias',
    },
    {
      icon: <FaArrowTrendUp size={30} />,
      stats: currentStudent?.stats?.rate ?? 0,
      text: 'Taza de asistencias'
    }
  ]
  return (
    <section className="
      mt-6
      md:mt-0
      py-8 
      w-[96%] 
      md:w-[90%]
      md:max-w-7xl 
      mx-auto
      overflow-hidden
    ">

      <div className="flex items-center justify-between">
        <Titlebanner
          title={title}
          currentStudent={currentStudent}
        />

        {/* FILTRO DE HIJOS */}
        <FilterStudents
          setSelectedStudent={setSelectedStudent}
          selectedStudent={selectedStudent}
          students={students}
        />

      </div>
      {/* CARDS */}
      <AttendanceCards
        attendanceStats={attendanceStats}
      />
    </section>
  );
}

export { BannerAttendances }