import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "El email es requerido" })
    .trim()
    .toLowerCase()
    .email("El email no es válido")
    .max(100),

  password: z
    .string({ required_error: "La contraseña es requerida" })
    .trim()
    .min(1, "La contraseña es requerida")
    .max(100),
});

export { loginSchema };
