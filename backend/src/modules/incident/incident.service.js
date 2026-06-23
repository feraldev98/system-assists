import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { mappersUtils } from "../../utils/mappers.utils.js";
import { searchUtils } from "../../utils/search.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { incidentFields } from "./incident.fields.js";

const incidentService = {
  create: async (data) => {},

  get: async ({ page, limit, sortOrder, sortBy, search }) => {},

  getById: async ({ idIncident }) => {},

  update: async ({ idIncident, data }) => {},

  delete: async ({ idIncident }) => {},
};

export { incidentService };
