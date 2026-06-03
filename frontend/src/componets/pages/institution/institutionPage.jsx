import { InstitutionBanner } from "../../organims/institution/banner";
import { MisionVision } from "../../organims/institution/missionVision";
import { OurStaff } from "../../organims/institution/ourStaff";
import { OurValues } from "../../organims/institution/ourValues";
import { MyTemplate } from "../../templates/myTemplate";

function InstitutionPage () {
  return(
    <MyTemplate>
      <InstitutionBanner/>
      <MisionVision/>
      <OurValues/>
      <OurStaff/>
    </MyTemplate>
  )
}

export {InstitutionPage}