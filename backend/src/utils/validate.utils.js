import z from "zod";
import { AppError } from "./AppError.js";

const validateSchema = async (schema, data) => {
  const validate = await schema.safeParseAsync(data);

  if (!validate.success) {
    const errors = validate.error.issues.flatMap((issue) => {
      if (issue.code === "unrecognized_keys") {
        return issue.keys.map((key) => ({
          field: key,
          message: "No se permiten campos adicionales",
        }));
      }

      return {
        field: issue.path.length > 0 ? issue.path.join(".") : "general",
        message: issue.message,
      };
    });

    throw new AppError("Error de validación", 400, errors);
  }

  return validate.data;
};

const idSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "El ID de usuario debe ser un número entero")
    .transform(Number),
});

const nameField = (label) =>
  z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .trim()
      .min(1, `El ${label} es requerido`)
      .min(2, `El ${label} debe tener mínimo 2 caracteres`)
      .max(50, `El ${label} no puede tener más de 50 caracteres`)
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        `El ${label} solo puede contener letras y espacios`,
      ),
  );

const coerceNumber = (label, min, max, defaultVal) =>
  z.preprocess(
    (val) => {
      if (val === undefined || val === "") return String(defaultVal);
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
  );

export { validateSchema, idSchema, nameField, coerceNumber };
