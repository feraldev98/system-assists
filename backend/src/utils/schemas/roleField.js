import z from "zod";

const roleField = ({ label, required }) =>
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
      );

export { roleField };
