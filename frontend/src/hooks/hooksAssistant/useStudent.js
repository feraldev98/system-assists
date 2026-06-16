import { useState } from "react";
import { studentsMock } from "../../mocks/studentsList";

export function useStudents() {
  const [students, setStudents] = useState(studentsMock);

  return {
    students,
    setStudents,
  };
}