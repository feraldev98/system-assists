import { z } from "zod";

const loginSchema = z
  .object({
    email: z.preprocess(
      (val) => val ?? null,
      z
        .string({
          error: (issue) => {
            if (issue.input === undefined || issue.input === null) {
              return "El email es requerido";
            }

            return "El email debe ser un texto";
          },
        })
        .trim()
        .min(1, "El email es requerido")
        .email("El email no tiene un formato válido")
        .toLowerCase(),
    ),

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
  });

export { loginSchema };
