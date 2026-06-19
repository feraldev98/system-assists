import { useCallback, useState } from "react";
import { formatTime } from "../../utils/attendanceUtils";
import { apiFetch } from "../../helpers/apiFetch";

export function useAttendanceControl(students, setStudents) {

  const [lastScanned, setLastScanned] = useState(null);
  //ACtualizar estado de la asistencia
  const updateStudentStatus = useCallback((dni, newStatus) => {
  const now = new Date();
  const time = formatTime(now);
  const date = now.toISOString().split("T")[0];

  setStudents((prev) =>
    prev.map((student) =>
      student.dni === dni
        ? {
            ...student,
            attendance: {
              ...student.attendance,
              status: newStatus,
              time,
              date,
            },
          }
        : student
    )
  );

  setLastScanned((prev) =>
    prev?.dni === dni
      ? {
          ...prev,
          attendance: {
            ...prev.attendance,
            status: newStatus,
            time,
            date,
          },
        }
      : prev
  );
}, [setStudents]);

  const handleScan = useCallback(async (qrCode) => {
    const now = new Date();
    const time = formatTime(now);
    const date = now.toISOString().split("T")[0];

    const found = students.find((s) => s.dni === qrCode);

    const newStatus = "present";

    setStudents((prev) =>
      prev.map((s) =>
        s.dni === qrCode
          ? { ...s, status: newStatus, time, date }
          : s
      )
    );

    setLastScanned(
      found
        ? { ...found, status: newStatus, time }
        : {
            dni: qrCode,
            student: "Estudiante no encontrado",
            status: "absent",
            time
          }
    );

    const result = await apiFetch("/api/attendance", "POST", {
      dni: qrCode,
      status: newStatus,
      time,
      date,
    });

    if (result?.student) {
      setStudents((prev) =>
        prev.map((s) =>
          s.dni === qrCode
            ? { ...s, ...result.student }
            : s
        )
      );

      setLastScanned({
        ...result.student,
        time,
      });
    }
  }, [students, setStudents]);

  return {
    handleScan,
    updateStudentStatus,
    lastScanned,
  };
}