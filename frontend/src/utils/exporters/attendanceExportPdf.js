import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportAttendancePdf(
  students,
  grade = "",
  section = ""
) {
  const doc = new jsPDF();

  // FECHA
  const fecha = new Date().toLocaleDateString("es-PE");

  // TITULO
  let titulo = "Consolidado de Asistencias del Día";

  if (grade && section) {
    titulo += ` - ${grade} "${section}"`;
  } else if (grade) {
    titulo += ` - ${grade}`;
  } else if (section) {
    titulo += ` - Sección ${section}`;
  }

  // INSTITUCIÓN
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");

  doc.text(
    "I.E. Coronel Cortegana",
    105,
    15,
    {
      align: "center",
    }
  );

  // TITULO DEL REPORTE
  doc.setFontSize(13);

  doc.text(
    titulo,
    14,
    28
  );

  // FECHA
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Fecha:",
    160,
    28
  );

  doc.text(
    fecha,
    176,
    28
  );

  // TABLA
  autoTable(doc, {
    startY: 38,

    head: [[
      "Estudiante",
      "DNI",
      "Grado",
      "Sección",
      "Estado",
      "Hora",
    ]],

    body: students.map((student) => [
      student.student,
      student.dni,
      student.grade,
      student.section,
      student.status,
      student.time ?? "-"
    ]),

    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },

    alternateRowStyles: {
      fillColor: [243, 244, 246],
    },

    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: "middle",
    },

    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 25 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 30 },
      5: { cellWidth: 20 },
    },

    didParseCell(data) {

      if (data.section === "body" && data.column.index === 4) {

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

  // TOTAL REGISTROS
  const finalY = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");

  doc.text(
    `Total registros: ${students.length}`,
    14,
    finalY
  );

  // PIE DE PÁGINA
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");

  doc.text(
    "|Documento generado automáticamente por System Assists",
    105,
    285,
    {
      align: "center",
    }
  );

  // DESCARGA
  doc.save(
    `Consolidado_Asistencia_${fecha}.pdf`
  );
}