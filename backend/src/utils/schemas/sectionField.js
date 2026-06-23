import z from "zod";

const sectionField = ({ required }) =>
  required
    ? z.preprocess(
        (val) => val ?? "",
        z
          .string()
          .trim()
          .min(1, `El nombre de sección es requerido`)
          .max(1, `El nombre de sección solo puede ser una letra`)
          .regex(
            /^[A-Za-z]+$/,
            `El nombre de sección solo puede contener letras`,
          )
          .transform((value) => value.toUpperCase()),
      )
    : z.preprocess(
        (val) => val ?? "",
        z
          .string()
          .trim()
          .min(1, `El nombre de sección es requerido`)
          .max(1, `El nombre de sección solo puede ser una letra`)
          .regex(
            /^[A-Za-z]+$/,
            `El nombre de sección solo puede contener letras`,
          )
          .transform((value) => value.toUpperCase())
          .optional(),
      );

export { sectionField };
