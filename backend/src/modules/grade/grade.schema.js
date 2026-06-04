import z from "zod";

const gradeSchema = {
  createGrade: z
    .object({
      level: z.preprocess(
        (val) => val ?? null,
        z
          .int({ message: "El grado debe ser un número entero" })
          .min(0, "El grado no puede ser negativo")
          .transform(Number),
      ),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
};

export { gradeSchema };
