import { BannerBehaviorAssistant } from "../../organims/behaviorControl/BannerBehaviorAssitant";
import { MyTemplate } from "../../templates/myTemplate";

function BehaviorControlPage () {
  return(
    <MyTemplate> 
      <BannerBehaviorAssistant/>
    </MyTemplate>
  )
}

export {BehaviorControlPage}