import z from "zod";

const nameField = ({ label, min, max, required }) =>
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
          .transform((value) => value.replace(/\s+/g, " "))
          .transform((value) => value.toUpperCase()),
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
          .transform((value) => value.toUpperCase())
          .optional(),
      );

export { nameField };
