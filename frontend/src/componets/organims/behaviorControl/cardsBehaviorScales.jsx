import { useVisible } from "../../../hooks/hookGlobals/useVisible"
import { Small } from "../../atoms/small"
import { Title } from "../../atoms/title"

function CardsScales({ behaviorStatics }) {

  const { visible } = useVisible(90)

  return (
    <div
      className=" mt-8  mx-auto w-[96%] md:max-w-6xl "
    >
      <div
        className={`
          grid grid-cols-2 md:grid-cols-4 gap-3
          transition-all duration-500
          ${visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
          }
        `}
      >
        {
          behaviorStatics.map((item, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-4 item-center justify-between bg-white rounded-md p-4
                shadow-md shadow-blue/20 border border-borderC
                transition-all duration-300 ease-in-out
                hover:-translate-y-1
                w-full
                "
              >
                <div className="flex items-start justify-between w-full">
                  {/*Calificacion y porcentaje */}
                  <Title
                    text={item.name}
                    weight="bold"
                    level="h2"
                    className={`${item.className} px-3 rounded-md`}
                  />
                  <span className="text-blue font-bold">
                    {item.progress}%
                  </span>
                </div>

                {/*Descripcion y barra */}
                <div className="flex flex-col gap-2" >
                  <Small
                    text={item.description}
                  />
                  <div className=" w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="
                      h-full rounded-full
                      bg-linear-to-r from-cyanO to-cyan-500
                      flex items-center justify-center
                    "
                      style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export { CardsScales }