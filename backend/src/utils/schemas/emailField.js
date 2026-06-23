import z from "zod";

const emailField = ({ label, required }) =>
  required
    ? z.preprocess(
        (val) => val ?? null,
        z
          .string({
            error: (issue) => {
              if (issue.input === undefined || issue.input === null) {
                return `${label} es requerido`;
              }

              return `${label} debe ser un texto`;
            },
          })
          .trim()
          .min(1, `${label} es requerido`)
          .email(`${label} no tiene un formato válido`)
          .toLowerCase(),
      )
    : z.preprocess(
        (val) => val ?? null,
        z
          .string({
            error: (issue) => {
              if (issue.input === undefined || issue.input === null) {
                return `${label} es requerido`;
              }

              return `${label} debe ser un texto`;
            },
          })
          .trim()
          .min(1, `${label} es requerido`)
          .email(`${label} no tiene un formato válido`)
          .toLowerCase()
          .optional(),
      );

export { emailField };
