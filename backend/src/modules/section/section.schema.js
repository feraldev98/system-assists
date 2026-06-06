import { z } from "zod";
import { schemaUtils } from "../../utils/schema.utils.js";
import { sectionFields } from "./section.fields.js";
import { validateUtils } from "../../utils/validate.utils.js";

const sectionSchema = {
  create: z
    .object({
      name: schemaUtils.sectionField({
        required: true,
      }),
      idGrade: schemaUtils.idField({
        label: "El ID del grado",
        required: true,
        type: "body",
      }),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
  update: z
    .object({
      name: schemaUtils.sectionField({
        required: false,
      }),
      idGrade: schemaUtils.idField({
        label: "El ID del grado",
        required: false,
        type: "body",
      }),
    })
    .strict({
      message: "No se permiten campos adicionales",
    })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({
        data,
        ctx,
        fields: sectionFields.update,
      });
    }),
  params: z
    .object({
      id: schemaUtils.idField({
        label: "El ID de la sección",
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
        max: 50,
        defaultValue: 10,
        required: false,
      }),

      sortBy: schemaUtils.sortByField({
        sortFields: sectionFields.sort,
        defaultValue: "grade",
      }),

      sortOrder: schemaUtils.sortOrderField(),

      search: schemaUtils.searchField(),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
};

export { sectionSchema };
