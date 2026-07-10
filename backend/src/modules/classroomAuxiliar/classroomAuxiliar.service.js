import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { mappersUtils } from "../../utils/mappers.utils.js";
import { searchUtils } from "../../utils/search.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { classroomAuxiliarFields } from "./classroomAuxiliar.fields.js";

const classroomAuxiliarService = {
  create: async (data) => {
    const queryResult = await prisma.$transaction(async (prisma) => {
      const classroomAuxiliar = await prisma.classroomAuxiliar.create({
        data: { idClassroom: data.idClassroom, idAuxiliar: data.idAuxiliar },
        select: classroomAuxiliarFields.create,
      });
      return { classroomAuxiliar };
    });
    return queryResult.classroomAuxiliar;
  },

  get: async ({ page, limit, sortOrder, sortBy, search }) => {},

  getById: async ({ idClassroomAuxiliar }) => {},

  update: async ({ idClassroomAuxiliar, data }) => {},

  delete: async ({ idClassroomAuxiliar }) => {},
};

export { classroomAuxiliarService };
