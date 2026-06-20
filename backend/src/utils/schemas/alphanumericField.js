import z from "zod";

const alphanumericField = ({ label, min = 1, max = 32, required = true }) =>
  z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .trim()
      .min(required ? 1 : 0, `${label} es requerida`)
      .min(min, `${label} debe tener mínimo ${min} caracteres`)
      .max(max, `${label} no puede tener más de ${max} caracteres`),
  );

export { alphanumericField };
