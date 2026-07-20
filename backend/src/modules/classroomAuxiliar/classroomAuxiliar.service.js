import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { mappersUtils } from "../../utils/mappers.utils.js";
import { classroomAuxiliarFields } from "./classroomAuxiliar.fields.js";

const classroomAuxiliarService = {
  create: async (data) => {
    const queryResult = await prisma.$transaction(async (prisma) => {
      const userRole = await prisma.user.findUnique({
        where: { idUser: data.idAuxiliar },
        select: { role: true },
      });

      if (userRole?.role !== "AUXILIAR") {
        throw new AppError(
          "No existe un registro con el ID proporcionado",
          404,
          [
            {
              field: "idAuxiliar",
              message: "No existe un registro con el ID proporcionado",
            },
          ],
        );
      }

      const classroomAuxiliar = await prisma.classroomAuxiliar.create({
        data: { idClassroom: data.idClassroom, idAuxiliar: data.idAuxiliar },
        select: classroomAuxiliarFields.create,
      });
      return {
        classroomAuxiliar:
          mappersUtils.formatClassroomAuxiliar(classroomAuxiliar),
      };
    });
    return queryResult.classroomAuxiliar;
  },

  get: async ({ page, limit, sortOrder, sortBy, search }) => {},

  getById: async ({ idClassroomAuxiliar }) => {},

  update: async ({ idClassroomAuxiliar, data }) => {},

  delete: async ({ idClassroomAuxiliar }) => {},
};

export { classroomAuxiliarService };
