export const MONTHS_ES = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

// CONVERTIR
// "lunes, 11 de mayo de 2026"
export function parseSpanishDate(dateStr) {
  const match =
    dateStr.match(/(\d{1,2}) de (\w+) de (\d{4})/);

  if (!match) return null;

  const [, day, monthName, year] = match;

  const month =
    MONTHS_ES[monthName.toLowerCase()];

  if (month === undefined) return null;

  return new Date(
    Number(year),
    month,
    Number(day)
  );
}

// OBTENER LUNES DE LA SEMANA
export function getMonday(date) {
  const d = new Date(date);

  const day = d.getDay();

  // Si es domingo retrocede hasta lunes
  const diff =
    day === 0
      ? -6
      : 1 - day;

  d.setDate(
    d.getDate() + diff
  );

  d.setHours(0, 0, 0, 0);

  return d;
}

// OBTENER VIERNES DE LA SEMANA
// (No se consideran sábados ni domingos)
export function getFriday(date) {
  const friday =
    getMonday(date);

  friday.setDate(
    friday.getDate() + 4
  );

  friday.setHours(
    23,
    59,
    59,
    999
  );

  return friday;
}

// OBTENER RANGO DEL BIMESTRE
// 1° Bimestre → Marzo - Abril
// 2° Bimestre → Mayo - Junio
export function getBimestreRange(date) {
  const year =
    date.getFullYear();

  const bimestres = [
    {
      start: new Date(year, 2, 1),
      end: new Date(year, 3, 30, 23, 59, 59),
    },

    {
      start: new Date(year, 4, 1),
      end: new Date(year, 5, 30, 23, 59, 59),
    },

    {
      start: new Date(year, 7, 1),
      end: new Date(year, 8, 30, 23, 59, 59),
    },

    {
      start: new Date(year, 9, 1),
      end: new Date(year, 10, 30, 23, 59, 59),
    },
  ];

  return (
    bimestres.find(
      (b) =>
        date >= b.start &&
        date <= b.end
    ) ?? null
  );
}

// VALIDAR FILTROS DE FECHA
export function matchesDateFilter(
  recordDate,
  filter
) {
  const date =
    parseSpanishDate(recordDate);

  if (!date) return false;

  const today =
    new Date();

  switch (filter) {

    // Lunes a viernes de la semana actual
    case "Esta Semana": {

      const monday =
        getMonday(today);

      const friday =
        getFriday(today);

      return (
        date >= monday &&
        date <= friday
      );
    }

    // Bimestre actual
    case "Este Bimestre": {

      const range =
        getBimestreRange(today);

      if (!range) return false;

      return (
        date >= range.start &&
        date <= range.end
      );
    }

    // Año actual
    case "Todo el Año":

      return (
        date.getFullYear() ===
        today.getFullYear()
      );

    default:

      return true;
  }
}