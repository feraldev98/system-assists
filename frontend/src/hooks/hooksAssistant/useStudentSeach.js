import { useMemo, useState } from "react";

export function useStudentSearch(students) {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");

  const filtered = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.student.toLowerCase().includes(search.toLowerCase()) ||
        student.dni.toLowerCase().includes(search.toLowerCase());

      const matchesGrade = grade === "" || student.grade === grade;
      const matchesSection = section === "" || student.section === section;

      return matchesSearch && matchesGrade && matchesSection;
    });
  }, [students, search, grade, section]);

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