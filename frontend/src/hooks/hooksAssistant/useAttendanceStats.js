// Hook encargado de calcular las estadísticas
// del control de asistencia.

export function useAttendanceStats(students) {

  const stats = {
    total: students.length,
    present: students.filter(
      student => student.status === "present"
    ).length,

    late: students.filter(
      student => student.status === "late"
    ).length,

    absent: students.filter(
      student => student.status === "absent"
    ).length,
  };

  return stats;

}