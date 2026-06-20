import z from "zod";

const sortByField = ({ sortFields, defaultValue = "createdAt" }) =>
  z
    .string()
    .refine((val) => sortFields.includes(val), {
      message: `El campo para ordenar solo puede ser ${sortFields.join(", ")}`,
    })
    .default(defaultValue);

export { sortByField };
