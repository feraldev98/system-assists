import { incidentCatalogService } from "./incidentCatalog.service.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { incidentCatalogSchema } from "./incidentCatalog.schema.js";

const incidentCatalogController = {
  create: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: incidentCatalogSchema.create,
        data: req.body,
      });

      const newIncidentCatalog = await incidentCatalogService.create(validate);

      return res.json({
        success: true,
        message: "Catálogo de incidente creado correctamente",
        incidentCatalog: { ...newIncidentCatalog },
      });
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: incidentCatalogSchema.params,
        data: req.query,
      });

      const [incidentCatalogs, total] =
        await incidentCatalogService.get(validate);

      return res.json({
        success: true,
        data: incidentCatalogs,
        pagination: {
          page: validate.page,
          limit: validate.limit,
          total,
          totalPages: Math.ceil(total / validate.limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id: idIncidentCatalog } = await validateUtils.validateSchema({
        schema: incidentCatalogSchema.params,
        data: req.params,
      });

      const incidentCatalog = await incidentCatalogService.getById({
        idIncidentCatalog,
      });

      return res.json({
        success: true,
        message: "Catálogo de incidente encontrado",
        incidentCatalog: { ...incidentCatalog },
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id: idIncidentCatalog } = await validateUtils.validateSchema({
        schema: incidentCatalogSchema.params,
        data: req.params,
      });

      const data = await validateUtils.validateSchema({
        schema: incidentCatalogSchema.update,
        data: req.body,
      });

      const updatedIncidentCatalog = await incidentCatalogService.update({
        idIncidentCatalog,
        data,
      });

      return res.json({
        success: true,
        message: "Catálogo de incidente actualizado correctamente",
        incidentCatalog: { ...updatedIncidentCatalog },
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id: idIncidentCatalog } = await validateUtils.validateSchema({
        schema: incidentCatalogSchema.params,
        data: req.params,
      });

      const deletedIncidentCatalog = await incidentCatalogService.delete({
        idIncidentCatalog,
      });

      return res.json({
        success: true,
        message: "Catálogo de incidente eliminado correctamente",
        incidentCatalog: { ...deletedIncidentCatalog },
      });
    } catch (error) {
      next(error);
    }
  },
};

export { incidentCatalogController };
