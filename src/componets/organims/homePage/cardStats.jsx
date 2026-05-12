import { Paragraph } from "../../atoms/paragraph"

function CardStats ({visible, stats }) {

  return(
    <div className="
      -mt-10  px-6
      w-full
      mx-auto
      md:max-w-4xl
    ">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-md p-4 
              shadow-md shadow-blue/20 border border-borderC
              md:w-40
              lg:w-50
            ">
              <Paragraph 
                text={s.value}
                weight="bold"
                size="large"
                variant="danger"
              />
              <small className="text-xs text-gray-500">{s.label}</small>
            </div>
          ))}
        </div>
      </div>
  )
}

export {CardStats}