import { incidentcatalogService } from "./incidentcatalog.service.js";
import { incidentcatalogSchema } from "./incidentcatalog.schema.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { incidentcatalogFields } from "./incidentcatalog.fields.js";

const incidentcatalogController = {
  create: async (req, res, next) => {
    try {
      // TODO: validar body con incidentcatalogSchema.create
      // TODO: llamar incidentcatalogService.create
      // TODO: retornar respuesta
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      // TODO: validar query con incidentcatalogSchema.params
      // TODO: llamar incidentcatalogService.get
      // TODO: retornar con paginación
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      // TODO: validar params con incidentcatalogSchema.params
      // TODO: llamar incidentcatalogService.getById
      // TODO: retornar resultado
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      // TODO: validar params con incidentcatalogSchema.params
      // TODO: validar body con incidentcatalogSchema.update
      // TODO: llamar incidentcatalogService.update
      // TODO: retornar resultado
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      // TODO: validar params con incidentcatalogSchema.params
      // TODO: llamar incidentcatalogService.delete
      // TODO: retornar resultado
    } catch (error) {
      next(error);
    }
  },
};

export { incidentcatalogController };
