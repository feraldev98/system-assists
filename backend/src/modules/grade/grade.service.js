import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

const gradeService = {
  create: async (data) => {
    const queryResult = await prisma.$transaction(async (prisma) => {
      const GRADE_SELECT = {
        idGrade: true,
        level: true,
      };

      const grade = await prisma.grade.create({
        data,
        select: GRADE_SELECT,
      });
      return { grade };
    });
    return queryResult.grade;
  },
  get: async ({ page, limit, sortBy, sortOrder }) => {
    const grades = await prisma.grade.findMany({
      select: {
        idGrade: true,
        level: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.grade.count();

    return [grades, total];
  },
  getById: async (id) => {
    const grade = await prisma.grade.findUnique({
      where: { idGrade: id },
      select: {
        idGrade: true,
        level: true,
      },
    });
    if (!grade) {
      throw new AppError("Registro no encontrado", 404, [
        {
          field: "id",
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
      select: {
        idGrade: true,
        level: true,
      },
    });
    return gradeUpdated;
  },
  delete: async (id) => {
    const deletedGrade = await prisma.grade.delete({
      where: { idGrade: id },
      select: {
        idGrade: true,
        level: true,
      },
    });
    return deletedGrade;
  },
};

export { gradeService };
