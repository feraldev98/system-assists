import { 
  HiOutlineClipboardDocumentList, 
  HiOutlineClipboardDocumentCheck,
  HiOutlineBookOpen
} from "react-icons/hi2"
import { FaUserCheck } from "react-icons/fa";
import { useVisible } from "../../../hooks/hookGlobals/useVisible";
import { TitleIconLink } from "../../molecules/titleIconLink"
import { CardQuickAccess } from "./CardsQuickActions"
import { BehaviorPorcentage } from "./behaviorPorcentage";
import { studentsMock } from "../../../mocks/studentsList";

function RightMain () {
  const title = 'ACCESOS RÁPIDOS'
  const title2 = 'COMPORTAMINETO'

  const {visible} = useVisible(90)
  const totalStudents = studentsMock.length;

  const behaviorGradePorcentage = [
    {
      name: "AD",
      description: "Excelente",
      progress: Math.round(
        (studentsMock.filter(
          student => student.behaviorGrade === "AD"
        ).length / totalStudents) * 100
      ),
    },
    {
      name: "A",
      description: "Bueno",
      progress: Math.round(
        (studentsMock.filter(
          student => student.behaviorGrade === "A"
        ).length / totalStudents) * 100
      ),
    },
    {
      name: "B",
      description: "Regular",
      progress: Math.round(
        (studentsMock.filter(
          student => student.behaviorGrade === "B"
        ).length / totalStudents) * 100
      ),
    },
    {
      name: "C",
      description: "Malo",
      progress: Math.round(
        (studentsMock.filter(
          student => student.behaviorGrade === "C"
        ).length / totalStudents) * 100
      ),
    },
  ];
  
  const quickActions = [
    {
      label: "CONTROL DE INGRESO",
      description: 'Registrar asistencias ',
      icon : <HiOutlineClipboardDocumentCheck size={40}/>,
      href : '/attendance-control'
    },
    {
      label: "COMPORTAMIENTO",
      description: 'Calificar estidante',
      icon : <FaUserCheck size={40}/>,
      href : '/behavior-control'
    }
  ]

  return(
    <section className=" flex flex-col gap-6">
      <div className="
        bg-white rounded-md border border-borderC
        p-6 shadow-sm w-full
      ">
        <TitleIconLink
          title={title}
          icon={HiOutlineClipboardDocumentList}
          weight='bold'
        />
        <CardQuickAccess
          quickActions={quickActions}
        />
      </div>
      <div className=" bg-white border border-borderC shadow-sm 
        rounded-md p-6
      ">
        <TitleIconLink
          title={title2}
          icon={HiOutlineBookOpen}
          weight='bold'
          text='Ver Todo'
          siseSmall='xlarge'
          href='/behavior-control'
        />
        <BehaviorPorcentage
          behaviorGradePorcentage={behaviorGradePorcentage}
        />
      </div>
    </section>
  )
}
export {RightMain}