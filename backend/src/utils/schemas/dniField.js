import z from "zod";

const dniField = ({ label = "El dni", required = true }) =>
  z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .trim()
      .min(required ? 1 : 0, `${label} es requerida`)
      .length(8, `${label} debe tener 8 caracteres`)
      .regex(/^[0-9]+$/, `${label} debe ser numérico`),
  );

export { dniField };
