import { useMemo } from "react";

export function useBehaviorStats(students) {

  return useMemo(() => {

    const totalStudents = students.length;

    const totalAD = students.filter(
      student => student.behavior?.behaviorGrade === "AD"
    ).length;

    const totalA = students.filter(
      student => student.behavior?.behaviorGrade === "A"
    ).length;

    const totalB = students.filter(
      student => student.behavior?.behaviorGrade === "B"
    ).length;

    const totalC = students.filter(
      student => student.behavior?.behaviorGrade === "C"
    ).length;

    return [
      {
        name: "AD",
        description: "Logro Destacado",
        className: "text-green-600 bg-green-100/80 border border-green-400",
        total: totalAD,
        progress: Math.round((totalAD / totalStudents) * 100),
      },

      {
        name: "A",
        description: "Logro Esperado",
        className: "text-blue-600 bg-blue-100/80 border border-blue-400",
        total: totalA,
        progress: Math.round((totalA / totalStudents) * 100),
      },

      {
        name: "B",
        description: "En Proceso",
        className: "text-yellow-500 bg-yellow-100/80 border border-yellow-400",
        total: totalB,
        progress: Math.round((totalB / totalStudents) * 100),
      },

      {
        name: "C",
        description: "En Inicio",
        className: "text-red-600 bg-red-100/80 border border-red-400",
        total: totalC,
        progress: Math.round((totalC / totalStudents) * 100),
      },
    ];

  }, [students]);
}