import { TitleIconLink } from "../../molecules/titleIconLink"
import { HiDocumentCheck } from "react-icons/hi2";
import { RecentAssists } from "./resentAsssists";

function LeftMain () {
  const title = 'ACTIVIDADES DE HOY'
  return(
      <div className="flex flex-col gap-6 border border-borderC p-5 
        rounded-md
      ">
        <TitleIconLink
        title={title}
        icon={HiDocumentCheck}
        text={'Ver Todo'}
        href='/attendance-control'
        weight='bold'
        siseSmall='xlarge'
      />
      <RecentAssists/>
      </div>
  )
}

export{LeftMain}