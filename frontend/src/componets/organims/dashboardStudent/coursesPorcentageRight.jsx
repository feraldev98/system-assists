import { Title } from "../../atoms/title"

function CoursesPorsentages({averageAttendances}) {
  return (
    <div className="flex flex-col gap-6">
      {averageAttendances.map((attendance, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-2 gap-4">
            <Title 
              level="h5"
              text={attendance.name}
            />
            <span className="text-sm text-gray-500">
              {attendance.description}
            </span>
          </div>

          {/* BARRA */}
          <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="
                        h-full rounded-full
                        bg-gradient-to-r from-cyanO to-cyan-500
                        flex items-center justify-center
                        text-white text-xs font-semibold
                      "
              style={{
                width: `${attendance.progress}%`,
              }}
            >
              {attendance.progress}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { CoursesPorsentages }