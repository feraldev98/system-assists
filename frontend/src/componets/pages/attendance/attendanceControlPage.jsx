import { BannerAttendanceAssitant } from "../../organims/attendanceAssitant/banerAttendance";
import { MyTemplate } from "../../templates/myTemplate";
import { StudentCard } from "../../organims/attendanceAssitant/studentCard";
import { Title } from "../../atoms/title";
import { useAttendanceStats } from "../../../hooks/useAttendanceStats";
import { StatsCardControl } from "../../organims/attendanceAssitant/starsCard";
import { AttendanceTable } from "../../organims/attendanceAssitant/attendanceTable";
import { useAttendanceControl } from "../../../hooks/useAttendance";

function AttendanceControlPage () {
  const {
    students
  } = useAttendanceControl()

  // Calcula las estadísticas generales
  const stats = useAttendanceStats(students);
  
  return(
    <MyTemplate> 
      <BannerAttendanceAssitant/>
      <section className="
        w-[96%]
        max-w-7xl
        mx-auto
      ">
        <StatsCardControl
          stats={stats}
        />
        <AttendanceTable/>

      </section>
    </MyTemplate>
  )
}

export {AttendanceControlPage}