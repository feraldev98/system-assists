import { useCallback } from "react";

export function useBehaviorControl(students, setStudents) {

  const updateBehavior = useCallback((dni, behaviorGrade, description) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.dni === dni
          ? {
              ...student,
              behaviorGrade,
              behaviorDescription: description,
            }
          : student
      )
    );
  }, [setStudents]);

  return {
    updateBehavior,
  };
}