import { MyTemplate } from "../../templates/myTemplate";
import { BannerAttendances } from "../../organims/attendanceStudent/banner";
import { useEffect, useState } from "react";
import { FiltersAttendancesSection } from "../../organims/attendanceStudent/filterAttendancesSection.jsx";

function AttendanceStudentPage() {
  const [selectedStudent, setSelectedStudent] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const students = [
    {
      id: 1,
      name: "Juan Pérez Atalaya",
      stats: {
        days: 8,
        presents: 6,
        absents: 1,
        late: 1,
        rate: 75,
      },
      attendances: [
        {
          id: 1,
          date: "30 Abr 2026",
          status: "Presente",
          time: "07:55",
        },
        {
          id: 2,
          date: "29 Abr 2026",
          status: "Presente",
          time: "07:52",
        },
        {
          id: 3,
          date: "28 Abr 2026",
          status: "Ausente",
          time: "-",
        },
        {
          id: 4,
          date: "24 Abr 2026",
          status: "Tardanza",
          time: "08:12",
        },
      ],
    },

    {
      id: 2,
      name: "María Pérez Atalaya",
      stats: {
        days: 10,
        presents: 9,
        absents: 0,
        late: 1,
        rate: 90,
      },
      attendances: [
        {
          id: 1,
          date: "30 Abr 2026",
          status: "Presente",
          time: "07:40",
        },
        {
          id: 2,
          date: "29 Abr 2026",
          status: "Presente",
          time: "07:43",
        },
        {
          id: 3,
          date: "28 Abr 2026",
          status: "Tardanza",
          time: "08:10",
        },
      ],
    },
  ];

    
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