import { BannerAttendanceAssitant } from "../../organims/attendanceAssitant/banerAttendance";
import { MyTemplate } from "../../templates/myTemplate";
import { StudentCard } from "../../organims/attendanceAssitant/studentCard";
import { Title } from "../../atoms/title";
import { useAttendanceStats } from "../../../hooks/hooksAssistant/useAttendanceStats";
import { StatsCardControl } from "../../organims/attendanceAssitant/starsCard";
import { AttendanceTable } from "../../organims/attendanceAssitant/attendanceTable";
import { useStudents } from "../../../hooks/hooksAssistant/useStudent";
import { useAttendanceControl } from "../../../hooks/hooksAssistant/useAttendance";
import { MdUpdateDisabled } from "react-icons/md";

function AttendanceControlPage () {
  //hook de la lista de estudiantes
  const {students, setStudents} = useStudents()

  //hook actualizar la tabla al escanear y editar el estado 
  const {
    handleScan,
    lastScanned,
    updateStudentStatus
  } = useAttendanceControl(students, setStudents)

  // Calcula las estadísticas generales
  const stats = useAttendanceStats(students);
  
  return(
    <MyTemplate> 
      <BannerAttendanceAssitant
        handleScan= {handleScan}
      />
      <section className="
        w-[96%]
        max-w-7xl
        mx-auto
      ">
        <StatsCardControl
          stats={stats}
        />
        <AttendanceTable
          students={students}
          lastScanned={lastScanned}
          updateStudentStatus={updateStudentStatus}
        />

      </section>
    </MyTemplate>
  )
}

export {AttendanceControlPage}