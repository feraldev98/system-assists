import { Paragraph } from "../../atoms/paragraph"
import { Small } from "../../atoms/small"

function AttendanceCards({ visible, attendanceStats }) {
  return (
    <div className="
      w-full
      mt-7
    ">
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6
        transition-all duration-500 
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {attendanceStats.map((item, i) => (
          <div key={i} className="bg-white rounded-md p-4 
              shadow-md shadow-blue/20 border border-black/20
              transition-all duration-300 ease-in-out
              hover:-translate-y-1
            ">
            <span>{item.icon}</span>
            <Paragraph
              text={item.stats}
              size="large"
              weight="bold"
            />
            <Small
              text={item.text}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export { AttendanceCards }