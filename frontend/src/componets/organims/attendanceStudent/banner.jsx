import { AttendanceCards } from "./attendanceCard";
import { HiOutlineCalendarDateRange,  } from "react-icons/hi2";
import { GiCheckMark } from "react-icons/gi";
import { FiX } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Titlebanner } from "../../molecules/attendanceStudent/titleBanner";

function BannerAttendances({ 
    students, 
    visible, 
    currentStudent, 
    setSelectedStudent,
    selectedStudent
  }) {
  const title = `Asistencias de`

  const attendanceStats = [
  {
    icon: <HiOutlineCalendarDateRange size={30} className="text-blue-500 "/>,
    stats: currentStudent?.stats?.days ?? 0,
    text: 'Días registrados'
  },
  {
    icon: <GiCheckMark size={30} className="text-green-700 "/>,
    stats: currentStudent?.stats?.presents ?? 0,
    text: 'Asistencias'
  },
  {
    icon: <FiX size={30} className="text-red-700 "/>,
    stats: currentStudent?.stats?.late ?? 0,
    text: 'Inasistencias',
  },
  {
    icon: <FaArrowTrendUp size={30}  />,
    stats: currentStudent?.stats?.rate ?? 0,
    text: 'Taza de asistencias'
  }
]
  return (
    <section className="
      mt-6
      md:mt-0
      px-6 py-8 
      w-full 
      md:w-[90%]
      md:max-w-7xl 
      md:mx-auto
      overflow-hidden
    ">

      <div className="flex items-center justify-between">
        <Titlebanner
          title={title}
          currentStudent={currentStudent}
        />

        {/* FILTRO DE HIJOS */}
        <select
          value={selectedStudent}
          onChange={(e) =>
            setSelectedStudent(Number(e.target.value))
          }
          className="
          border-b
        border-borderC
          px-4
          py-3
          outline-none
          ocus:ring-2
        focus:ring-blue-400
          cursor-pointer"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}
              className="bg-transparent border-none"
            >
              {student.name}
            </option>
          ))}
        </select>
      </div>
      {/* CARDS */}
        <AttendanceCards
          attendanceStats={attendanceStats}
          visible={visible}
        />
    </section>
  );
}

export { BannerAttendances }