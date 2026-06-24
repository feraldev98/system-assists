import z from "zod";

const dateField = ({ label = "La fecha", required = true }) =>
  required
    ? z.coerce
        .date({
          error: (issue) =>
            issue.input === undefined
              ? `${label} es requerida`
              : `${label} debe ser una fecha válida`,
        })
        .refine((date) => !isNaN(date.getTime()), {
          message: `${label} no es una fecha válida`,
        })
    : z.coerce
        .date()
        .refine((date) => !isNaN(date.getTime()), {
          message: `${label} no es una fecha válida`,
        })
        .optional();

export { dateField };
