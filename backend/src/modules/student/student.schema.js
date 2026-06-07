import { z } from "zod";
import { schemaUtils } from "../../utils/schema.utils.js";
import { studentFields } from "./student.fields.js";
import { validateUtils } from "../../utils/validate.utils.js";
/*
model Student {
  idStudent Int     @id @default(autoincrement())
  firstname String  @db.VarChar(50)
  lastname  String  @db.VarChar(50)
  code      String  @unique @default(uuid()) @db.Uuid
  phone     String? @db.VarChar(20)
  email     String? @unique @db.VarChar(100)
  active    Boolean @default(true)
}
*/

const studentSchema = {
  create: z
    .object({
      firstname: schemaUtils.nameField({
        label: "El nombre",
        min: 2,
        max: 50,
        required: true,
      }),
      lastname: schemaUtils.nameField({
        label: "El apellido",
        min: 2,
        max: 50,
        required: true,
      }),
      //code,
      gender: schemaUtils.genderField({
        required: true,
      }),
      phone: schemaUtils.phoneField({
        label: "El teléfono",
        required: false,
      }),
      email: schemaUtils.emailField({
        label: "El correo",
        required: false,
      }),
      status: schemaUtils.statusField({
        states: studentFields.status,
        required: false,
      }),
    })
    .strict({ message: "No se permiten campos adicionales" }),

  update: z
    .object({
      firstname: schemaUtils.nameField({
        label: "El nombre",
        min: 2,
        max: 50,
        required: false,
      }),
      lastname: schemaUtils.nameField({
        label: "El apellido",
        min: 2,
        max: 50,
        required: false,
      }),
      //code,
      gender: schemaUtils.genderField({
        required: false,
      }),
      phone: schemaUtils.phoneField({
        label: "El teléfono",
        required: false,
      }),
      email: schemaUtils.emailField({
        label: "El correo",
        required: false,
      }),
      status: schemaUtils.statusField({
        states: studentFields.status,
        required: false,
      }),
    })
    .strict({ message: "No se permiten campos adicionales" })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({ data, ctx, fields: studentFields.update });
    }),

  params: z
    .object({
      id: schemaUtils.idField({
        label: "El ID del estudiante",
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
      status: schemaUtils.statusField({
        states: studentFields.status,
        required: false,
      }),
      gender: schemaUtils.genderField({
        required: false,
      }),
      sortBy: schemaUtils.sortByField({
        sortFields: studentFields.sort,
      }),
      sortOrder: schemaUtils.sortOrderField(),
      search: schemaUtils.searchField(),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
};

export { studentSchema };
