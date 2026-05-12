import { MyTemplate } from "../templates/myTemplate"
import { Banner } from "../organims/homePage/banner"
import { useEffect, useState } from "react"
import { CalendarRange } from "lucide-react"
import { CardStats } from "../organims/homePage/cardStats"
import { Overview } from "../organims/homePage/homeOverview"


function HomePage({ userData }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  // normalización de rol
  const ROLE_MAP = {
    docente: 'docente',
    teacher: 'docente',

    administrador: 'administrador',
    admin: 'administrador',

    alumno: 'alumno',
    student: 'alumno',

    auxiliar: 'auxiliar',
  }
  const rawRol = userData?.rol?.toLowerCase().trim()
  const rol = ROLE_MAP[rawRol] || rawRol || 'alumno'

  const quickLinks = {
    alumno: [
      { label: 'Mi horario', path: '/students/schedules', desc: 'Ver clases de la semana' },
      { label: 'Mis cursos', path: '/students/courses', desc: 'Material y tareas' },
      { label: 'Calificaciones', path: '/students/grades', desc: 'Ver mis notas' },
      { label: 'Asistencia', path: '/students/attendance', desc: 'Historial de asistencias' },
    ],
    docente: [
      { label: 'Mis cursos', path: '/teachers/courses', desc: 'Gestionar contenido' },
      { label: 'Horario', path: '/teachers/schedule', desc: 'Ver carga académica' },
      { label: 'Evaluaciones', path: '/teachers/evaluations', desc: 'Registrar notas' },
      { label: 'Asistencia aula', path: '/attendance/classroom', desc: 'Registrar presencia' },
    ],
    auxiliar: [
      { label: 'Registro entrada', path: '/attendance/entry', desc: 'Control de acceso' },
      { label: 'Asistencia aula', path: '/attendance/classroom', desc: 'Por curso' },
    ],
    administrador: [
      { label: 'Cursos', path: '/teachers/courses', desc: 'Gestión general' },
      { label: 'Evaluaciones', path: '/teachers/evaluations', desc: 'Reportes' },
      { label: 'Asistencias', path: '/attendance/entry', desc: 'Control general' },
      { label: 'Institución', path: '/aboutUs', desc: 'Información institucional' },
    ],
  }

  const stats = [
    { label: 'Cursos activos', value: '10' },
    { label: 'Promedio general', value: '17' },
    { label: 'Tareas pendientes', value: '3' },
    { label: 'Asistencia promedio', value: '94%' },
  ]

  const links = quickLinks[rol] || quickLinks.alumno

  const greetingLabel = {
    alumno: 'Estudiante',
    docente: 'Docente',
    auxiliar: 'Auxiliar',
    administrador: 'Administrador',
  }[rol] || 'Usuario'

  const hora = new Date().getHours()
  const saludo =
    hora < 12 ? 'Buenos días' : hora < 18 ? 'Buenas tardes' : 'Buenas noches'


  return (
    <MyTemplate>
      <Banner
        greetingLabel={greetingLabel}
        userData={userData}
        visible={visible}
        saludo={saludo}
      />
      <CardStats
        visible={visible}
        stats={stats}
      />
      <Overview
        visible={visible}
      />
    </MyTemplate>
  )
}

export { HomePage }