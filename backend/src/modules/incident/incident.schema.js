import { z } from "zod";
import { validateUtils } from "../../utils/validate.utils.js";
import { incidentFields } from "./incident.fields.js";
import { idField } from "../../utils/schemas/idField.js";
import { numericField } from "../../utils/schemas/numericField.js";
import { statusField } from "../../utils/schemas/statusField.js";
import { sortByField } from "../../utils/schemas/sortByField.js";
import { sortOrderField } from "../../utils/schemas/sortOrderField.js";
import { searchField } from "../../utils/schemas/searchField.js";

const incidentSchema = {
  create: z
    .object({
      // TODO: campos del create
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),

  update: z
    .object({
      // TODO: campos del update
    })
    .strict({
      message: "No se permiten campos adicionales",
    })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({
        data,
        ctx,
        fields: incidentFields.update,
      });
    }),

  params: z.object({
    id: idField({
      label: "El ID de incident",
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
      max: 50,
      defaultValue: 10,
      required: false,
    }),
    sortBy: sortByField({
      sortFields: incidentFields.sort,
      defaultValue: "idIncident",
    }),
    sortOrder: sortOrderField(),
    search: searchField(),
  }),
};

export { incidentSchema };
