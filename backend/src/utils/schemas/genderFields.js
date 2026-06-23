import z from "zod";

const genderField = ({ required = true }) => {
  const schema = z.preprocess(
    (val) => val ?? "",
    z
      .string("El sexo debe ser (M)asculino, (F)emenino u (O)tro")
      .min(1, "El sexo es requerido")
      .refine((val) => ["M", "F", "O"].includes(val), {
        message: "El sexo debe ser (M)asculino, (F)emenino u (O)tro",
      }),
  );

  return required ? schema : schema.optional();
};

export { genderField };
