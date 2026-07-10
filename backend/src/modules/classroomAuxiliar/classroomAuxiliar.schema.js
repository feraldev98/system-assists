import { z } from "zod";
import { validateUtils } from "../../utils/validate.utils.js";
import { classroomAuxiliarFields } from "./classroomAuxiliar.fields.js";
import { idField } from "../../utils/schemas/idField.js";
import { numericField } from "../../utils/schemas/numericField.js";
import { statusField } from "../../utils/schemas/statusField.js";
import { sortByField } from "../../utils/schemas/sortByField.js";
import { sortOrderField } from "../../utils/schemas/sortOrderField.js";
import { searchField } from "../../utils/schemas/searchField.js";

const classroomAuxiliarSchema = {
  create: z
    .object({
      idClassroom: idField({
        label: "El ID del salon de clase",
        required: true,
      }),
      idAuxiliar: idField({
        label: "El ID del auxiliar",
        required: true,
      }),
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
        fields: classroomAuxiliarFields.update,
      });
    }),

  params: z.object({
    id: idField({
      label: "El ID de classroomAuxiliar",
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
      sortFields: classroomAuxiliarFields.sort,
      defaultValue: "idClassroomAuxiliar",
    }),
    sortOrder: sortOrderField(),
    search: searchField(),
  }),
};

export { classroomAuxiliarSchema };
