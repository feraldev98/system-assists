import z from "zod";
import { schemaUtils } from "../../utils/schema.utils.js";
const gradeSchema = {
  createGrade: z
    .object({
      level: z.preprocess(
        (val) => val ?? null,
        z
          .int({ message: "El grado debe ser un número entero" })
          .min(0, "El grado no puede ser negativo")
          .max(15, "El grado no puede ser mayor a 15")
          .transform(Number),
      ),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),

  userParams: z
    .object({
      page: schemaUtils.numberField({
        label: "La página",
        min: 1,
        max: 1000,
        defaultValue: 1,
      }),
      limit: schemaUtils.numberField({
        label: "El límite",
        min: 1,
        max: 10,
        defaultValue: 10,
      }),
      sortBy: z
        .string()
        .refine((val) => ["idGrade", "level"].includes(val), {
          message: "El ordenamiento puede ser por idGrade o level",
        })
        .default("level"),

      sortOrder: z
        .string()
        .refine((val) => ["asc", "desc"].includes(val), {
          message: "El orden debe ser asc o desc",
        })
        .default("asc"),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),

  updateGrade: z
    .object({
      level: z.preprocess(
        (val) => val ?? null,
        z
          .int({ message: "El grado debe ser un número entero" })
          .min(0, "El grado no puede ser negativo")
          .max(15, "El grado no puede ser mayor a 15")
          .transform(Number),
      ),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
};

export { gradeSchema };
