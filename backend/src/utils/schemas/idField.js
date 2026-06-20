import z from "zod";

const idField = ({ label, required }) => {
  const chain = z
    .string({ invalid_type_error: `${label} debe ser un número entero` })
    .min(1, `${label} es requerido`)
    .regex(/^\d+$/, `${label} debe ser un número entero`)
    .transform(Number);

  const preprocessed = z.preprocess((val) => {
    if (val === undefined || val === null) return "";
    return String(val);
  }, chain);

  return required ? preprocessed : preprocessed.optional();
};

export { idField };
