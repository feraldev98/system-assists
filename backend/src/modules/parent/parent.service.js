import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { parentFields } from "./parent.fields.js";

const parentService = {
  create: async ({ data }) => {
    const parent = await prisma.user.findUnique({
      where: {
        idUser: data.idParent,
      },
      select: {
        idUser: true,
        role: true,
      },
    });
    console.log(parent);
    if (!parent) {
      throw new AppError("El padre no existe", 400, {
        field: "idParent",
        message: "No existe un registro con el ID proporcionado",
      });
    }

    if (!["PARENT"].includes(parent.role)) {
      throw new AppError("El usuario no es un padre", 400, {
        field: "idParent",
        message: "El usuario no es un padre",
      });
    }

    const queryResult = await prisma.$transaction(async (prisma) => {
      const parent = await prisma.studentParent.create({
        data: {
          ...data,
        },
        select: parentFields.create,
      });
      return { parent };
    });
    return queryResult.parent;
  },

  get: async () => {},

  getById: async () => {},

  update: async () => {},

  delete: async () => {},
};

export { parentService };

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
