import { z } from "zod";
import { schemaUtils } from "../../utils/schema.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { classroomFields } from "./classroom.fields.js";
import { sectionFields } from "../section/section.fields.js";

const classroomSchema = {
  create: z
    .object({
      year: schemaUtils.numberField({
        label: "El año",
        min: 1900,
        max: 3000,
        required: true,
      }),
      idSection: schemaUtils.idField({
        label: "El ID de la sección",
        required: true,
      }),
      status: schemaUtils.statusField({
        states: classroomFields.status,
        required: false,
      }),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
  update: z
    .object({
      year: schemaUtils.numberField({
        label: "El año",
        min: 1900,
        max: 3000,
        required: false,
      }),
      idSection: schemaUtils.idField({
        label: "El ID de la sección",
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
        fields: classroomFields.update,
      });
    }),
  params: z.object({
    id: schemaUtils.idField({
      label: "El ID del salon de clase",
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
      defaultValue: "year",
    }),

    sortOrder: schemaUtils.sortOrderField(),

    search: schemaUtils.searchField(),
  }),
};

export { classroomSchema };
