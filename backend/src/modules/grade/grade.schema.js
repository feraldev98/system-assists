import z from "zod";
import { validateUtils } from "../../utils/validate.utils.js";
import { gradeFields } from "./grade.fields.js";
import { idField } from "../../utils/schemas/idField.js";
import { numericField } from "../../utils/schemas/numericField.js";
import { sortOrderField } from "../../utils/schemas/sortOrderField.js";
import { searchField } from "../../utils/schemas/searchField.js";
const gradeSchema = {
  create: z
    .object({
      level: numericField({
        label: "El grado",
        min: 0,
        max: 15,
        required: true,
      }),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),

  params: z
    .object({
      id: idField({
        label: "El ID del grado",
        required: false,
      }),
      page: numericField({
        label: "La página",
        min: 1,
        max: 1000,
        defaultValue: 1,
        required: false,
      }),
      limit: numericField({
        label: "El límite",
        min: 1,
        max: 10,
        defaultValue: 10,
        required: false,
      }),
      sortOrder: sortOrderField(),
      search: searchField(),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),

  update: z
    .object({
      level: numericField({
        label: "El grado",
        min: 0,
        max: 15,
        required: false,
      }),
    })
    .strict({
      message: "No se permiten campos adicionales",
    })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({
        data,
        ctx,
        fields: gradeFields.editableFields,
      });
    }),
};

export { gradeSchema };
