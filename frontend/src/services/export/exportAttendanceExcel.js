import { exportExcel } from "../../utils/exports/exportExcel";

export async function exportAttendanceExcel(students) {
  await exportExcel({
    title: "Consolidado de Asistencias del Día",
    fileName: "Consolidado_Asistencia",
    //Encabezados de la tabla a exportar
    headers: [
      "Estudiante",
      "DNI",
      "Grado",
      "Sección",
      "Estado",
      "Hora",
    ],
    //datss del esstudinate a exportar 
    columnsWidth: [35, 15, 12, 12, 15, 15],
    data: students.map((student) => [
      student.student,
      student.dni,
      student.grade,
      student.section,
      student.status,
      student.time ?? "-",
    ]),

    //Estilos del estado
    getCellStyle: ({ item, colNumber }) => {
      if (colNumber === 5) {
        if (item.status === "present") {
          return {
            font: {
              color: { argb: "008000" },
              bold: true,
            },
          };
        }

        if (item.status === "late") {
          return {
            font: {
              color: { argb: "D97706" },
              bold: true,
            },
          };
        }

        if (item.status === "absent") {
          return {
            font: {
              color: { argb: "DC2626" },
              bold: true,
            },
          };
        }
      }
    },
  });
}