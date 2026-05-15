import { Paragraph } from "../../atoms/paragraph"
import { Small } from "../../atoms/small"

function AttendanceCards({ visible, attendanceStats }) {
  return (
    <div className="
      -mt-10  px-6
      w-full
      mx-auto
      md:max-w-4xl
    ">
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 
        transition-all duration-500 
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {attendanceStats.map((s, i) => (
          <div key={i} className="bg-white rounded-md p-4 
              shadow-md shadow-blue/20 border border-borderC
              transition-all duration-300 ease-in-out
              hover:-translate-y-1
              md:w-40
              lg:w-50
            ">
            <span>{s.icon}</span>
            <Paragraph
              text={s.stats}
            />
            <Small
              text={s.text}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export { AttendanceCards }