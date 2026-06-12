import { exportPdf } from "../../utils/exports/exportPdf";

export function exportAttendancePdf(
  students,
  grade = "",
  section = ""
) {

  let title = "Consolidado de Asistencias del Día";

  if (grade && section) {
    title += ` - ${grade} "${section}"`;
  }
  else if (grade) {
    title += ` - ${grade}`;
  }
  else if (section) {
    title += ` - Sección ${section}`;
  }

  exportPdf({

    title,

    fileName: "Consolidado_Asistencia",

    headers: [
      "Estudiante",
      "DNI",
      "Grado",
      "Sección",
      "Estado",
      "Hora",
    ],

    body: students.map(student => [
      student.student,
      student.dni,
      student.grade,
      student.section,
      student.status,
      student.time ?? "-"
    ]),

    totalRecords: students.length,

    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 25 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 30 },
      5: { cellWidth: 20 },
    },

    didParseCell(data) {

      if (
        data.section === "body" &&
        data.column.index === 4
      ) {

        const estado = data.cell.raw;

        if (estado === "present") {

          data.cell.styles.textColor = [34, 197, 94];
          data.cell.styles.fontStyle = "bold";
        }

        if (estado === "late") {

          data.cell.styles.textColor = [217, 119, 6];
          data.cell.styles.fontStyle = "bold";
        }

        if (estado === "absent") {

          data.cell.styles.textColor = [220, 38, 38];
          data.cell.styles.fontStyle = "bold";
        }
      }
    }

  });

}