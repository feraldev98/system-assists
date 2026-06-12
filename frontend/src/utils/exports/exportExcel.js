import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportExcel({
  sheetName = "Consolidado",
  institution = "I.E. Coronel Cortegana",
  title = "",
  fileName = "Reporte",
  headers = [],
  data = [],
  columnsWidth = [],
  totalLabel = "Total registros",
  footerText = "Documento generado automáticamente por System Assists",
  getCellStyle = null,
}) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  const fecha = new Date().toLocaleDateString("es-PE");

  // TITULO INSTITUCION
  worksheet.mergeCells(1, 1, 1, headers.length);

  const institutionCell = worksheet.getCell(1, 1);

  institutionCell.value = institution;
  institutionCell.font = {
    bold: true,
    size: 16,
  };

  institutionCell.alignment = {
    horizontal: "center",
  };

  // TITULO REPORTE
  worksheet.mergeCells(2, 1, 2, headers.length - 2);

  worksheet.getCell(2, 1).value = title;

  worksheet.getCell(2, 1).font = {
    bold: true,
    size: 13,
  };

  worksheet.getCell(2, headers.length - 1).value = "Fecha:";
  worksheet.getCell(2, headers.length - 1).font = {
    bold: true,
  };

  worksheet.getCell(2, headers.length).value = fecha;

  worksheet.addRow([]);

  // CABECERAS
  const headerRow = worksheet.addRow(headers);

  headerRow.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "2563EB" },
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
  data.forEach((item, index) => {
    const row = worksheet.addRow(item);

    row.eachCell((cell, colNumber) => {
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

      if (getCellStyle) {
        const style = getCellStyle({
          row,
          cell,
          item,
          index,
          colNumber,
        });

        if (style?.font) {
          cell.font = style.font;
        }

        if (style?.fill) {
          cell.fill = style.fill;
        }
      }
    });
  });

  // ANCHOS
  worksheet.columns = columnsWidth.map((width) => ({
    width,
  }));

  // TOTAL
  worksheet.addRow([]);

  const totalRow = worksheet.addRow([
    `${totalLabel}: ${data.length}`,
  ]);

  totalRow.font = {
    bold: true,
  };

  // PIE
  worksheet.addRow([]);

  const footerRow = worksheet.addRow([footerText]);

  footerRow.font = {
    italic: true,
    size: 10,
  };

  footerRow.alignment = {
    horizontal: "center",
  };

  // CONGELAR
  worksheet.views = [
    {
      state: "frozen",
      ySplit: 4,
    },
  ];

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `${fileName}_${fecha}.xlsx`
  );
}