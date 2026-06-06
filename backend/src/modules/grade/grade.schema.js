import z from "zod";
import { schemaUtils } from "../../utils/schema.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { gradeFields } from "./grade.fields.js";
const gradeSchema = {
  create: z
    .object({
      level: schemaUtils.numberField({
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
      id: schemaUtils.idField({
        label: "El ID del grado",
        required: false,
      }),
      page: schemaUtils.numberField({
        label: "La página",
        min: 1,
        max: 1000,
        defaultValue: 1,
        required: false,
      }),
      limit: schemaUtils.numberField({
        label: "El límite",
        min: 1,
        max: 10,
        defaultValue: 10,
        required: false,
      }),
      sortOrder: schemaUtils.sortOrderField(),
      search: schemaUtils.searchField(),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),

  update: z
    .object({
      level: schemaUtils.numberField({
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
