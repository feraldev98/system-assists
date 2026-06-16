import { parentService } from "./parent.service.js";
import { parentSchema } from "./parent.schema.js";
import { validateUtils } from "../../utils/validate.utils.js";

const parentController = {
  create: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: parentSchema.create,
        data: req.body,
      });
      const newParentRelation = await parentService.create({ data: validate });

      return res.json({
        success: true,
        message: "Relación familiar creada correctamente",
        parent: newParentRelation,
      });
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: parentSchema.params,
        data: req.query,
      });
      const [parents, total] = await parentService.get(validate);

      return res.json({
        success: true,
        data: parents,
        pagination: {
          page: validate.page,
          limit: validate.limit,
          total,
          totalPages: Math.ceil(total / validate.limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id: idStudentParent } = await validateUtils.validateSchema({
        schema: parentSchema.params,
        data: req.params,
      });

      const parent = await parentService.getById({ idStudentParent });

      return res.json({
        success: true,
        message: "Relación familiar encontrada",
        data: { ...parent },
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id: idStudentParent } = await validateUtils.validateSchema({
        schema: parentSchema.params,
        data: req.params,
      });

      const data = await validateUtils.validateSchema({
        schema: parentSchema.update,
        data: req.body,
      });

      const updatedParent = await parentService.update({
        idStudentParent,
        data,
      });

      return res.json({
        success: true,
        message: "Relación familiar actualizada correctamente",
        data: { ...updatedParent },
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id: idStudentParent } = await validateUtils.validateSchema({
        schema: parentSchema.params,
        data: req.params,
      });

      const deletedParent = await parentService.delete({ idStudentParent });

      return res.json({
        success: true,
        message: "Relación familiar eliminada correctamente",
        data: { ...deletedParent },
      });
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
