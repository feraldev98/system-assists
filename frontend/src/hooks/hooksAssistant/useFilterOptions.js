import { useMemo } from "react";

// Hook encargado de generar las opciones
// de grados y secciones para los filtros.
export function useFilterOptions(students = []) {

  const gradeOptions = useMemo(
    () => [
      {
        text: "Grados",
        value: "",
      },

      ...[...new Set(
        students.map((student) => student.grade)
      )].map((grade) => ({
        text: grade,
        value: grade,
      })),
    ],
    [students]
  );

  const sectionOptions = useMemo(
    () => [
      {
        text: "Secciones",
        value: "",
      },

      ...[...new Set(
        students.map((student) => student.section)
      )].map((section) => ({
        text: section,
        value: section,
      })),
    ],
    [students]
  );

  return {
    gradeOptions,
    sectionOptions,
  };
}