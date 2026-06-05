import { useMemo, useState } from "react";
import { Button } from "../../atoms/button";
import { Table } from "../tableReusable";

//CONVERTIR MESES A NUMERO
const MONTHS_ES = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

function parseSpanishDate(dateStr) {

  // "lunes, 11 de mayo de 2026"  →  day=11, month=4, year=2026
  // "viernes, 9 de mayo de 2026" también

  const match = dateStr.match(/(\d{1,2}) de (\w+) de (\d{4})/);
  if (!match) return null;
  const [, day, monthName, year] = match;
  const month = MONTHS_ES[monthName.toLowerCase()];
  if (month === undefined) return null;
  return new Date(Number(year), month, Number(day));
}

//DEVULEVE LUNES A LA SEMANA A LA QUE PERTENECE DATE
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); 
  const diff = day === 0 ? -6 : 1 - day; // retroceder hasta lunes
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Dado un Date, devuelve {start, end} del bimestre al que pertenece.
 * Bimestres del año escolar peruano (ajusta los rangos si tu colegio difiere):
 *   1° Bimestre: marzo  – abril
 *   2° Bimestre: mayo   – junio
 *   3° Bimestre: agosto – septiembre
 *   4° Bimestre: octubre – noviembre
 */
function getBimestreRange(date) {
  const year  = date.getFullYear();
  const month = date.getMonth(); // 0-based

  const bimestres = [
    { start: new Date(year, 2,  1), end: new Date(year, 3,  30, 23, 59, 59) }, // Mar–Abr
    { start: new Date(year, 4,  1), end: new Date(year, 5,  30, 23, 59, 59) }, // May–Jun
    { start: new Date(year, 7,  1), end: new Date(year, 8,  30, 23, 59, 59) }, // Ago–Sep
    { start: new Date(year, 9,  1), end: new Date(year, 10, 30, 23, 59, 59) }, // Oct–Nov
  ];

  return (
    bimestres.find((b) => date >= b.start && date <= b.end) ?? null
  );
}

// ─── Filtros disponibles ──────────────────────────────────────────────────────
const DATE_FILTERS = ["Esta Semana", "Este Bimestre", "Todo el Año"];

function FilterBehavior({ currentStudent }) {
  const [dateFilter,   setDateFilter]   = useState("Todo el Año");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const filteredBehaviors = useMemo(() => {
    if (!currentStudent) return [];

    let data = [...currentStudent.behaviors];

    // ── Filtro por estado (calificación) ─────────────────────────────────────
    if (statusFilter !== "Todos") {
      data = data.filter(
        (item) => item.grade.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // ── Filtro por fecha ──────────────────────────────────────────────────────
    if (dateFilter === "Esta Semana") {
      const monday = getMonday(today);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);

      data = data.filter((item) => {
        const d = parseSpanishDate(item.date);
        return d && d >= monday && d <= sunday;
      });
    } else if (dateFilter === "Este Bimestre") {
      const range = getBimestreRange(today);
      if (range) {
        data = data.filter((item) => {
          const d = parseSpanishDate(item.date);
          return d && d >= range.start && d <= range.end;
        });
      }
    }
    // "Todo el Año" → no filtra por fecha

    return data;
  }, [currentStudent, dateFilter, statusFilter]);

  return (
    <section
      className="
        w-[96%] md:px-0 md:max-w-7xl mx-auto mt-8
        flex flex-col gap-5
      "
    >
      {/* ── Botones de filtro por fecha ───────────────────────────────────── */}
      <div className="flex gap-3 md:gap-6 justify-between md:justify-start w-full md:w-sm rounded-md px-3">
        {DATE_FILTERS.map((filter) => (
          <Button
            key={filter}
            text={filter}
            variant={dateFilter === filter ? "" : "ternary"}
            onClick={() => setDateFilter(filter)}
          />
        ))}
      </div>

      {/* ── Tabla ─────────────────────────────────────────────────────────── */}
      <Table
        headers={["Fecha", "Calificación", "Observaciones", "Auxiliar"]}
        data={filteredBehaviors}
        emptyMessage="No hay historial de comportamiento para este período"
        renderRow={(item, index) => (
          <tr
            key={item.id ?? index}
            className="border-b border-borderC/20 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{item.date}</td>
            <td className="px-6 py-4">
              <span className={`
                inline-block px-2 py-1 rounded text-xs font-bold
                ${item.grade === "AD" ? "bg-green-100 text-green-700" : ""}
                ${item.grade === "A"  ? "bg-blue-100 text-blue-700"   : ""}
                ${item.grade === "B"  ? "bg-yellow-100 text-yellow-700" : ""}
                ${item.grade === "C"  ? "bg-red-100 text-red-700"     : ""}
              `}>
                {item.grade}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.note}</td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{item.auxiliar}</td>
          </tr>
        )}
      />
    </section>
  );
}

export { FilterBehavior };