import { exportExcel } from "../../utils/exports/exportExcel";

export async function exportBehaviorExcel (students) {
  await exportExcel ({
    title : 'Consolidado de Comportamientos del Día',
    fileName : 'Consolidado_Comportamientos',

    //Encabezados de la tabla a exportar
    headers: [
      "Estudiante",
      "DNI",
      "Grado",
      "Sección",
      "Calificación",
    ],

    //Datos del estudiante a exportar

    columnsWidth : [40, 20, 12, 12,12],
    data: students.map((student) => [
      student.student,
      student.dni,
      student.grade,
      student.section,
      student.behavior.behaviorGrade
    ])
  })
}