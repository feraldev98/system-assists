import { parentService } from "./parent.service.js";
import { parentSchema } from "./parent.schema.js";
import { validateUtils } from "../../utils/validate.utils.js";

const parentController = {
  create: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};

export { parentController };

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
