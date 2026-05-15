import { LeftOverview } from "./leftOverview";
import { RightOverview } from "./rightOverview";
function Overview({visible}) {

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

  const averageAttendances = [
  {
    name: "PROMEDIO SEMANAL",
    description: "Asistencia de la semana",
    progress: 95,
  },
  {
    name: "PROMEDIO BIMESTRAL",
    description: "Asistencia del bimestre",
    progress: 90,
  },
  {
    name: "PROMEDIO ANUAL",
    description: "Asistencia del año",
    progress: 80,
  },
  {
    name: "COMPORTAMIENTO",
    description: "Nivel de conducta",
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
        />

      {/*COLUMN RIGHT */}
        <RightOverview
          recentResources={recentResources}
          averageAttendances={averageAttendances}
          visible={visible}
        />
      </div>
    </section>
  );
}

export { Overview };