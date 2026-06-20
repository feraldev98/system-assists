import { z } from "zod";
import { studentFields } from "./student.fields.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { idField } from "../../utils/schemas/idField.js";
import { nameField } from "../../utils/schemas/nameField.js";
import { emailField } from "../../utils/schemas/emailField.js";
import { phoneField } from "../../utils/schemas/phoneField.js";
import { numericField } from "../../utils/schemas/numericField.js";
import { genderField } from "../../utils/schemas/genderFields.js";
import { statusField } from "../../utils/schemas/statusField.js";
import { sortByField } from "../../utils/schemas/sortByField.js";
import { sortOrderField } from "../../utils/schemas/sortOrderField.js";
import { searchField } from "../../utils/schemas/searchField.js";

const studentSchema = {
  create: z
    .object({
      firstname: nameField({
        label: "El nombre",
        min: 2,
        max: 50,
        required: true,
      }),
      lastname: nameField({
        label: "El apellido",
        min: 2,
        max: 50,
        required: true,
      }),
      //code,
      gender: genderField({
        required: true,
      }),
      phone: phoneField({
        label: "El teléfono",
        required: false,
      }),
      email: emailField({
        label: "El correo",
        required: false,
      }),
      status: statusField({
        states: studentFields.status,
        required: false,
      }),
    })
    .strict({ message: "No se permiten campos adicionales" }),

  update: z
    .object({
      firstname: nameField({
        label: "El nombre",
        min: 2,
        max: 50,
        required: false,
      }),
      lastname: nameField({
        label: "El apellido",
        min: 2,
        max: 50,
        required: false,
      }),
      //code,
      gender: genderField({
        required: false,
      }),
      phone: phoneField({
        label: "El teléfono",
        required: false,
      }),
      email: emailField({
        label: "El correo",
        required: false,
      }),
      status: statusField({
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
      id: idField({
        label: "El ID del estudiante",
        required: false,
      }),
      page: numericField({
        label: "La página",
        min: 1,
        max: 1000,
        defaultValue: 1,
        required: false,
      }),
      limit: numericField({
        label: "El límite",
        min: 1,
        max: 50,
        defaultValue: 10,
        required: false,
      }),
      status: statusField({
        states: studentFields.status,
        required: false,
      }),
      gender: genderField({
        required: false,
      }),
      sortBy: sortByField({
        sortFields: studentFields.sort,
      }),
      sortOrder: sortOrderField(),
      search: searchField(),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
};

export { studentSchema };
