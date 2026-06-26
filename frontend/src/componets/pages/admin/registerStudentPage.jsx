import { HeaderRegisterStudent } from "../../organims/adminRegisters/headerRegisterStudent";
import { ListEstudents } from "../../organims/adminRegisters/listStudents";
import { MyTemplate } from "../../templates/myTemplate";

function RegisterStudent () {
  return(
    <MyTemplate> 
      <HeaderRegisterStudent/>
      <ListEstudents/>
    </MyTemplate>
  )
}

export {RegisterStudent}