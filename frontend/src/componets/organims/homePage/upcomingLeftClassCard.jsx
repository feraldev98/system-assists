import { Title } from "../../atoms/title"
import { Paragraph } from "../../atoms/paragraph"
import { Small } from "../../atoms/small"

function UpcomingClassCard({ upcomingClasses }) {
  return (
    <div className="flex flex-col gap-4 font-poppins">
      {upcomingClasses.map((item, i) => (
        <div
          key={i}
          className="
                    border border-gray-200 rounded-xl
                    p-4 flex gap-4
                    hover:shadow-md transition-all
                  "
        >
          {/* FECHA */}
          <div
            className="
                  min-w-[70px]
                  text-center border-r border-gray-200 pr-4"
          >
            <Paragraph
              text={item.date}
              weight="bold"
              align="center"
            />
            <Small
              text={item.day}
            />
          </div>
          {/* INFO */}
          <div className="flex-1">
            <Small
              text={item.hour}
            />
            <Title 
              level="h4"
              text={item.course}
            />
            <Paragraph 
              className=" mt-1"
              text={item.teacher}
              size="small"
              variant="danger"
            />
            <Small 
              text={`Aula: ${item.classroom}`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export { UpcomingClassCard }