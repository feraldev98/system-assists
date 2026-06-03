import { CardValues } from "../../molecules/institution/cardValues";
import { TitleAndIcon } from "../../molecules/titleAndIcon";
import { TitleIconLink } from "../../molecules/titleIconLink"
import { FaHandshake } from "react-icons/fa";

function OurValues () {
  const title = 'Nuestros Valores'
  return(
    <section
      className=" flex flex-col gap-3
      w-[96%] 
      md:w-[90%]
      md:max-w-7xl 
      mx-auto
      mt-6
      "
    >
      <TitleAndIcon
        title={title}
        level='h2'
        weight={'bold'}
        icon={FaHandshake}
        sizeIcon={30}
      />
      <CardValues/>
    </section>
  )
}

export {OurValues}