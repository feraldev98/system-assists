import z from "zod";

const statusField = ({ message = "El estado", states = [], required }) =>
  required
    ? z.preprocess(
        (val) => val ?? "",
        z
          .string()
          .min(1, `${message} es requerido`)
          .refine((val) => states.includes(val), {
            message: `${message} debe ser ${states.join(", ")}`,
          }),
      )
    : z.preprocess(
        (val) => val ?? "",
        z
          .string()
          .min(1, `${message} es requerido`)
          .refine((val) => states.includes(val), {
            message: `${message} debe ser ${states.join(", ")}`,
          })
          .optional(),
      );

export { statusField };
