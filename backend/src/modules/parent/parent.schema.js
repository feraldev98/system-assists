import { z } from "zod";
import { schemaUtils } from "../../utils/schema.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { parentFields } from "./parent.fields.js";

const parentSchema = {
  create: z
    .object({
      idStudent: schemaUtils.idField({
        label: "El ID del estudiante",
        required: true,
        type: "body",
      }),
      idParent: schemaUtils.idField({
        label: "El ID del padre",
        required: true,
        type: "body",
      }),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
  update: z
    .object({
      idStudent: schemaUtils.idField({
        label: "El ID del estudiante",
        required: false,
        type: "body",
      }),
      idParent: schemaUtils.idField({
        label: "El ID del padre",
        required: false,
        type: "body",
      }),
    })
    .strict({
      message: "No se permiten campos adicionales",
    })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({
        data,
        ctx,
        fields: parentFields.update,
      });
    }),
  params: z
    .object({
      id: schemaUtils.idField({
        label: "El ID de la sección",
        required: false,
      }),
      page: schemaUtils.numberField({
        label: "La página",
        min: 1,
        max: 1000,
        defaultValue: 1,
        required: false,
      }),

      limit: schemaUtils.numberField({
        label: "El límite",
        min: 1,
        max: 50,
        defaultValue: 10,
        required: false,
      }),

      sortBy: schemaUtils.sortByField({
        sortFields: parentFields.sort,
        defaultValue: "parent",
      }),

      sortOrder: schemaUtils.sortOrderField(),

      search: schemaUtils.searchField(),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
};

export { parentSchema };

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
