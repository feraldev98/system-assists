import { BannerDashboardAssistant } from "../../organims/dashdoardAssistant/bannerAssistant";
import { MyTemplate } from "../../templates/myTemplate";
import { studentsMock } from "../../../mocks/studentsList";
import { LuUsers } from "react-icons/lu";
import { FaUserCheck, FaUsers, FaUserTimes } from "react-icons/fa";
import { TbClockHour8Filled } from "react-icons/tb";
import { CardStatsAssitant } from "../../organims/dashdoardAssistant/cardStatsAssitant";
import { MainDashboard } from "../../organims/dashdoardAssistant/mainDashboard";

function DashboardAssitantPage({ useData }) {

  // Verificar estado según hora de llegada
  const getAttendanceStatus = (time) => {
    if (!time) return "absent";
    if (time < "07:30") {
      return "present";
    }
    if (time < "08:00") {
      return "late";
    }
    return "absent";
  };

  // Estadísticas
  const totalStudents = studentsMock.length;

  const presentStudents = studentsMock.filter(
    (student) => getAttendanceStatus(student.time) === "present"
  ).length;

  const lateStudents = studentsMock.filter(
    (student) => getAttendanceStatus(student.time) === "late"
  ).length;

  const absentStudents = studentsMock.filter(
    (student) => getAttendanceStatus(student.time) === "absent"
  ).length;

  const stats = [
    {
      label: "Total Estudiantes",
      value: totalStudents,
      icon: <FaUsers size={35} className="text-blue-500"/>
    },
    {
      label: "Presentes Hoy",
      value: presentStudents,
      icon : <FaUserCheck size={30}  className="text-green-500"/>
    },
    {
      label: "Tardanzas Hoy",
      value: lateStudents,
      icon : <TbClockHour8Filled size={30} className="text-yellow-500"/>
    },
    {
      label: "Ausentes Hoy",
      value: absentStudents,
      icon: <FaUserTimes size={30} className="text-red-500"/>
    },
  ];

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