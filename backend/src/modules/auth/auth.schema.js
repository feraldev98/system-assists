import { z } from "zod";
import { schemaUtils } from "../../utils/schema.utils.js";

const authSchema = {
  login: z
    .object({
      email: schemaUtils.emailField({
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
    }),
};

export { authSchema };
