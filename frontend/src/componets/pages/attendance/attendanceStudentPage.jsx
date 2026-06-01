import { MyTemplate } from "../../templates/myTemplate";
import { BannerAttendances } from "../../organims/attendanceStudent/banner";
import { useEffect, useState } from "react";
import { students } from "../../../mocks/students.js";
import { FiltersAttendancesSection } from "../../organims/attendanceStudent/filterAttendancesSection.jsx";

function AttendanceStudentPage() {
  const [selectedStudent, setSelectedStudent] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []); 
    const currentStudent = students.find(
    (student) => student.id === selectedStudent
  );

  return (
    <MyTemplate>
      <BannerAttendances
        students={students}
        visible={visible}
        currentStudent={currentStudent}
        setSelectedStudent={setSelectedStudent}
        selectedStudent={selectedStudent}
      />

      <FiltersAttendancesSection
        students={students}
        currentStudent={currentStudent}
      />
    </MyTemplate>
  );
}

export { AttendanceStudentPage };