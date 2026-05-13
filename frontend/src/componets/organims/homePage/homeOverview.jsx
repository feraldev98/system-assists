import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  Bell,
} from "lucide-react";
import { LeftOverview } from "./leftOverview";
import { RightOverview } from "./rightOverview";

function Overview({visible}) {
  const institutionalMessages = [
    "ACTIVIDADES INSTITUCIONALES",
    "REUNIONES",
    "LIMITE DE INASISTENCIAS",
  ];

  const pendingTasks = [
    {
      title: "TAREA: Organizador visual",
      days: "2 días",
    },
    {
      title: "CUESTIONARIO: Historia del Peú",
      days: "4 días",
    },
    {
      title: "TAREA: Comprensión Lectora ",
      days: "8 días",
    },
  ];

  const recentResources = [
    {
      title: "TEXTO: Practica-Lógica",
      time: "Hace 3 horas",
    },
    {
      title: "ARCHIVO: PRÁCTICA LÓGICA",
      time: "Hace 3 horas",
    },
    {
      title: "TAREA: Compresión Lectora",
      time: "Hace 3 días",
    },
    {
      title: "ARCHIVO: ROLE-PLAY / DIÁLOGO EN PAREJAS",
      time: "Hace 4 días",
    },
  ];

  const courses = [
    {
      name: "COMUNICACIÓN EMPRESARIAL",
      teacher: "Terrones Chávez Eunici",
      progress: 78,
    },
    {
      name: "DISEÑO GRÁFICO",
      teacher: "Cabos Cabanillas Deiny Emily",
      progress: 66,
    },
    {
      name: "ANIMACIÓN DE GRÁFICOS",
      teacher: "Aliaga Chacón Miguel Fernando",
      progress: 44,
    },
    {
      name: "HERRAMIENTAS MULTIMEDIA",
      teacher: "Cabos Cabanillas Deiny Emily",
      progress: 78,
    },
  ];

  return (
    <section className="
      w-[96%] 
      md:w-[90%]
      md:max-w-7xl 
      mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* COLUMN LEFT*/}
        <LeftOverview
          institutionalMessages={institutionalMessages}
        />

      {/*COLUMN RIGHT */}
        <RightOverview
          pendingTasks={pendingTasks}
          recentResources={recentResources}
          courses={courses}
          visible={visible}
        />
      </div>
    </section>
  );
}

export { Overview };