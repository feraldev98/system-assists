import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportAttendanceExcel(
  students,
  grade = "",
  section = ""
) {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Consolidado");

  const fecha = new Date().toLocaleDateString("es-PE");

  // TITULOS
  worksheet.mergeCells("A1:F1");

  const institutionCell = worksheet.getCell("A1");
  institutionCell.value = "I.E. Coronel Cortegana";
  institutionCell.font = {
    bold: true,
    size: 16,
  };

  institutionCell.alignment = {
    horizontal: "center",
  };

  // TITULO + FECHA
  let titulo = "Consolidado de Asistencias del Día";

  if (grade && section) {
    titulo += ` - ${grade} "${section}"`;
  } else if (grade) {
    titulo += ` - ${grade}`;
  }

  worksheet.mergeCells("A2:D2");
  worksheet.getCell("A2").value = titulo;
  worksheet.getCell("A2").font = {
    bold: true,
    size: 13,
  };

  worksheet.getCell("E2").value = "Fecha:";
  worksheet.getCell("E2").font = {
    bold: true,
  };

  worksheet.getCell("F2").value = fecha;

  // CABECERA DE LA TABLA

  worksheet.addRow([]);

  const headerRow = worksheet.addRow([
    "Estudiante",
    "DNI",
    "Grado",
    "Sección",
    "Estado",
    "Hora",
  ]);

  headerRow.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: {
        argb: "FFFFFFFF",
      },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "2563EB",
      },
    };

    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
      bottom: { style: "thin" },
    };
  });

  // FILAS
  students.forEach((student, index) => {
    const row = worksheet.addRow([
      student.student,
      student.dni,
      student.grade,
      student.section,
      student.status,
      student.time ?? "-",
    ]);

    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" },
      };

      if (index % 2 === 0) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "F3F4F6",
          },
        };
      }
    });

    // Color según estado
    const statusCell = row.getCell(5);

    if (student.status === "present") {
      statusCell.font = {
        color: { argb: "008000" },
        bold: true,
      };
    }

    if (student.status === "late") {
      statusCell.font = {
        color: { argb: "D97706" },
        bold: true,
      };
    }

    if (student.status === "absent") {
      statusCell.font = {
        color: { argb: "DC2626" },
        bold: true,
      };
    }
  });

  // ANCHO DE COLUMNAS
  worksheet.columns = [
    { width: 35 },
    { width: 15 },
    { width: 12 },
    { width: 12 },
    { width: 15 },
    { width: 15 },
  ];

  // TOTAL REGISTROS
  worksheet.addRow([]);

  const totalRow = worksheet.addRow([
    `Total registros: ${students.length}`,
  ]);

  totalRow.font = {
    bold: true,
  };

  // PIE DE PAGINA
  worksheet.addRow([]);

  const footerRow = worksheet.addRow([
    "Documento generado automáticamente por System Assists",
  ]);

  footerRow.font = {
    italic: true,
    size: 10,
  };

  footerRow.alignment = {
    horizontal: "center",
  };

  // CONGELAR CABECERA
  worksheet.views = [
    {
      state: "frozen",
      ySplit: 4,
    },
  ];

  // DESCARGA
  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Consolidado_Asistencia_${fecha}.xlsx`
  );
}