import z from "zod";

const sortOrderField = () =>
  z
    .string()
    .refine((val) => ["asc", "desc"].includes(val), {
      message: "El orden debe ser asc o desc",
    })
    .default("asc");

export { sortOrderField };
