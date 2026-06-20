import z from "zod";

const searchField = () =>
  z
    .string()
    .trim()
    .min(1, "La búsqueda no puede estar vacía")
    .max(100, "La búsqueda no puede tener más de 100 caracteres")
    .transform((value) => value.replace(/\s+/g, " "))
    .optional();

export { searchField };
