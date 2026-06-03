import { missionVision } from "../../../mocks/missionVision"
import { Paragraph } from "../../atoms/paragraph"
import { Title } from "../../atoms/title"
import { TitleAndIcon } from "../../molecules/titleAndIcon"

function MisionVision () {

  return(
    <div className="
      w-[96%] 
      md:w-[90%]
      md:max-w-7xl 
      mx-auto
      flex flex-col sm:flex-row gap-5
    ">
      {
        missionVision.map((item, i) => {
          const Icon = item.icon

          return(
            <div 
              key={i}
              className=" px-6 py-6 border flex flex-col gap-3 
              border-borderC/50 rounded-md bg-white "
            >
              <TitleAndIcon
                title={item.title}
                level={'h3'}
                weight={'bold'}
                icon={Icon}
                sizeIcon={20}
              />
              <Paragraph
                text={item.description}
                variant="ternary"
                size="small"
              />
            </div>
          )
        })
      }
    </div>
  )
}

export {MisionVision}