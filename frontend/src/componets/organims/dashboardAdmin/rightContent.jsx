import { TitleIconLink } from "../../molecules/titleIconLink"
import { FaUsers } from "react-icons/fa6";
import { AttendanceByGrade } from "./attendanceByGrade";

function RightContent () {
  const title = 'ASISTENCIA POR GRADO'
  
  const attendanceByGrade = [
    {
      text: '1er Grado',
      present: 185,
      late: 8,
      absent: 7,
      totalStudents: 200,
      colors: {
        present: '#00d26a',
        late: '#f5c211',
        absent: '#ff4040',
    },
    },
    {
      text: '2do Grado',
      present: 167,
      late: 6,
      absent: 7,
      totalStudents: 180,
      colors: {
        present: '#00d26a',
        late: '#f5c211',
        absent: '#ff4040',
    },
    },
    {
      text: '3er Grado',
      present: 225,
      late: 9,
      absent: 6,
      totalStudents: 240,
      colors: {
        present: '#00d26a',
        late: '#f5c211',
        absent: '#ff4040',
    },
    },
    {
      text: '4to Grado',
      present: 205,
      late: 8,
      absent: 7,
      totalStudents: 220,
      colors: {
        present: '#00d26a',
        late: '#f5c211',
        absent: '#ff4040',
    },
    },
    {
      text: '5to Grado',
      present: 140,
      late: 4,
      absent: 6,
      totalStudents: 150,
      colors: {
        present: '#00d26a',
        late: '#f5c211',
        absent: '#ff4040',
    },
    },
  ];
  return(
    <section className="flex flex-col border border-borderC p-5 rounded-md">
      <TitleIconLink
        title={title}
        icon={FaUsers}
        text='Ver Todo'
        href='/attendace-control'
        weight='bold'
        siseSmall='xlarge'
      />
      <AttendanceByGrade
        attendanceByGrade={attendanceByGrade}
      />
    </section>
  )
}

export {RightContent}