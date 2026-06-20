import z from "zod";

const phoneField = ({ label, required }) =>
  required
    ? z.preprocess(
        (val) => val ?? "",
        z
          .string()
          .trim()
          .min(1, `${label} es requerido`)
          .transform((val) => val.replace(/\s+/g, ""))
          .refine((val) => !val || /^\+51\d{9}$/.test(val), {
            message: `${label} debe tener formato +51 9XX XXX XXX`,
          }),
      )
    : z.preprocess(
        (val) => val ?? "",
        z
          .string()
          .trim()
          .min(1, `${label} es requerido`)
          .transform((val) => val.replace(/\s+/g, ""))
          .refine((val) => !val || /^\+51\d{9}$/.test(val), {
            message: `${label} debe tener formato +51 9XX XXX XXX`,
          })
          .optional(),
      );

export { phoneField };
