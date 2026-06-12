import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { searchUtils } from "../../utils/search.utils.js";
import { sectionFields } from "./section.fields.js";

const sectionService = {
  create: async ({ name, idGrade }) => {
    const section = await prisma.section.findFirst({
      where: { idGrade, name },
      select: sectionFields.create,
    });

    if (section) {
      throw new AppError("Valor duplicado", 409, [
        {
          field: "name",
          message: "Ya existe un registro con este valor",
        },
      ]);
    }

    const queryResult = await prisma.$transaction(async (prisma) => {
      const section = await prisma.section.create({
        data: { name, idGrade },
        select: sectionFields.select,
      });
      return { section };
    });
    return queryResult.section;
  },

  get: async ({ page, limit, sortOrder, search, sortBy }) => {
    const where = searchUtils.buildMixedWhere({
      search,
      stringFields: ["name"],
      numberFields: ["idSection", "idGrade"],
      relationFields: [
        {
          relation: "grade",
          field: "level",
        },
      ],
    });

    let orderBy;

    if (sortBy === "grade") {
      orderBy = {
        grade: {
          level: sortOrder,
        },
      };
    } else {
      orderBy = {
        [sortBy]: sortOrder,
      };
    }

    const sections = await prisma.section.findMany({
      where,
      select: sectionFields.select,
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
    });

    const total = await prisma.section.count({
      where,
    });

    return [sections, total];
  },

  getById: async (idSection) => {
    const section = await prisma.section.findUnique({
      where: { idSection },
      select: sectionFields.select,
    });

    if (!section) {
      throw new AppError("Registro no encontrado", 404, [
        {
          field: "idSection",
          message: "No existe un registro con el ID proporcionado",
        },
      ]);
    }

    return section;
  },

  update: async (idSection, data) => {
    const section = await prisma.section.findFirst({
      where: {
        idSection,
        idGrade: data.idGrade,
        name: data.name,
      },
      select: sectionFields.select,
    });

    if (section) {
      throw new AppError("Valor duplicado", 409, [
        {
          field: "idSection",
          message: "Ya existe un registro con este valor",
        },
      ]);
    }

    const updatedSection = await prisma.section.update({
      where: {
        idSection,
      },
      data,
      select: sectionFields.select,
    });
    return updatedSection;
  },

  delete: async (idSection) => {
    const deletedSection = await prisma.section.delete({
      where: { idSection },
      select: sectionFields.select,
    });
    return deletedSection;
  },
};

export { sectionService };
