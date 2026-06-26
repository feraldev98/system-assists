import { prisma } from "./config/prisma.js";
import { userService } from "./modules/user/user.service.js";
import { authUtils } from "./utils/auth.utils.js";

// ─── Constantes ──────────────────────────────────────────────────────────────

const CURRENT_YEAR = new Date().getFullYear();
const PREVIOUS_YEAR = CURRENT_YEAR - 1;

const GRADE_LEVELS = [1, 2, 3, 4, 5, 6];
const SECTION_NAMES = ["A", "B", "C", "D"];

const MALE_NAMES = [
  "Carlos",
  "Luis",
  "José",
  "Miguel",
  "Juan",
  "Pedro",
  "Andrés",
  "Rafael",
  "Sergio",
  "Diego",
  "Alejandro",
  "Fernando",
  "Ricardo",
  "Eduardo",
  "Manuel",
  "Roberto",
  "Héctor",
  "Víctor",
  "Daniel",
  "Pablo",
];

const FEMALE_NAMES = [
  "María",
  "Ana",
  "Lucía",
  "Sofía",
  "Isabella",
  "Valentina",
  "Camila",
  "Natalia",
  "Gabriela",
  "Paola",
  "Andrea",
  "Patricia",
  "Rosa",
  "Carmen",
  "Sandra",
  "Mónica",
  "Laura",
  "Elena",
  "Claudia",
  "Daniela",
];

const LASTNAMES = [
  "García",
  "Rodríguez",
  "López",
  "Martínez",
  "González",
  "Pérez",
  "Torres",
  "Ramírez",
  "Flores",
  "Rivera",
  "Morales",
  "Ortiz",
  "Herrera",
  "Medina",
  "Castro",
  "Vargas",
  "Reyes",
  "Soto",
  "Mendoza",
  "Jiménez",
  "Ramos",
  "Alvarado",
  "Paredes",
  "Quispe",
  "Huanca",
  "Mamani",
  "Condori",
  "Ccopa",
  "Apaza",
  "Cárdenas",
];

const AUXILIAR_SEEDS = [
  { firstname: "Elena", lastname: "Torres" },
  { firstname: "Roberto", lastname: "Vargas" },
  { firstname: "Patricia", lastname: "Mendoza" },
  { firstname: "Sergio", lastname: "Quispe" },
  { firstname: "Claudia", lastname: "Ramos" },
  { firstname: "Marco", lastname: "Paredes" },
  { firstname: "Liliana", lastname: "Castro" },
  { firstname: "Javier", lastname: "Huanca" },
];

/** @type {Array<import('@prisma/client').Prisma.IncidentCatalogCreateInput>} */
const INCIDENT_CATALOG_SEEDS = [
  {
    name: "Falta de respeto verbal",
    type: "LEVE",
    pointsDeducted: 5,
    description: "Insultos o palabras ofensivas hacia compañeros o personal.",
  },
  {
    name: "Tardanza reiterada",
    type: "LEVE",
    pointsDeducted: 3,
    description: "Llegar tarde al aula en más de una ocasión en la semana.",
  },
  {
    name: "Uso de celular en clase",
    type: "LEVE",
    pointsDeducted: 4,
    description: "Uso de dispositivos móviles sin autorización durante clases.",
  },
  {
    name: "Pelea o agresión física",
    type: "GRAVE",
    pointsDeducted: 20,
    description: "Agresión física hacia otro estudiante o personal.",
  },
  {
    name: "Daño a la propiedad",
    type: "GRAVE",
    pointsDeducted: 15,
    description: "Daño intencional a mobiliario, equipos o bienes del colegio.",
  },
  {
    name: "Acoso escolar (bullying)",
    type: "MUY_GRAVE",
    pointsDeducted: 30,
    description: "Conducta sistemática de acoso, intimidación o exclusión.",
  },
  {
    name: "Posesión de sustancias",
    type: "MUY_GRAVE",
    pointsDeducted: 50,
    description: "Posesión o consumo de alcohol, tabaco u otras sustancias.",
  },
];

// ─── Utilidades ──────────────────────────────────────────────────────────────

/** Retorna un elemento aleatorio del arreglo. */
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Genera un DNI peruano de 8 dígitos. */
const randomDni = () =>
  String(Math.floor(10_000_000 + Math.random() * 90_000_000));

/** Genera un número de celular peruano (empieza en 9). */
const randomPhone = () =>
  "9" + String(Math.floor(10_000_000 + Math.random() * 90_000_000));

/** Normaliza una cadena para usarla en emails (elimina tildes y ñ). */
const normalize = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/\s+/g, ".");

/** Genera un email con formato `nombre.apellido[suffix]@school.edu.pe`. */
const buildEmail = (firstname, lastname, suffix = "") =>
  `${normalize(firstname)}.${normalize(lastname)}${suffix}@school.edu.pe`;

/**
 * Genera un valor único dentro de un Set usando una función generadora.
 * Lanza si no lo consigue en `maxAttempts` intentos.
 */
const uniqueValue = (generator, usedSet, maxAttempts = 100) => {
  for (let i = 0; i < maxAttempts; i++) {
    const value = generator(i);
    if (!usedSet.has(value)) {
      usedSet.add(value);
      return value;
    }
  }
  throw new Error("No se pudo generar un valor único tras múltiples intentos.");
};

/**
 * Genera una fecha aleatoria entre `start` y `end`.
 * Solo días de semana (lunes-viernes).
 */
const randomWeekday = (start, end) => {
  let date;
  do {
    const ms =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    date = new Date(ms);
  } while (date.getDay() === 0 || date.getDay() === 6);
  return date;
};

// ─── Creadores con hash de contraseña ────────────────────────────────────────

const createUser = async ({ firstname, lastname, email, role }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;

  const passwordHash = await authUtils.generatePasswordHash({
    password: "password123",
  });
  const { user } = await userService.create({
    firstname,
    lastname,
    email,
    passwordHash,
    role,
  });
  return user;
};

// ─── Secciones del seed ──────────────────────────────────────────────────────

/**
 * 1. Grados
 */
const seedGrades = async () => {
  console.log("📚 Creando grados...");
  const grades = await Promise.all(
    GRADE_LEVELS.map((level) =>
      prisma.grade.upsert({ where: { level }, update: {}, create: { level } }),
    ),
  );
  console.log(`   ✔ ${grades.length} grados`);
  return grades;
};

/**
 * 2. Secciones
 */
const seedSections = async (grades) => {
  console.log("🏫 Creando secciones...");
  const sections = [];
  for (const grade of grades) {
    for (const name of SECTION_NAMES) {
      const section = await prisma.section.upsert({
        where: { name_idGrade: { name, idGrade: grade.idGrade } },
        update: {},
        create: { name, idGrade: grade.idGrade },
      });
      sections.push(section);
    }
  }
  console.log(`   ✔ ${sections.length} secciones`);
  return sections;
};

/**
 * 3. Aulas (Classrooms)
 */
const seedClassrooms = async (sections) => {
  console.log("🚪 Creando aulas...");
  const classrooms = [];
  for (const section of sections) {
    for (const year of [PREVIOUS_YEAR, CURRENT_YEAR]) {
      const classroom = await prisma.classroom.upsert({
        where: { year_idSection: { year, idSection: section.idSection } },
        update: {},
        create: {
          year,
          idSection: section.idSection,
          status: year === CURRENT_YEAR ? "ACTIVO" : "INACTIVO",
        },
      });
      classrooms.push(classroom);
    }
  }
  console.log(`   ✔ ${classrooms.length} aulas`);
  return classrooms;
};

/**
 * 4. Auxiliares
 */
const seedAuxiliares = async () => {
  console.log("👩‍🏫 Creando auxiliares...");
  const usedEmails = new Set();
  const auxiliares = [];

  for (const { firstname, lastname } of AUXILIAR_SEEDS) {
    const email = uniqueValue(
      (i) => buildEmail(firstname, lastname, i === 0 ? "" : String(i)),
      usedEmails,
    );
    const user = await createUser({
      firstname,
      lastname,
      email,
      role: "AUXILIAR",
    });
    auxiliares.push(user);
  }
  console.log(`   ✔ ${auxiliares.length} auxiliares`);
  return auxiliares;
};

/**
 * 5. Padres / Apoderados
 */
const seedParents = async (count = 40) => {
  console.log("👨‍👩‍👧 Creando padres/apoderados...");
  const usedEmails = new Set();
  const parents = [];

  for (let i = 0; i < count; i++) {
    const isMale = Math.random() > 0.4;
    const firstname = randomItem(isMale ? MALE_NAMES : FEMALE_NAMES);
    const lastname = randomItem(LASTNAMES);

    const email = uniqueValue(
      (attempt) =>
        buildEmail(firstname, lastname, attempt === 0 ? "" : String(attempt)),
      usedEmails,
    );

    const user = await createUser({
      firstname,
      lastname,
      email,
      role: "PARENT",
    });
    parents.push(user);
  }
  console.log(`   ✔ ${parents.length} padres/apoderados`);
  return parents;
};

/**
 * 6. Estudiantes
 */
const seedStudents = async (count = 120) => {
  console.log("🎒 Creando estudiantes...");
  const usedDnis = new Set();
  const usedEmails = new Set();
  const usedPhones = new Set();
  const students = [];

  /** @type {import('@prisma/client').Gender[]} */
  const GENDER_POOL = ["M", "M", "F", "F", "O"];
  /** @type {import('@prisma/client').StatusStudent[]} */
  const STATUS_POOL = ["ACTIVO", "ACTIVO", "ACTIVO", "INACTIVO", "SUSPENDIDO"];

  for (let i = 0; i < count; i++) {
    const gender = randomItem(GENDER_POOL);
    const namePool =
      gender === "M"
        ? MALE_NAMES
        : gender === "F"
          ? FEMALE_NAMES
          : [...MALE_NAMES, ...FEMALE_NAMES];
    const firstname = randomItem(namePool);
    const lastname = `${randomItem(LASTNAMES)} ${randomItem(LASTNAMES)}`;
    const status = randomItem(STATUS_POOL);

    const dni = uniqueValue(() => randomDni(), usedDnis);
    const email =
      Math.random() > 0.4
        ? uniqueValue(
            (attempt) =>
              buildEmail(
                firstname,
                lastname.split(" ")[0],
                `${i}${attempt > 0 ? attempt : ""}`,
              ),
            usedEmails,
          )
        : null;
    const phone =
      Math.random() > 0.5 ? uniqueValue(() => randomPhone(), usedPhones) : null;

    try {
      const student = await prisma.student.create({
        data: { firstname, lastname, dni, email, phone, gender, status },
      });
      students.push(student);
    } catch (err) {
      console.warn(`   ⚠ Estudiante #${i} omitido: ${err.message}`);
    }
  }
  console.log(`   ✔ ${students.length} estudiantes`);
  return students;
};

/**
 * 7. Relaciones estudiante-apoderado
 */
const seedStudentParents = async (students, parents) => {
  console.log("🔗 Vinculando estudiantes con apoderados...");

  /** @type {import('@prisma/client').Relationship[]} */
  const RELATIONSHIP_POOL = [
    "PADRE",
    "MADRE",
    "ABUELO",
    "ABUELA",
    "TÍO",
    "TÍA",
    "APODERADO",
    "OTRO",
  ];

  let count = 0;
  for (const student of students) {
    const numParents = Math.random() > 0.4 ? 2 : 1;
    const chosen = [...parents]
      .sort(() => Math.random() - 0.5)
      .slice(0, numParents);
    const usedParentIds = new Set();

    for (const parent of chosen) {
      if (usedParentIds.has(parent.idUser)) continue;
      usedParentIds.add(parent.idUser);
      try {
        await prisma.studentParent.create({
          data: {
            idStudent: student.idStudent,
            idParent: parent.idUser,
            relationship: randomItem(RELATIONSHIP_POOL),
          },
        });
        count++;
      } catch {
        // Relación duplicada — se ignora intencionalmente
      }
    }
  }
  console.log(`   ✔ ${count} vínculos estudiante-apoderado`);
  return count;
};

/**
 * 8. Matrículas (ClassroomStudent)
 */
const seedClassroomStudents = async (classrooms, students) => {
  console.log("📋 Matriculando estudiantes...");

  const activeClassrooms = classrooms.filter((c) => c.status === "ACTIVO");
  const inactiveClassrooms = classrooms.filter((c) => c.status === "INACTIVO");

  const shuffled = [...students].sort(() => Math.random() - 0.5);
  let idx = 0;
  let count = 0;

  const enroll = async (classroomList, minSize, maxSize) => {
    for (const classroom of classroomList) {
      const size =
        minSize + Math.floor(Math.random() * (maxSize - minSize + 1));
      for (let k = 0; k < size && idx < shuffled.length; k++, idx++) {
        try {
          await prisma.classroomStudent.create({
            data: {
              idClassroom: classroom.idClassroom,
              idStudent: shuffled[idx].idStudent,
            },
          });
          count++;
        } catch {
          // Matrícula duplicada — se ignora
        }
      }
    }
  };

  await enroll(activeClassrooms, 5, 8);
  await enroll(inactiveClassrooms, 3, 5);

  console.log(`   ✔ ${count} matrículas`);
  return count;
};

/**
 * 9. Catálogo de incidencias
 */
const seedIncidentCatalog = async () => {
  console.log("📖 Creando catálogo de incidencias...");
  const catalog = [];
  for (const entry of INCIDENT_CATALOG_SEEDS) {
    const item = await prisma.incidentCatalog.upsert({
      where: { name: entry.name },
      update: {},
      create: entry,
    });
    catalog.push(item);
  }
  console.log(`   ✔ ${catalog.length} tipos de incidencia`);
  return catalog;
};

/**
 * 10. Asistencias (Attendance)
 * Genera registros de asistencia para los estudiantes activos del año actual.
 */
const seedAttendances = async (students, auxiliares) => {
  console.log("✅ Generando registros de asistencia...");

  /** @type {import('@prisma/client').StatusAssistance[]} */
  const STATUS_POOL = [
    "PRESENTE",
    "PRESENTE",
    "PRESENTE",
    "PRESENTE",
    "TARDANZA",
    "JUSTIFICADA",
  ];

  const activeStudents = students.filter((s) => s.status === "ACTIVO");
  const yearStart = new Date(CURRENT_YEAR, 2, 1); // 1 de marzo
  const yearEnd = new Date(CURRENT_YEAR, 10, 30); // 30 de noviembre

  let count = 0;
  // 3 días de muestra por estudiante activo
  for (const student of activeStudents) {
    const usedDates = new Set();
    for (let d = 0; d < 3; d++) {
      try {
        const date = randomWeekday(yearStart, yearEnd);
        const dateKey = date.toISOString().slice(0, 10);
        if (usedDates.has(dateKey)) continue;
        usedDates.add(dateKey);

        const status = randomItem(STATUS_POOL);
        await prisma.attendance.create({
          data: {
            date,
            status,
            note: status !== "PRESENTE" ? "Registro automático de seed" : null,
            idStudent: student.idStudent,
            idAuxiliar: randomItem(auxiliares).idUser,
          },
        });
        count++;
      } catch {
        // Fecha duplicada para el mismo estudiante — se ignora
      }
    }
  }
  console.log(`   ✔ ${count} registros de asistencia`);
  return count;
};

/**
 * 11. Incidencias (Incident)
 * Genera algunas incidencias de muestra para estudiantes activos.
 */
const seedIncidents = async (students, auxiliares, catalog) => {
  console.log("⚠️  Generando incidencias...");

  const activeStudents = students.filter((s) => s.status === "ACTIVO");
  const yearStart = new Date(CURRENT_YEAR, 2, 1);
  const yearEnd = new Date(CURRENT_YEAR, 10, 30);

  let count = 0;
  // ~20% de los estudiantes activos tienen al menos una incidencia
  const withIncidents = activeStudents
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.ceil(activeStudents.length * 0.2));

  for (const student of withIncidents) {
    const numIncidents = 1 + Math.floor(Math.random() * 2); // 1 ó 2
    const usedKeys = new Set();

    for (let i = 0; i < numIncidents; i++) {
      try {
        const date = randomWeekday(yearStart, yearEnd);
        const incidentType = randomItem(catalog);
        const key = `${date.toISOString().slice(0, 10)}-${incidentType.idIncidentCatalog}`;
        if (usedKeys.has(key)) continue;
        usedKeys.add(key);

        await prisma.incident.create({
          data: {
            date,
            note: "Incidencia registrada durante seed.",
            idStudent: student.idStudent,
            idAuxiliar: randomItem(auxiliares).idUser,
            idIncidentCatalog: incidentType.idIncidentCatalog,
          },
        });
        count++;
      } catch {
        // Combinación duplicada (estudiante + fecha + tipo) — se ignora
      }
    }
  }
  console.log(`   ✔ ${count} incidencias`);
  return count;
};

// ─── Seed principal ───────────────────────────────────────────────────────────

const seed = async () => {
  console.log("🌱 Iniciando seed...\n");

  const grades = await seedGrades();
  const sections = await seedSections(grades);
  const classrooms = await seedClassrooms(sections);
  const auxiliares = await seedAuxiliares();
  const parents = await seedParents(40);
  const students = await seedStudents(120);
  const catalog = await seedIncidentCatalog();

  const spCount = await seedStudentParents(students, parents);
  const csCount = await seedClassroomStudents(classrooms, students);
  const attCount = await seedAttendances(students, auxiliares);
  const incCount = await seedIncidents(students, auxiliares, catalog);

  console.log("\n✅ Seed completado:");
  console.log(`   Grados:               ${grades.length}`);
  console.log(`   Secciones:            ${sections.length}`);
  console.log(`   Aulas:                ${classrooms.length}`);
  console.log(`   Auxiliares:           ${auxiliares.length}`);
  console.log(`   Padres/Apoderados:    ${parents.length}`);
  console.log(`   Estudiantes:          ${students.length}`);
  console.log(`   Catálogo incidencias: ${catalog.length}`);
  console.log(`   Vínculos apoderado:   ${spCount}`);
  console.log(`   Matrículas:           ${csCount}`);
  console.log(`   Asistencias:          ${attCount}`);
  console.log(`   Incidencias:          ${incCount}`);
};

seed()
  .catch((err) => {
    console.error("❌ Error en seed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
