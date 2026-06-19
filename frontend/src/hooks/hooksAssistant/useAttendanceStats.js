// Hook encargado de calcular las estadísticas
// del control de asistencia.

export function useAttendanceStats(students) {

  const stats = {
    total: students.length,
    present: students.filter(
      student => student.attendance.status === "present"
    ).length,

    late: students.filter(
      student => student.attendance.status === "late"
    ).length,

    absent: students.filter(
      student => student.attendance.status === "absent"
    ).length,
  };

  return stats;

}