import { MyTemplate } from "../../templates/myTemplate";
import { BannerBehavior } from "../../organims/behaviorStudent/bannerBehavior";
import { useState } from "react";
import { CardGrandingScale } from "../../organims/behaviorStudent/cardgrandingScale";
import { FilterBehavior } from "../../organims/behaviorStudent/filtersBehavior";
import { students } from "../../../mocks/students";

function BehaviorStudentPage () {

const [selectedStudent, setSelectedStudent] = useState(1)

  const currentStudent = students.find(
    (student) => student.id === selectedStudent
  )

  return(
    <MyTemplate> 
      <BannerBehavior
        currentStudent={currentStudent}
        setSelectedStudent= {setSelectedStudent}
        selectedStudent= {selectedStudent}
        students = { students}
      />
      <CardGrandingScale/>
      <FilterBehavior
        currentStudent={currentStudent}
      />
    </MyTemplate>
  )
}

export {BehaviorStudentPage}