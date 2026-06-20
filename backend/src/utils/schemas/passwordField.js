import z from "zod";

const passwordField = ({ label, min, max, required }) =>
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
      );

export { passwordField };
