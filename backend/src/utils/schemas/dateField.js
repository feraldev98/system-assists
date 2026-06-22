import z from "zod";

const dateField = ({ label = "La fecha", required = true }) =>
  required
    ? z.preprocess(
        (val) => val ?? "",
        z
          .date({
            invalid_type_error: `${label} debe ser una fecha válida`,
            required_error: `${label} es requerida`,
          })
          .refine((date) => !isNaN(date.getTime()), {
            message: `${label} no es una fecha válida`,
          }),
      )
    : z
        .preprocess(
          (val) => val ?? "",
          z
            .date({
              invalid_type_error: `${label} debe ser una fecha válida`,
              required_error: `${label} es requerida`,
            })
            .refine((date) => !isNaN(date.getTime()), {
              message: `${label} no es una fecha válida`,
            }),
        )
        .optional();

export { dateField };
