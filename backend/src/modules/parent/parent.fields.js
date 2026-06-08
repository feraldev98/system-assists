const parentFields = {
  create: ["idStudent", "idParent", "relationship"],
  update: ["idStudent", "idParent", "relationship"],
  select: {
    idStudentParent: true,
    student: {
      select: {
        idStudent: true,
        firstname: true,
        lastname: true,
        code: true,
        phone: true,
        email: true,
        gender: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    },
    relationship: true,
    parent: {
      select: {
        idParent: true,
        firstname: true,
        lastname: true,
        phone: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    },
  },
  sort: ["idStudentParent", "student", "relationship", "parent"],
  search: [
    "student",
    "relationship",
    "parent",
    "idStudentParent",
    "idParent",
    "idStudent",
  ],
};

export { parentFields };
/**
 * model Student {
  idStudent      Int             @id @default(autoincrement())
  firstname      String          @db.VarChar(50)
  lastname       String          @db.VarChar(50)
  code           String          @unique @default(uuid()) @db.Uuid
  phone          String?         @unique @db.VarChar(20)
  email          String?         @unique @db.VarChar(100)
  gender         Gender
  status         StatusStudent   @default(ACTIVO)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  studentParents StudentParent[]
}

model User {
  idUser         Int             @id @default(autoincrement())
  firstname      String          @db.VarChar(50)
  lastname       String          @db.VarChar(50)
  email          String          @unique @db.VarChar(100)
  passwordHash   String          @db.VarChar(255)
  role           Role
  phone          String?         @db.VarChar(20)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  studentParents StudentParent[]
}

model StudentParent {
  idStudentParent Int          @id @default(autoincrement())
  idStudent       Int
  idParent        Int
  relationship    Relationship @default(APODERADO)

  student Student @relation(fields: [idStudent], references: [idStudent])
  parent  User    @relation(fields: [idParent], references: [idUser])

  @@unique([idStudent, idParent])
}


 */
