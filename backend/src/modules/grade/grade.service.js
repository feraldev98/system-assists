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
};

export { gradeService };
