import { HeaderRegisterUser } from "../../organims/adminRegisters/headerRegisterUser";
import { MyTemplate } from "../../templates/myTemplate";

function RegisterUser () {
  return(
    <MyTemplate> 
      <HeaderRegisterUser/>
    </MyTemplate>
  )
}

export {RegisterUser}