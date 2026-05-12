import { Title } from "../../atoms/title";
import { IEMessage } from "../../molecules/homePage/cardLeftIEMessage";
import { UpcomingClassCard } from "./upcomingLeftClassCard";

function LeftOverview({institutionalMessages}) {
  const title = 'PRÓXIMAS CLASES'
    const upcomingClasses = [
    {
      date: "May. 8",
      day: "vie.",
      hour: "13:00 - 17:50",
      course: "GESTIÓN Y ADMINISTRACIÓN WEB",
      teacher: "Miguel Fernando Aliaga Chacón",
      classroom: "AULA - IVB",
    },
    {
      date: "May. 11",
      day: "lun.",
      hour: "13:00 - 14:30",
      course: "HERRAMIENTAS MULTIMEDIA",
      teacher: "Deiny Emily Cabos Cabanillas",
      classroom: "AULA - IVB",
    },
    {
      date: "May. 11",
      day: "lun.",
      hour: "14:30 - 16:00",
      course: "ANIMACIÓN DE GRÁFICOS",
      teacher: "Miguel Fernando Aliaga Chacón",
      classroom: "AULA - IVB",
    },
  ];
  return (
    <section className="flex flex-col gap-6">

      {/* MENSAJES */}
      <IEMessage
        institutionalMessages={institutionalMessages}
      />
      {/* PRÓXIMAS CLASES */}
      <div className="bg-white rounded-md border border-borderC p-6 shadow-sm">
          <Title 
            text={title}
            level="h4"
            className=" mb-5"
          />
         {/*TARJETA DE LAS PROXIMAS CLASES */}
          <UpcomingClassCard
            upcomingClasses={upcomingClasses}
          />
      </div>
    </section>
  )
}

export {LeftOverview}