import { ourValues } from "../../../mocks/ourValues"
import { Small } from "../../atoms/small"
import { Title } from "../../atoms/title"

function CardValues () {
  return(
    <div className=" w-full grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5">
      {
        ourValues.map((value, v) => {
          return(
            <div className=" bg-white py-3 px-3 rounded-md border border-borderC/30
              transition-all duration-300 ease-in-out font-hani 
              hover:-translate-y-1 hover:shadow-lg shadow-blue
            ">
              <Title
                level="h5"
                text={value.title}
                weight="bold"
              />
              <Small
                text={value.Paragraph}
                size="large"
              />
            </div>
          )
        })
      }
    </div>
  ) 
}

export {CardValues}