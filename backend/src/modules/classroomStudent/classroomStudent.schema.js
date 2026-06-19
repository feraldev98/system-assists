import { z } from "zod";
import { schemaUtils } from "../../utils/schema.utils.js";
import { classroomStudentFields } from "./classroomStudent.fields.js";
import { validateUtils } from "../../utils/validate.utils.js";

const classroomStudentSchema = {
  create: z
    .object({
      idClassroom: schemaUtils.idField({
        label: "El ID del salon de clase",
        required: true,
      }),
      idStudent: schemaUtils.idField({
        label: "El ID del estudiante",
        required: true,
      }),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
  update: z
    .object({
      idClassroom: schemaUtils.idField({
        label: "El ID del salon de clase",
        required: false,
      }),
      idStudent: schemaUtils.idField({
        label: "El ID del estudiante",
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
        fields: classroomStudentFields.update,
      });
    }),
  params: z
    .object({
      id: schemaUtils.idField({
        label: "El ID del registro",
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
      idClassroom: schemaUtils.idField({
        label: "El ID del salon de clase",
        required: false,
      }),
      idStudent: schemaUtils.idField({
        label: "El ID del estudiante",
        required: false,
      }),
      sortBy: schemaUtils.sortByField({
        sortFields: classroomStudentFields.sort,
        defaultValue: "idClassroom",
      }),
      sortOrder: schemaUtils.sortOrderField(),
      search: schemaUtils.searchField(),
    })
    .strict({
      message: "No se permiten campos adicionales",
    }),
};

export { classroomStudentSchema };
