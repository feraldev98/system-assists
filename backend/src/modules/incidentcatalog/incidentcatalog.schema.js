import { z } from "zod";
import { schemaUtils } from "../../utils/schema.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { incidentcatalogFields } from "./incidentcatalog.fields.js";

const incidentcatalogSchema = {
  create: z
    .object({
      // TODO: agregar campos del create
    })
    .strict({ message: "No se permiten campos adicionales" }),

  update: z
    .object({
      // TODO: agregar campos del update
    })
    .strict({ message: "No se permiten campos adicionales" })
    .superRefine((data, ctx) => {
      validateUtils.validateBody({
        data,
        ctx,
        fields: incidentcatalogFields.update,
      });
    }),

  params: z.object({
    id: schemaUtils.idField({ label: "El ID de incidentcatalog", required: false }),
    page: schemaUtils.numberField({ label: "La página", min: 1, max: 1000, defaultValue: 1, required: false }),
    limit: schemaUtils.numberField({ label: "El límite", min: 1, max: 50, defaultValue: 10, required: false }),
    sortBy: schemaUtils.sortByField({ sortFields: incidentcatalogFields.sort, defaultValue: "idIncidentcatalog" }),
    sortOrder: schemaUtils.sortOrderField(),
    search: schemaUtils.searchField(),
  }),
};

export { incidentcatalogSchema };
