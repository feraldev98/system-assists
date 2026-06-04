import { prisma } from "../../config/prisma.js";

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
};

export { gradeService };
