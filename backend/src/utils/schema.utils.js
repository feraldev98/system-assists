import z from "zod";

const schemaUtils = {
  idField: ({ label, required }) =>
    required
      ? z.preprocess(
          (val) => val ?? "",
          z
            .string()
            .min(1, `${label} es requerido`)
            .regex(/^\d+$/, `${label} debe ser un número entero`)
            .transform(Number),
        )
      : z.preprocess(
          (val) => val ?? "",
          z
            .string()
            .regex(/^\d+$/, `${label} debe ser un número entero`)
            .min(1, `${label} es requerido`)
            .transform(Number)
            .optional(),
        ),

  nameField: ({ label, min, max, required }) =>
    required
      ? z.preprocess(
          (val) => val ?? "",
          z
            .string()
            .trim()
            .min(1, `${label} es requerido`)
            .min(min, `${label} debe tener mínimo ${min} caracteres`)
            .max(max, `${label} no puede tener más de ${max} caracteres`)
            .regex(
              /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
              `${label} solo puede contener letras y espacios`,
            )
            .transform((value) => value.replace(/\s+/g, " ")),
        )
      : z.preprocess(
          (val) => val ?? "",
          z
            .string()
            .trim()
            .min(1, `${label} es requerido`)
            .min(min, `${label} debe tener mínimo ${min} caracteres`)
            .max(max, `${label} no puede tener más de ${max} caracteres`)
            .regex(
              /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
              `${label} solo puede contener letras y espacios`,
            )
            .transform((value) => value.replace(/\s+/g, " "))
            .optional(),
        ),

  emailField: ({ label, required }) =>
    required
      ? z.preprocess(
          (val) => val ?? null,
          z
            .string({
              error: (issue) => {
                if (issue.input === undefined || issue.input === null) {
                  return `${label} es requerido`;
                }

                return `${label} debe ser un texto`;
              },
            })
            .trim()
            .min(1, `${label} es requerido`)
            .email(`${label} no tiene un formato válido`)
            .toLowerCase(),
        )
      : z.preprocess(
          (val) => val ?? null,
          z
            .string({
              error: (issue) => {
                if (issue.input === undefined || issue.input === null) {
                  return `${label} es requerido`;
                }

                return `${label} debe ser un texto`;
              },
            })
            .trim()
            .min(1, `${label} es requerido`)
            .email(`${label} no tiene un formato válido`)
            .toLowerCase()
            .optional(),
        ),

  passwordField: ({ label, min, max, required }) =>
    required
      ? z.preprocess(
          (val) => val ?? "",
          z
            .string()
            .trim()
            .min(1, `${label} es requerida`)
            .min(min, `${label} debe tener mínimo ${min} caracteres`)
            .max(max, `${label} no puede tener más de ${max} caracteres`)
            .regex(/^\S+$/, `${label} no puede contener espacios`)
            .regex(/[a-zA-Z]/, `${label} debe contener al menos una letra`)
            .regex(/[0-9]/, `${label} debe contener al menos un número`),
        )
      : z.preprocess(
          (val) => val ?? "",
          z
            .string()
            .trim()
            .min(1, `${label} es requerida`)
            .min(min, `${label} debe tener mínimo ${min} caracteres`)
            .max(max, `${label} no puede tener más de ${max} caracteres`)
            .regex(/^\S+$/, `${label} no puede contener espacios`)
            .regex(/[a-zA-Z]/, `${label} debe contener al menos una letra`)
            .regex(/[0-9]/, `${label} debe contener al menos un número`)
            .optional(),
        ),

  roleField: ({ label, required }) =>
    required
      ? z.preprocess(
          (val) => val ?? "",
          z
            .string()
            .min(1, `${label} es requerido`)
            .refine((val) => ["ADMIN", "AUXILIAR", "PARENT"].includes(val), {
              message: `${label} debe ser ADMIN, AUXILIAR o PARENT`,
            }),
        )
      : z.preprocess(
          (val) => val ?? "",
          z
            .string()
            .min(1, `${label} es requerido`)
            .refine((val) => ["ADMIN", "AUXILIAR", "PARENT"].includes(val), {
              message: `${label} debe ser ADMIN, AUXILIAR o PARENT`,
            })
            .optional(),
        ),

  phoneField: ({ label, required }) =>
    required
      ? z
          .string()
          .trim()
          .transform((val) => val.replace(/\s+/g, ""))
          .refine((val) => !val || /^\+51\d{9}$/.test(val), {
            message: `${label} debe tener formato +51 9XX XXX XXX`,
          })
      : z
          .string()
          .trim()
          .transform((val) => val.replace(/\s+/g, ""))
          .refine((val) => !val || /^\+51\d{9}$/.test(val), {
            message: `${label} debe tener formato +51 9XX XXX XXX`,
          })
          .optional(),
  numberField: ({ label, min, max, defaultValue = 0 }) =>
    z.preprocess(
      (val) => {
        if (val === undefined || val === "") return String(defaultValue);
        return String(val);
      },
      z
        .string()
        .refine((val) => !isNaN(Number(val)) && val.trim() !== "", {
          message: `${label} debe ser un número`,
        })
        .refine((val) => Number.isInteger(Number(val)), {
          message: `${label} debe ser un número entero`,
        })
        .refine((val) => Number(val) >= min, {
          message: `${label} debe ser mayor a 0`,
        })
        .refine((val) => Number(val) <= max, {
          message: `${label} no puede ser mayor a ${max}`,
        })
        .transform((val) => Number(val)),
    ),
  sortByField: ({ sortFields }) =>
    z
      .string()
      .refine((val) => sortFields.includes(val), {
        message: `El campo para ordenar solo puede ser ${sortFields.join(", ")}`,
      })
      .default("createdAt"),
  sortOrderField: () =>
    z
      .string()
      .refine((val) => ["asc", "desc"].includes(val), {
        message: "El orden debe ser asc o desc",
      })
      .default("asc"),

  searchField: () =>
    z
      .string()
      .trim()
      .min(1, "La búsqueda no puede estar vacía")
      .max(100, "La búsqueda no puede tener más de 100 caracteres")
      .transform((value) => value.replace(/\s+/g, " "))
      .optional(),
};

export { schemaUtils };
