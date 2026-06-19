import { useCallback } from "react";

export function useBehaviorControl(students, setStudents) {

  const updateBehavior = useCallback(
    (dni, behaviorGrade, description) => {

      const updatedStudents = students.map((student) =>
        student.dni === dni
          ? {
              ...student,
              behaviorGrade,
              behaviorDescription: description,
            }
          : student
      );

      setStudents(updatedStudents);

    },
    [students, setStudents]
  );

  return {
    updateBehavior,
  };
}