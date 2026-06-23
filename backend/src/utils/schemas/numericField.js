import z from "zod";

const numericField = ({ label, min, max, defaultValue, required }) =>
  required
    ? z.preprocess(
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
            message: `${label} debe ser mayor o igual a ${min}`,
          })
          .refine((val) => Number(val) <= max, {
            message: `${label} no puede ser mayor a ${max}`,
          })
          .transform((val) => Number(val)),
      )
    : z.preprocess(
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
            message: `${label} debe ser mayor o igual a ${min}`,
          })
          .refine((val) => Number(val) <= max, {
            message: `${label} no puede ser mayor a ${max}`,
          })
          .transform((val) => Number(val))
          .optional(),
      );
export { numericField };

//numberField
