
export const students = [
  {
    id: 1,
    name: "Juan Pérez Atalaya",
    grade: "5",
    section: "A",
    currentGrade: "AD",
    avgGrade: "AD",
    records: 4,
    lastEval: "11 may.",

    // ── Asistencia ────────────────────────────────────────────────────────────
    stats: {
      days: 8,
      presents: 6,
      absents: 1,
      late: 1,
      rate: 75,
    },
    attendances: [
      { id: 1, date: "30 Abr 2026", status: "Presente",  time: "07:55" },
      { id: 2, date: "29 Abr 2026", status: "Presente",  time: "07:52" },
      { id: 3, date: "28 Abr 2026", status: "Ausente",   time: "-"     },
      { id: 4, date: "24 Abr 2026", status: "Tardanza",  time: "08:12" },
    ],

    // ── Comportamiento ────────────────────────────────────────────────────────
    behaviors: [
      { id: 1, date: "lunes, 11 de mayo de 2026",    auxiliar: "Prof. María González", note: "Excelente participación en clase y comportamiento ejemplar",  grade: "AD" },
      { id: 2, date: "lunes, 4 de mayo de 2026",     auxiliar: "Prof. Carlos Ruiz",    note: "Muestra liderazgo y respeto hacia sus compañeros",             grade: "AD" },
      { id: 3, date: "lunes, 27 de abril de 2026",   auxiliar: "Prof. María González", note: "Buen comportamiento general",                                  grade: "A"  },
      { id: 4, date: "lunes, 20 de abril de 2026",   auxiliar: "Prof. Ana Torres",     note: "Destaca por su colaboración y respeto",                        grade: "AD" },
    ],
  },

  {
    id: 2,
    name: "María Pérez Atalaya",
    grade: "5",
    section: "B",
    currentGrade: "A",
    avgGrade: "A",
    records: 3,
    lastEval: "9 may.",

    // ── Asistencia ────────────────────────────────────────────────────────────
    stats: null,        // aún sin datos de asistencia para este estudiante
    attendances: [],

    // ── Comportamiento ────────────────────────────────────────────────────────
    behaviors: [
      { id: 1, date: "viernes, 9 de mayo de 2026",   auxiliar: "Prof. Ana Torres",     note: "Buen desempeño durante la semana",                             grade: "A"  },
      { id: 2, date: "lunes, 28 de abril de 2026",   auxiliar: "Prof. Carlos Ruiz",    note: "Participación activa pero debe mejorar puntualidad",            grade: "B"  },
      { id: 3, date: "lunes, 21 de abril de 2026",   auxiliar: "Prof. María González", note: "Cumple con las normas del aula",                               grade: "A"  },
    ],
  },
];