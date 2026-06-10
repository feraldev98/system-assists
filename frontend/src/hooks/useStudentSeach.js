import { useState } from "react";

// Hook encargado de la búsqueda y filtrado de estudiantes.

export function useStudentSearch(students) {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");

  const filtered = students.filter((student) => {
    const matchesSearch =
      student.student
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.dni
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesGrade =
      grade === "" || student.grade === grade;

    const matchesSection =
      section === "" || student.section === section;

    return (
      matchesSearch &&
      matchesGrade &&
      matchesSection
    );
  });

  return {
    search,
    setSearch,

    grade,
    setGrade,

    section,
    setSection,

    filtered,
  };
}