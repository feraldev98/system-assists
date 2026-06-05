import { z } from "zod";
import { validateUtils } from "../../utils/validate.utils.js";
import { schemaUtils } from "../../utils/schema.utils.js";
import { userFields } from "./user.fields.js";

const userSchema = {
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

      email: schemaUtils.emailField({
        label: "El correo",
        required: true,
      }),

      password: schemaUtils.passwordField({
        label: "La contraseña",
        min: 8,
        max: 32,
        required: true,
      }),

      repassword: z.preprocess(
        (val) => val ?? "",
        z.string().trim().min(1, "Debes confirmar la contraseña"),
      ),

      role: schemaUtils.roleField({
        label: "El rol",
        required: true,
      }),

      phone: schemaUtils.phoneField({
        label: "El teléfono",
        required: true,
      }),
    })
    .refine((data) => data.password === data.repassword, {
      message: "Las contraseñas no coinciden",
      path: ["repassword"],
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

      email: schemaUtils.emailField({
        label: "El correo",
        required: false,
      }),

      role: schemaUtils.roleField({
        label: "El rol",
        required: false,
      }),

      phone: schemaUtils.phoneField({
        label: "El teléfono",
        required: false,
      }),

      password: schemaUtils.passwordField({
        label: "La contraseña",
        min: 8,
        max: 32,
        required: false,
      }),

      repassword: z.string().trim().optional(),
    })
    .strict({
      message: "No se permiten campos adicionales",
    })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({ data, ctx });
      validateUtils.verifyPasswords({ data, ctx });
    }),
  params: z
    .object({
      id: schemaUtils.idField({
        label: "El ID del usuario",
        required: false,
      }),
      page: schemaUtils.numberField({
        label: "La página",
        min: 1,
        max: 1000,
        defaultValue: 1,
      }),

      limit: schemaUtils.numberField({
        label: "El límite",
        min: 1,
        max: 50,
        defaultValue: 10,
      }),

      role: schemaUtils.roleField({
        label: "El rol",
        required: false,
      }),

      sortBy: schemaUtils.sortByField({
        label: "El campo",
        sortFields: userFields.sortFields,
      }),

      sortOrder: schemaUtils.sortOrderField(),

      search: schemaUtils.searchField(),
    })
    .strict(),
};

export { userSchema };
