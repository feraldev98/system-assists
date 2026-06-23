import { z } from "zod";
import { validateUtils } from "../../utils/validate.utils.js";
import { userFields } from "./user.fields.js";
import { idField } from "../../utils/schemas/idField.js";
import { nameField } from "../../utils/schemas/nameField.js";
import { emailField } from "../../utils/schemas/emailField.js";
import { passwordField } from "../../utils/schemas/passwordField.js";
import { roleField } from "../../utils/schemas/roleField.js";
import { phoneField } from "../../utils/schemas/phoneField.js";
import { numericField } from "../../utils/schemas/numericField.js";
import { sortByField } from "../../utils/schemas/sortByField.js";
import { sortOrderField } from "../../utils/schemas/sortOrderField.js";
import { searchField } from "../../utils/schemas/searchField.js";

const userSchema = {
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

      email: emailField({
        label: "El correo",
        required: true,
      }),

      password: passwordField({
        label: "La contraseña",
        min: 8,
        max: 32,
        required: true,
      }),

      repassword: z.preprocess(
        (val) => val ?? "",
        z.string().trim().min(1, "Debes confirmar la contraseña"),
      ),

      role: roleField({
        label: "El rol",
        required: true,
      }),

      phone: phoneField({
        label: "El teléfono",
        required: true,
      }),
    })
    .strict({ message: "No se permiten campos adicionales" })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({
        data,
        ctx,
        fields: userFields.create,
      });
      validateUtils.verifyPasswords({ data, ctx });
    }),

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

      email: emailField({
        label: "El correo",
        required: false,
      }),

      role: roleField({
        label: "El rol",
        required: false,
      }),

      phone: phoneField({
        label: "El teléfono",
        required: false,
      }),

      password: passwordField({
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
      validateUtils.validateBody({
        data,
        ctx,
        fields: userFields.update,
      });
      validateUtils.verifyPasswords({ data, ctx });
    }),
  params: z
    .object({
      id: idField({
        label: "El ID del usuario",
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

      role: roleField({
        label: "El rol",
        required: false,
      }),

      sortBy: sortByField({
        sortFields: userFields.sort,
      }),

      sortOrder: sortOrderField(),

      search: searchField(),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
};

export { userSchema };
