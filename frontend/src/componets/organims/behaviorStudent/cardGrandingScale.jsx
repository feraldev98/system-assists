import { useVisible } from "../../../hooks/useVisible";
import { Small } from "../../atoms/small"
import { Title } from "../../atoms/title";
import { grandingScale } from "../../../mocks/grandingScale";


function CardGrandingScale() {
  const title = 'ESCALA DE CALIFICACIONES'

  const { visible } = useVisible(90)

  return (
    <div className="
      mt-6 px-2 py-5
      w-[96%] 
      mx-auto
      md:max-w-7xl
      font-poppins
      flex flex-col gap-5
      border border-borderC rounded-md
    ">
      <Title
        level="h3"
        text={title}
        variant="secondary"
        weight="bold"
      />
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6
        transition-all duration-500 
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {grandingScale.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="relative flex bg-white rounded-md p-4 
              shadow-md shadow-blue/20 border border-black/20
              transition-all duration-300 ease-in-out
              hover:-translate-y-1
            ">
              <Icon size={30} className="text-blueT absolute right-2 top-2" />
              <Title
                text={item.value}
                level="h2"
                align="center"
                weight="bold"
                variant="secondary"
                className="min-w-15 my-auto bg-gray-100 h-full flex items-center justify-center"
              />
              <div className="flex flex-col">

                <Title
                  level="h4"
                  text={item.title}
                  weight="bold"
                />
                <Small
                  text={item.description}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { CardGrandingScale }