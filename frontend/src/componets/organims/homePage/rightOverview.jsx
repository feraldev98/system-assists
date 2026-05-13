import { BookOpen, ClipboardList, FileText } from "lucide-react"
import { PendingTasks } from "./pendingTasksRight"
import { TitlesAndIcon } from "../../molecules/homePage/titleAndIcon"
import { RecentResources } from "./recentResourcesRight"
import { Link } from "../../atoms/link"
import { CoursesPorsentages } from "./coursesPorcentageRight"

function RightOverview ({pendingTasks,recentResources, courses, visible  }) {
  const title = 'RECURSOS VIRTUALES PENDIENTES'
  const title2 = 'RECURSOS VIRTUALES RECIENTES'
  const title3 = 'CURSOS VIRTUALES'
  return(
    <div className="flex flex-col gap-6">

          {/* TAREAS */}
          <div className="bg-white rounded-md border border-borderC p-6 shadow-sm">
            <TitlesAndIcon
              title={title}
              icon={ClipboardList}
            />
            <PendingTasks
              pendingTasks={pendingTasks}
            />
          </div>

          {/* RECURSOS */}
          <div className="bg-white rounded-md border border-borderC p-6 shadow-sm">
            <TitlesAndIcon
              title={title2}
              icon={FileText}
            />
            <RecentResources
              recentResources={recentResources}
            />
          </div>

          {/* CURSOS */}
          <div 
            className={`bg-white rounded-md border border-borderC p-6 shadow-sm
              transition-all duration-500
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
            `}>
            <div className="flex items-center justify-between mb-6">
              <TitlesAndIcon
                title={title3}
                icon={BookOpen}
              />
              <Link
                href='/students/courses'
                text='Ver Todos'
              />
            </div>
              <CoursesPorsentages
                courses={courses}
              />
          </div>
        </div>
  )
}

export {RightOverview}