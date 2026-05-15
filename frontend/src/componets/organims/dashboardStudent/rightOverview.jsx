import { HiOutlineBookOpen, HiOutlineClipboardDocumentList} from "react-icons/hi2";
import { QuickAccess } from "./quickAccess";
import { TitlesHomeOverview } from "../../molecules/dashboardStudent/titleshomeOverview";
import { Link } from "../../atoms/link"
import { CoursesPorsentages } from "./coursesPorcentageRight"
import { href } from "react-router-dom";

function RightOverview ({ averageAttendances, visible  }) {
  const title = 'ACCESOS RÁPIDOS'
  const title3 = 'PROMEDIO ASISTENCIAS'
  const quickAccess = [
    {
      title: "Asitencias",
      days: "Historial completo",
      href: ''
    },
    {
      title: "Comportamiento",
      days: "Calificaciones",
      href: ''
    },
    {
      title: "Institución ",
      days: "información",
      href: ''
    },
  ];
  return(
    <div className="flex flex-col gap-6">

          {/* ACCESOS RÁPIDOS */}
          <div className={` bg-white rounded-md border border-borderC p-6 shadow-sm w-full
            `}>
            <TitlesHomeOverview
              title={title}
              icon={HiOutlineClipboardDocumentList}
            />
            <QuickAccess
                visible={visible}
              quickAccess={quickAccess}
            />
          </div>

          {/* CURSOS */}
          <div 
            className={`bg-white rounded-md border border-borderC p-6 shadow-sm
              transition-all duration-500
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
            `}>
            <div className="flex items-center justify-between mb-6">
              <TitlesHomeOverview
                title={title3}
                icon={HiOutlineBookOpen}
                text={'Ver Todo'}
              />
            </div>
              <CoursesPorsentages
                averageAttendances={averageAttendances}
              />
          </div>
        </div>
  )
}

export {RightOverview}