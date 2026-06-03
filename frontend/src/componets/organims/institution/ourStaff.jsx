import { Title } from "../../atoms/title";
import { TitleAndIcon } from "../../molecules/titleAndIcon"
import { FaUsers } from "react-icons/fa";
import { administrativeTeam, assistantTeam } from "../../../mocks/ourStaff";
import { CardOurStaff } from "./cardOurStaff";

function OurStaff () {
  const title = 'Nuestro Personal'
  const subTitleOne = 'Administrativos'
  const subTitletwo = 'Auxiliares'
  return(
    <section 
      className=" w-[96%] md:w-[90%] md:max-w-7xl mx-auto mt-6"
    >
      <TitleAndIcon
        level='h2'
        title={title}
        icon={FaUsers}
        sizeIcon={30}
        weight='bold'
      />
      
      <CardOurStaff
        title={subTitleOne}
        staffList={administrativeTeam}
      />

      <CardOurStaff
        title={subTitletwo}
        staffList={assistantTeam}
      />
    </section>
  )
}

export {OurStaff}