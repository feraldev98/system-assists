import { z } from "zod";

const userSchema = z.object(
  {
    firstname: z
      .string({ required_error: `El nombre es requerido` })
      .min(2, `El nombre debe tener mínimo 2 caracteres`)
      .max(50, `El nombre no puede tener más de 50 caracteres`)
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        `El nombre solo puede contener letras y espacios`
      )
      .trim(),
    lastname: z
      .string({ required_error: `El apellido es requerido` })
      .min(2, `El apellido debe tener mínimo 2 caracteres`)
      .max(50, `El apellido no puede tener más de 50 caracteres`)
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        `El apellido solo puede contener letras y espacios`
      )
      .trim(),
    email: z
      .string({ required_error: "El email es requerido" })
      .email("El email no tiene un formato válido")
      .toLowerCase()
      .trim(),
    password: z
      .string({ required_error: "La contraseña es requerida" })
      .min(8, "La contraseña debe tener mínimo 8 caracteres")
      .max(100, "La contraseña no puede tener más de 100 caracteres"),
    repassword: z
      .string({ required_error: "Debes confirmar la contraseña" }),
    role: z
      .enum(["ADMIN", "AUXILIAR", "PARENT"], {
        required_error: "El rol es requerido",
        message: "El rol debe ser AUXILIAR, PARENT o ADMIN",
      }
    ),
    phone: z
      .string()
      .regex(
        /^\+51\d{9}$/,
        "El teléfono debe tener formato +51923456789"
      )
      .optional()
  }
).refine(
  (data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["repassword"],
  }
)

export { userSchema }
