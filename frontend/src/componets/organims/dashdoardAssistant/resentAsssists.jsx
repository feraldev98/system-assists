import { Paragraph } from "../../atoms/paragraph"
import { Small } from "../../atoms/small"
import { Title } from "../../atoms/title"
import { activityConfig } from "../../../mocks/recentActivity"
import { useVisible } from "../../../hooks/hookGlobals/useVisible"
import { useStudents } from "../../../hooks/hooksAssistant/useStudent"

function RecentAssists() {

  const {visible} = useVisible(90)
  const {students} = useStudents()

  //filtrar los mas receintes por hora y fecha
  const recentActivities = [...students]
  .sort((a, b) => {
    const dateA = new Date(
      `${a.attendance.date} ${a.attendance.time || "08:00"}`
    );
    const dateB = new Date(
      `${b.attendance.date} ${b.attendance.time || "08:00"}`
    );
    return dateB - dateA;
  })
  .slice(0, 5);

  return (
    <div className="flex flex-col gap-2 font-hani">
      {
        recentActivities.map((assist) => {
           //asignamos valor y color al estado para mostrarlo 
          const config = activityConfig[assist.attendance.status];
          return (
            <div key={assist.id} className= {`
              flex items-center justify-between py-2 px-3 bg-white border 
            border-borderC/30 rounded-md shadow 
              transition-all duration-300
              hover:-translate-y-1 hover:bg-blueT/10
              ${ visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
              }
            `}>
              <div className="flex items-center">
                <div className={`
                  h-3 w-3 rounded-full
                  ${config.className}
                  mr-4
                  `}/>
                <div>
                  <Title
                    level="h4"
                    text={assist.student}
                  />
                  <Paragraph
                    text={config.label}
                    variant="primary"
                    size="small"
                  />
                  <Small
                    text={assist.attendance.date}
                  />
                </div>
              </div>
              <Small
                text={` ${assist.attendance.time || "Sin registro"}`}
                size="large"
                variant="secondary"
              />
            </div>
          )
        })
      }
    </div>
  )
}

export { RecentAssists }