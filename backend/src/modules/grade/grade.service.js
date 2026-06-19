import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { searchUtils } from "../../utils/search.utils.js";
import { gradeFields } from "./grade.fields.js";

const gradeService = {
  create: async (data) => {
    const queryResult = await prisma.$transaction(async (prisma) => {
      const grade = await prisma.grade.create({
        data,
        select: gradeFields.selectFields,
      });
      return { grade };
    });
    return queryResult.grade;
  },

  get: async ({ page, limit, sortOrder, search }) => {
    const where = searchUtils.buildSearchWhere({
      search,
      numberFields: ["level"],
    });
    const [grades, total] = await Promise.all([
      prisma.grade.findMany({
        where,
        select: gradeFields.selectFields,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { level: sortOrder },
      }),
      prisma.grade.count({ where }),
    ]);
    return [grades, total];
  },

  getById: async (idGrade) => {
    const grade = await prisma.grade.findUnique({
      where: { idGrade },
      select: gradeFields.selectFields,
    });
    if (!grade) {
      throw new AppError("Registro no encontrado", 404, [
        {
          field: "idGrade",
          message: "No existe un registro con el ID proporcionado",
        },
      ]);
    }
    return grade;
  },

  update: async (id, data) => {
    const gradeUpdated = await prisma.grade.update({
      where: { idGrade: id },
      data,
      select: gradeFields.selectFields,
    });
    return gradeUpdated;
  },
  delete: async (id) => {
    const deletedGrade = await prisma.grade.delete({
      where: { idGrade: id },
      select: gradeFields.selectFields,
    });
    return deletedGrade;
  },
};

export { gradeService };
