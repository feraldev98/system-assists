import { useVisible } from "../../../hooks/hookGlobals/useVisible"
import { Paragraph } from "../../atoms/paragraph"
import { Small } from "../../atoms/small"

function CardStatsAssitant ({stats}) {

  const { visible } = useVisible()

  return(
    <div className=" -mt-10 px-6 w-full mx-auto
      md:max-w-5xl"
    >
      <div className={` grid grid-cols-2 md:grid-cols-4 gap-3
        transition-all duration-500 
        ${ visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
        }`}
      >
        {
          stats.map((item, i) => {
            return (
              <div 
                key={i}
                className=" flex items-center justify-between
                bg-white rounded-md p-4 
                shadow-md shadow-blue/20 border border-borderC
                transition-all duration-300 ease-in-out
                hover:-translate-y-1
                md:w-40
                lg:w-60
              ">
                <div>
                  <Small
                  text={item.label}
                  size="xlarge"
                />
                <Paragraph
                  text={item.value}
                  weight="bold"
                  size="slogan"
                />
                </div>
                <span>
                  {item.icon}
                </span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export{CardStatsAssitant}