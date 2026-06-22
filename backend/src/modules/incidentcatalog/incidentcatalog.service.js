import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { searchUtils } from "../../utils/search.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { incidentcatalogFields } from "./incidentcatalog.fields.js";

const incidentcatalogService = {
  create: async (data) => {
    // TODO: implementar lógica de creación
  },

  get: async ({ page, limit, sortOrder, sortBy, search }) => {
    // TODO: implementar lógica de listado con paginación
  },

  getById: async ({ idIncidentcatalog }) => {
    // TODO: implementar búsqueda por ID
    // Lanzar AppError 404 si no existe
  },

  update: async ({ idIncidentcatalog, data }) => {
    // TODO: verificar existencia, luego actualizar
  },

  delete: async ({ idIncidentcatalog }) => {
    // TODO: implementar eliminación
  },
};

export { incidentcatalogService };
