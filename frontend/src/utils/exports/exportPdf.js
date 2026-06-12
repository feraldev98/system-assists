import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPdf({
  title,
  fileName,
  headers,
  body,
  totalRecords,
  columnStyles,
  footerText = "Documento generado automáticamente por System Assists",
  institution = "I.E. Coronel Cortegana",
  didParseCell,
}) {

  const doc = new jsPDF();
  const fecha = new Date().toLocaleDateString("es-PE");

  // INSTITUCION
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");

  doc.text(
    institution,
    105,
    15,
    {
      align: "center",
    }
  );

  // TITULO
  doc.setFontSize(13);
  doc.text(
    title,
    14,
    28
  );

  // FECHA
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Fecha:", 160, 28);
  doc.text(fecha, 176, 28);

  autoTable(doc, {
    startY: 38,
    head: [headers],
    body,

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

    columnStyles,

    didParseCell,
  });

  // TOTAL
  const finalY = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");

  doc.text(
    `Total registros: ${totalRecords}`,
    14,
    finalY
  );

  // PIE
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");

  doc.text(
    footerText,
    105,
    285,
    {
      align: "center",
    }
  );

  doc.save(`${fileName}_${fecha}.pdf`);
}