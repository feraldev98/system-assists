import { useState } from "react";
import { attendanceMock } from "../../mocks/attendanceList";
import { behaviorMock } from "../../mocks/behavivorList";
import {studentsMock} from "../../mocks/studentsList"

export function useStudents() {
  const [students, setStudents] = useState(() =>
    studentsMock.map((student) => ({
      ...student,

      attendance:
        attendanceMock.find(
          (attendance) => attendance.studentId === student.id
        ) ?? null,

      behavior:
        behaviorMock.find(
          (behavior) => behavior.studentId === student.id
        ) ?? null,
    }))
  );

  return {
    students,
    setStudents,
  };
}