import { useState } from "react";
import { Title } from "../../atoms/title";
import { Paragraph } from "../../atoms/paragraph";
import { AttendanceCards } from "./attendanceCard";

function BannerAttendances({ students }) {
  const [selectedStudent, setSelectedStudent] = useState(1);
  const title = `Asistencias de`

  const currentStudent = students.find(
    (student) => student.id === selectedStudent,
  );
 
  const attendanceStats = [
  {
    icon: '',
    stats: currentStudent?.stats?.days ?? 0,
    text: 'Días registrados'
  },
  {
    icon: '',
    stats: currentStudent?.stats?.presents ?? 0,
    text: 'Asistencias'
  },
  {
    icon: '',
    stats: currentStudent?.stats?.late ?? 0,
    text: 'Inasistencias'
  },
  {
    icon: '',
    stats: currentStudent?.stats?.rate ?? 0,
    text: 'Taza de asistencias'
  }
]
  return (
    <section className="
      px-6 py-8 
      w-full 
      md:w-[90%]
      md:max-w-7xl 
      md:mx-auto
      overflow-hidden
    ">

      <div className="flex items-center justify-between">
        <div>
          <Title
            level="h2"
            text={`${title} ${currentStudent.name}`}
          />
          <Paragraph
            text={` Historial de asistencias y estadísticas`}
          />
        </div>
        {/* FILTRO DE HIJOS */}
        <select
          value={selectedStudent}
          onChange={(e) =>
            setSelectedStudent(Number(e.target.value))
          }
          className="border border-gray-300 shadow rounded-xl px-4 py-3 bg-white"
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
        />
    </section>
  );
}

export { BannerAttendances }