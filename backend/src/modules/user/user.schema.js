import { z } from "zod";
import { coerceNumber, nameField } from "../../utils/validate.utils.js";

const userCreateSchema = z
  .object({
    firstname: nameField("nombre"),
    lastname: nameField("apellido"),

    email: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .trim()
        .min(1, "El email es requerido")
        .email("El email no tiene un formato válido")
        .toLowerCase(),
    ),

    password: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .trim()
        .min(1, "La contraseña es requerida")
        .min(8, "La contraseña debe tener mínimo 8 caracteres")
        .max(100, "La contraseña no puede tener más de 100 caracteres")
        .regex(/[a-zA-Z]/, "La contraseña debe contener al menos una letra")
        .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
    ),

    repassword: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .trim()
        .min(1, "Debes confirmar la contraseña")
        .min(8, "La confirmación debe tener mínimo 8 caracteres"),
    ),

    role: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .min(1, "El rol es requerido")
        .refine((val) => ["ADMIN", "AUXILIAR", "PARENT"].includes(val), {
          message: "El rol debe ser ADMIN, AUXILIAR o PARENT",
        }),
    ),

    phone: z
      .string()
      .trim()
      .transform((val) => val.replace(/\s+/g, ""))
      .refine((val) => !val || /^\+51\d{9}$/.test(val), {
        message: "El teléfono debe tener formato +51 9XXXXXXXX",
      })
      .optional(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["repassword"],
  })
  .strict({ message: "No se permiten campos adicionales" });

const userUpdateSchema = z
  .object({
    firstname: z
      .string()
      .trim()
      .min(2, "El nombre debe tener mínimo 2 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        "El nombre solo puede contener letras y espacios",
      )
      .optional(),

    lastname: z
      .string()
      .trim()
      .min(2, "El apellido debe tener mínimo 2 caracteres")
      .max(50, "El apellido no puede tener más de 50 caracteres")
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        "El apellido solo puede contener letras y espacios",
      )
      .optional(),

    email: z
      .string()
      .trim()
      .email("El email no tiene un formato válido")
      .toLowerCase()
      .optional(),

    role: z
      .string()
      .refine((val) => ["ADMIN", "AUXILIAR", "PARENT"].includes(val), {
        message: "El rol debe ser ADMIN, AUXILIAR o PARENT",
      })
      .optional(),

    phone: z
      .string()
      .trim()
      .transform((value) => value.replace(/\s+/g, ""))
      .refine((value) => !value || /^\+51\d{9}$/.test(value), {
        message: "El teléfono debe tener formato +519XXXXXXXX",
      })
      .optional(),

    password: z
      .string()
      .trim()
      .min(8, "La contraseña debe tener mínimo 8 caracteres")
      .max(100, "La contraseña no puede tener más de 100 caracteres")
      .regex(/[a-zA-Z]/, "La contraseña debe tener al menos una letra")
      .regex(/[0-9]/, "La contraseña debe tener al menos un número")
      .optional(),

    repassword: z.string().trim().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    // Validar que al menos un campo sea enviado
    const editableFields = [
      "firstname",
      "lastname",
      "email",
      "role",
      "phone",
      "password",
      "repassword",
    ];
    const hasAtLeastOneField = editableFields.some(
      (field) => data[field] !== undefined,
    );

    if (!hasAtLeastOneField) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["body"],
        message: "Debes enviar al menos un campo para actualizar",
      });
    }

    // Si envía password pero no repassword
    if (data.password && !data.repassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["repassword"],
        message: "Debes confirmar la contraseña",
      });
    }
    // Si envía repassword pero no password
    if (!data.password && data.repassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Debes enviar una contraseña",
      });
    }
    // Si ambas existen pero no coinciden
    if (data.password && data.repassword && data.password !== data.repassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["repassword"],
        message: "Las contraseñas no coinciden",
      });
    }
  });

const userParamsSchema = z
  .object({
    page: coerceNumber("La página", 1, 1000, 1),

    limit: coerceNumber("El límite", 1, 100, 10),

    role: z
      .string()
      .refine((val) => ["ADMIN", "AUXILIAR", "PARENT"].includes(val), {
        message: "El rol debe ser AUXILIAR, PARENT o PARENT",
      })
      .optional(),

    sortBy: z
      .string()
      .refine(
        (val) =>
          [
            "firstname",
            "lastname",
            "email",
            "phone",
            "createdAt",
            "updatedAt",
          ].includes(val),
        {
          message:
            "El ordenamiento puede ser por firstname, lastname, email, phone, createdAt o updatedAt",
        },
      )
      .default("createdAt"),

    sortOrder: z
      .string()
      .refine((val) => ["asc", "desc"].includes(val), {
        message: "El orden debe ser asc o desc",
      })
      .default("asc"),

    search: z
      .string()
      .trim()
      .max(100, "La búsqueda no puede tener más de 100 caracteres")
      .optional(),
  })
  .strict();

export { userCreateSchema, userUpdateSchema, userParamsSchema };
