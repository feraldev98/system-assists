import { z } from "zod";
import { validateUtils } from "../../utils/validate.utils.js";
import { authFields } from "./auth.fields.js";
import { alphanumericField } from "../../utils/schemas/alphanumericField.js";
import { emailField } from "../../utils/schemas/emailField.js";
import { passwordField } from "../../utils/schemas/passwordField.js";

const authSchema = {
  login: z
    .object({
      email: emailField({
        label: "El correo",
        required: true,
      }),

      password: z.preprocess(
        (val) => val ?? null,
        z
          .string({
            error: (issue) => {
              if (issue.input === null || issue.input === undefined) {
                return "La contraseña es requerida";
              }

              return "La contraseña debe ser un texto";
            },
          })
          .trim()
          .min(1, "La contraseña es requerida")
          .max(32, "Usuario y/o contraseña incorrectos")
          .regex(/[a-zA-Z]/, "Usuario y/o contraseña incorrectos")
          .regex(/[0-9]/, "Usuario y/o contraseña incorrectos"),
      ),
    })
    .strict({
      message: "No se permiten campos adicionales",
    })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({
        data,
        ctx,
        fields: authFields.login,
      });
    }),
  changePassword: z
    .object({
      oldPassword: alphanumericField({
        label: "La contraseña actual",
        min: 8,
        max: 32,
        required: true,
      }),
      password: passwordField({
        label: "La nueva contraseña",
        min: 8,
        max: 32,
        required: true,
      }),
      repassword: z.preprocess(
        (val) => val ?? "",
        z.string().trim().min(1, "Debes confirmar la contraseña"),
      ),
    })
    .strict({ message: "No se permiten campos adicionales" })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({
        data,
        ctx,
        fields: authFields.changePassword,
      });
      validateUtils.verifyPasswords({ data, ctx });
    }),
};

export { authSchema };
