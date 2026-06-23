import { BannerDashboardAssistant } from "../../organims/dashdoardAssistant/bannerAssistant";
import { MyTemplate } from "../../templates/myTemplate";
import { CardStatsAssitant } from "../../organims/dashdoardAssistant/cardStatsAssitant";
import { MainDashboard } from "../../organims/dashdoardAssistant/mainDashboard";
import { useStudents } from "../../../hooks/hooksAssistant/useStudent";
import { useAttendanceControl } from "../../../hooks/hooksAssistant/useAttendance";
import { useAttendanceStats } from "../../../hooks/hooksAssistant/useAttendanceStats";

function DashboardAssitantPage({ useData }) {

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

  return (
    <MyTemplate>
      <BannerDashboardAssistant />
      <CardStatsAssitant
        stats={stats}
      />
      <MainDashboard/>
    </MyTemplate>
  );
}

export { DashboardAssitantPage };