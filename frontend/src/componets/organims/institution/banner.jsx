import { Paragraph } from "../../atoms/paragraph"
import { Title } from "../../atoms/title"

function InstitutionBanner () {
  const title = 'Sobre Nosotros'
  const description = 'Información institucional y directorio de personal'
  return(
    <section className=" 
      md:mt-0
      py-8 
      w-[96%] 
      md:w-[90%]
      md:max-w-7xl 
      mx-auto
      overflow-hidden">
      <div>
        <Title
          text={title}
          level="h2"
          weight="bold"
        />
        <Paragraph
          text={description}
        />
      </div>
      <div className="
        relative bg-linear-to-br from-darkB to-[#054d6a]
        px-6 py-8 pb-16 mt-6 w-full 
        rounded-md overflow-hidden
      ">
        <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-white/5 z-1" />
        <div className="absolute -bottom-10 right-20 w-40 h-40 rounded-full bg-white/10 z-1" />

        <Title
          text={'Institución Educactiva Coronel Cortegana'}
          weight="bold"
          variant="primary"
        />
        <Paragraph
          text={'Formando líderes del mañana con exelencia académica y valores humanos desde 1937'}
          size="small"
          variant="secondary"
        />
      </div>
    </section>
  )
}

export {InstitutionBanner}