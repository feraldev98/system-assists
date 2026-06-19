import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { searchUtils } from "../../utils/search.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { classroomFields } from "./classroom.fields.js";

const classroomService = {
  create: async (data) => {
    const queryResult = await prisma.$transaction(async (prisma) => {
      const classroom = await prisma.classroom.create({
        data,
        select: classroomFields.create,
      });

      return { ...classroom };
    });

    return queryResult;
  },

  get: async ({ page, limit, sortOrder, sortBy, search, year }) => {
    const where = searchUtils.buildSearchWhere({
      search,
      numberFields: ["idClassroom"],
      relationStringFields: [
        {
          relation: "section",
          field: "name",
        },
      ],
      relationNestedFields: [
        {
          relation: "section",
          nestedRelation: "grade",
          field: "level",
        },
      ],
      filters: {
        year,
      },
    });
    const [classrooms, total] = await Promise.all([
      prisma.classroom.findMany({
        where,
        select: classroomFields.select,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: validateUtils.buildOrderBy(sortBy, sortOrder),
      }),
      prisma.classroom.count({ where }),
    ]);
    return [classrooms, total];
  },

  getById: async ({ idClassroom }) => {
    const classroom = await prisma.classroom.findUnique({
      where: { idClassroom },
      select: classroomFields.select,
    });
    if (!classroom) {
      throw new AppError("Registro no encontrado", 404, [
        {
          field: "idClassroom",
          message: "No existe un registro con el ID proporcionado",
        },
      ]);
    }
    return classroom;
  },

  update: async ({ idClassroom, data }) => {
    // 1. Verificar existencia
    const classroom = await prisma.classroom.findUnique({
      where: { idClassroom },
    });
    if (!classroom) {
      throw new AppError("Registro no encontrado", 404, [
        {
          field: "idClassroom",
          message: "No existe un registro con el ID proporcionado",
        },
      ]);
    }

    // 2. Fallback a valores actuales si no se envían
    const yearToCheck = data.year ?? classroom.year;
    const idSectionToCheck = data.idSection ?? classroom.idSection;

    // 3. Solo validar duplicado si cambió algo
    const isChanging =
      yearToCheck !== classroom.year ||
      idSectionToCheck !== classroom.idSection;

    if (isChanging) {
      const duplicate = await prisma.classroom.findFirst({
        where: {
          year: yearToCheck,
          idSection: idSectionToCheck,
          NOT: { idClassroom },
        },
      });
      if (duplicate) {
        throw new AppError("Valor duplicado", 400, [
          {
            field: ["year", "idSection"],
            message: "Ya existe un salón con ese año y sección",
          },
        ]);
      }
    }

    // 4. Actualizar
    const updatedClassroom = await prisma.classroom.update({
      where: { idClassroom },
      data,
      select: classroomFields.select,
    });
    return updatedClassroom;
  },

  delete: async ({ idClassroom }) => {
    const deletedClassroom = await prisma.classroom.delete({
      where: { idClassroom },
      select: classroomFields.select,
    });
    return deletedClassroom;
  },
};

export { classroomService };
