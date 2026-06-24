import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { searchUtils } from "../../utils/search.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { incidentFields } from "./incident.fields.js";

const incidentService = {
  create: async (data) => {
    const queryResult = await prisma.$transaction(async (prisma) => {
      const incident = await prisma.incident.create({
        data,
        select: incidentFields.create,
      });
      return { incident };
    });
    return queryResult.incident;
  },

  get: async ({ page, limit, sortOrder, sortBy, search, incidentCatalog }) => {
    const where = searchUtils.buildSearchWhere({
      search,
      numberFields: ["idIncident"],
      relationStringFields: [
        { relation: "incidentCatalog", field: "name" },
        { relation: "incidentCatalog", field: "description" },
        { relation: "student", field: "firstname" },
        { relation: "student", field: "lastname" },
      ],
      filters: {
        incidentCatalog,
      },
    });
    const [incidents, total] = await prisma.$transaction([
      prisma.incident.findMany({
        where,
        orderBy: validateUtils.buildOrderBy(sortBy, sortOrder),
        skip: (page - 1) * limit,
        take: limit,
        select: incidentFields.select,
      }),
      prisma.incident.count({ where }),
    ]);
    return [incidents, total];
  },

  getById: async ({ idIncident }) => {
    const incident = await prisma.incident.findUnique({
      where: { idIncident },
      select: incidentFields.select,
    });
    if (!incident) {
      throw new AppError("Registro no encontrado", 404, [
        {
          field: "idIncident",
          message: "No existe un registro con el ID proporcionado",
        },
      ]);
    }
    return incident;
  },

  update: async ({ idIncident, data }) => {
    const updatedIncident = await prisma.incident.update({
      where: {
        idIncident,
      },
      data,
      select: incidentFields.select,
    });

    if (!updatedIncident) {
      throw new AppError("Registro no encontrado", 404, [
        {
          field: "idIncident",
          message: "No existe un registro con el ID proporcionado",
        },
      ]);
    }

    return updatedIncident;
  },

  delete: async ({ idIncident }) => {
    const deletedIncident = await prisma.incident.delete({
      where: { idIncident },
      select: incidentFields.select,
    });

    return deletedIncident;
  },
};

export { incidentService };
