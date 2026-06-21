import { prisma } from "./config/prisma.js";
import { userService } from "./modules/user/user.service.js";
import { authUtils } from "./utils/auth.utils.js";

// ─── Helpers ────────────────────────────────────────────────────────────────

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomDni = () => String(Math.floor(10000000 + Math.random() * 90000000));

const randomPhone = () =>
  "9" + String(Math.floor(10000000 + Math.random() * 90000000));

// ─── Datos base ─────────────────────────────────────────────────────────────

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

const SECTION_NAMES = ["A", "B", "C", "D"];
const GRADE_LEVELS = [1, 2, 3, 4, 5, 6];

const RELATIONSHIPS = [
  "PADRE",
  "MADRE",
  "ABUELO",
  "ABUELA",
  "TÍO",
  "TÍA",
  "APODERADO",
  "OTRO",
];

const GENDERS = ["M", "F", "O"];
const STUDENT_STATUSES = [
  "ACTIVO",
  "ACTIVO",
  "ACTIVO",
  "INACTIVO",
  "SUSPENDIDO",
];

// ─── Generadores ────────────────────────────────────────────────────────────

const genEmail = (firstname, lastname, suffix = "") =>
  `${firstname
    .toLowerCase()
    .replace(
      /[áéíóúñ]/g,
      (c) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u", ñ: "n" })[c] || c,
    )}.${lastname
    .toLowerCase()
    .replace(
      /[áéíóúñ]/g,
      (c) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u", ñ: "n" })[c] || c,
    )}${suffix}@school.edu.pe`;

const genUser = (firstname, lastname, role, emailSuffix = "") => ({
  firstname,
  lastname,
  email: genEmail(firstname, lastname, emailSuffix),
  password: "password123",
  role,
});

// ─── Seed principal ──────────────────────────────────────────────────────────

const seed = async () => {
  console.log("🌱 Iniciando seed...\n");

  // ── 1. Grados ──────────────────────────────────────────────────────────────
  console.log("📚 Creando grados...");
  const grades = [];
  for (const level of GRADE_LEVELS) {
    const grade = await prisma.grade.upsert({
      where: { level },
      update: {},
      create: { level },
    });
    grades.push(grade);
    console.log(`  ✔ Grado ${level} creado (id: ${grade.idGrade})`);
  }

  // ── 2. Secciones ───────────────────────────────────────────────────────────
  console.log("\n🏫 Creando secciones...");
  const sections = [];
  for (const grade of grades) {
    for (const name of SECTION_NAMES) {
      const existing = await prisma.section.findFirst({
        where: { name, idGrade: grade.idGrade },
      });
      const section = existing
        ? existing
        : await prisma.section.create({
            data: { name, idGrade: grade.idGrade },
          });
      sections.push(section);
      console.log(
        `  ✔ Sección ${name} - Grado ${grade.level} (id: ${section.idSection})`,
      );
    }
  }

  // ── 3. Aulas (Classrooms) ──────────────────────────────────────────────────
  console.log("\n🚪 Creando aulas...");
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear];
  const classrooms = [];

  for (const section of sections) {
    for (const year of years) {
      const existing = await prisma.classroom.findUnique({
        where: { year_idSection: { year, idSection: section.idSection } },
      });
      const classroom = existing
        ? existing
        : await prisma.classroom.create({
            data: {
              year,
              idSection: section.idSection,
              status: year === currentYear ? "ACTIVO" : "INACTIVO",
            },
          });
      classrooms.push(classroom);
    }
  }
  console.log(`  ✔ ${classrooms.length} aulas creadas`);

  // ── 4. Auxiliares ──────────────────────────────────────────────────────────
  console.log("\n👩‍🏫 Creando auxiliares...");
  const auxiliarData = [
    { firstname: "Elena", lastname: "Torres", suffix: "" },
    { firstname: "Roberto", lastname: "Vargas", suffix: "" },
    { firstname: "Patricia", lastname: "Mendoza", suffix: "" },
    { firstname: "Sergio", lastname: "Quispe", suffix: "" },
    { firstname: "Claudia", lastname: "Ramos", suffix: "" },
    { firstname: "Marco", lastname: "Paredes", suffix: "" },
    { firstname: "Liliana", lastname: "Castro", suffix: "" },
    { firstname: "Javier", lastname: "Huanca", suffix: "" },
  ];

  const auxiliares = [];
  for (const aux of auxiliarData) {
    const email = genEmail(aux.firstname, aux.lastname, aux.suffix);
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      auxiliares.push(existing);
      console.log(`  ⚠ Auxiliar ${aux.firstname} ${aux.lastname} ya existe`);
      continue;
    }
    const passwordHash = await authUtils.generatePasswordHash({
      password: "password123",
    });
    const result = await userService.create({
      firstname: aux.firstname,
      lastname: aux.lastname,
      email,
      passwordHash,
      role: "AUXILIAR",
    });
    auxiliares.push(result.user);
    console.log(`  ✔ Auxiliar creado: ${aux.firstname} ${aux.lastname}`);
  }

  // ── 5. Padres ──────────────────────────────────────────────────────────────
  console.log("\n👨‍👩‍👧 Creando padres/apoderados...");
  const parentPool = [];
  const usedEmails = new Set();

  for (let i = 0; i < 40; i++) {
    const isMale = Math.random() > 0.4;
    const firstname = randomItem(isMale ? MALE_NAMES : FEMALE_NAMES);
    const lastname = randomItem(LASTNAMES);
    let emailSuffix = "";
    let email = genEmail(firstname, lastname, emailSuffix);

    // garantizar email único
    let attempt = 0;
    while (usedEmails.has(email)) {
      attempt++;
      emailSuffix = String(attempt);
      email = genEmail(firstname, lastname, emailSuffix);
    }
    usedEmails.add(email);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      parentPool.push(existing);
      continue;
    }
    const passwordHash = await authUtils.generatePasswordHash({
      password: "password123",
    });
    const result = await userService.create({
      firstname,
      lastname,
      email,
      passwordHash,
      role: "PARENT",
    });
    parentPool.push(result.user);
  }
  console.log(`  ✔ ${parentPool.length} padres/apoderados creados`);

  // ── 6. Estudiantes ─────────────────────────────────────────────────────────
  console.log("\n🎒 Creando estudiantes...");
  const students = [];
  const usedDnis = new Set();
  const usedStudentEmails = new Set();
  const usedPhones = new Set();

  // Crear ~120 estudiantes
  for (let i = 0; i < 120; i++) {
    const gender = randomItem(["M", "M", "F", "F", "O"]);
    const firstname =
      gender === "M"
        ? randomItem(MALE_NAMES)
        : gender === "F"
          ? randomItem(FEMALE_NAMES)
          : randomItem([...MALE_NAMES, ...FEMALE_NAMES]);
    const lastname = `${randomItem(LASTNAMES)} ${randomItem(LASTNAMES)}`;

    // DNI único
    let dni = randomDni();
    while (usedDnis.has(dni)) dni = randomDni();
    usedDnis.add(dni);

    // Email opcional (60% tienen email)
    let email = null;
    if (Math.random() > 0.4) {
      let base = genEmail(firstname, lastname.split(" ")[0], String(i));
      while (usedStudentEmails.has(base)) {
        base = genEmail(
          firstname,
          lastname.split(" ")[0],
          String(i) + Math.floor(Math.random() * 100),
        );
      }
      usedStudentEmails.add(base);
      email = base;
    }

    // Teléfono opcional (50% tienen)
    let phone = null;
    if (Math.random() > 0.5) {
      let p = randomPhone();
      while (usedPhones.has(p)) p = randomPhone();
      usedPhones.add(p);
      phone = p;
    }

    try {
      const student = await prisma.student.create({
        data: {
          firstname,
          lastname,
          dni,
          email,
          phone,
          gender,
          status: randomItem(STUDENT_STATUSES),
        },
      });
      students.push(student);
    } catch (err) {
      console.warn(`  ⚠ No se pudo crear estudiante #${i}: ${err.message}`);
    }
  }
  console.log(`  ✔ ${students.length} estudiantes creados`);

  // ── 7. StudentParent (vincular estudiantes con padres) ─────────────────────
  console.log("\n🔗 Vinculando estudiantes con padres...");
  let spCount = 0;
  for (const student of students) {
    // Cada estudiante tiene 1 o 2 apoderados
    const numParents = Math.random() > 0.4 ? 2 : 1;
    const shuffled = [...parentPool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, numParents);
    const usedParentIds = new Set();

    for (const parent of chosen) {
      if (usedParentIds.has(parent.idUser)) continue;
      usedParentIds.add(parent.idUser);
      try {
        await prisma.studentParent.create({
          data: {
            idStudent: student.idStudent,
            idParent: parent.idUser,
            relationship: randomItem(RELATIONSHIPS),
          },
        });
        spCount++;
      } catch {
        // relación duplicada, ignorar
      }
    }
  }
  console.log(`  ✔ ${spCount} relaciones estudiante-apoderado creadas`);

  // ── 8. ClassroomStudent (matricular estudiantes en aulas activas) ──────────
  console.log("\n📋 Matriculando estudiantes en aulas...");

  // Aulas activas del año actual
  const activeClassrooms = classrooms.filter((c) => c.status === "ACTIVO");
  let csCount = 0;

  // Distribuir estudiantes entre las aulas activas (~5-8 por aula)
  const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
  let idx = 0;

  for (const classroom of activeClassrooms) {
    const classSize = Math.floor(Math.random() * 4) + 5; // 5 a 8
    for (
      let k = 0;
      k < classSize && idx < shuffledStudents.length;
      k++, idx++
    ) {
      try {
        await prisma.classroomStudent.create({
          data: {
            idClassroom: classroom.idClassroom,
            idStudent: shuffledStudents[idx].idStudent,
          },
        });
        csCount++;
      } catch {
        // duplicado, ignorar
      }
    }
  }

  // Los estudiantes restantes van a aulas del año pasado
  const oldClassrooms = classrooms.filter((c) => c.status === "INACTIVO");
  for (const classroom of oldClassrooms) {
    const classSize = Math.floor(Math.random() * 3) + 3;
    for (
      let k = 0;
      k < classSize && idx < shuffledStudents.length;
      k++, idx++
    ) {
      try {
        await prisma.classroomStudent.create({
          data: {
            idClassroom: classroom.idClassroom,
            idStudent: shuffledStudents[idx].idStudent,
          },
        });
        csCount++;
      } catch {
        // duplicado, ignorar
      }
    }
  }

  console.log(`  ✔ ${csCount} matrículas creadas`);

  // ─── Resumen ────────────────────────────────────────────────────────────────
  console.log("\n✅ Seed completado:");
  console.log(`   Grados:          ${grades.length}`);
  console.log(`   Secciones:       ${sections.length}`);
  console.log(`   Aulas:           ${classrooms.length}`);
  console.log(`   Auxiliares:      ${auxiliares.length}`);
  console.log(`   Padres:          ${parentPool.length}`);
  console.log(`   Estudiantes:     ${students.length}`);
  console.log(`   Vínculos padre:  ${spCount}`);
  console.log(`   Matrículas:      ${csCount}`);
};

seed()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
