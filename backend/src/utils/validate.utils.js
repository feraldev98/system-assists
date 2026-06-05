import z from "zod";
import { AppError } from "./AppError.js";
import { userFields } from "../modules/user/user.fields.js";

const validateUtils = {
  validateBody: ({ data, ctx }) => {
    // validar que haya al menos un campo
    const hasAtLeastOneField = userFields.editableFields.some(
      (field) => data[field] !== undefined,
    );

    if (!hasAtLeastOneField) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["body"],
        message: "Debes enviar al menos un campo para actualizar",
      });
    }
  },
  verifyPasswords: ({ data, ctx }) => {
    // Si envía password pero no repassword
    if (data.password && !data.repassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["repassword"],
        message: "Debes confirmar la contraseña",
      });
    }
    // Si envía repassword pero no password
    if (!data.password && data.repassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Debes enviar una contraseña",
      });
    }
    // Si ambas existen pero no coinciden
    if (data.password && data.repassword && data.password !== data.repassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["repassword"],
        message: "Las contraseñas no coinciden",
      });
    }
  },
  validateSchema: async ({ schema, data }) => {
    const validate = await schema.safeParseAsync(data);

    if (!validate.success) {
      const errors = validate.error.issues.flatMap((issue) => {
        if (issue.code === "unrecognized_keys") {
          return issue.keys.map((key) => ({
            field: key,
            message: "No se permiten campos adicionales",
          }));
        }

        return {
          field: issue.path.length > 0 ? issue.path.join(".") : "general",
          message: issue.message,
        };
      });
      throw new AppError("Error de validación", 400, errors);
    }
    return validate.data;
  },
};

export { validateUtils };
