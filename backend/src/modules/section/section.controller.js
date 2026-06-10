import { sectionService } from "./section.service.js";
import { sectionSchema } from "./section.schema.js";
import { validateUtils } from "../../utils/validate.utils.js";

const sectionController = {
  create: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: sectionSchema.create,
        data: req.body,
      });
      console.log(validate);
      const queryResult = await sectionService.create(validate);

      return res.json({
        success: true,
        message: "Seccion creada correctamente",
        section: queryResult,
      });
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: sectionSchema.params,
        data: req.query,
      });

      const [sections, total] = await sectionService.get(validate);

      return res.json({
        success: true,
        data: sections,
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

  update: async (req, res, next) => {
    try {
      const { id: idSection } = await validateUtils.validateSchema({
        schema: sectionSchema.params,
        data: req.params,
      });

      const data = await validateUtils.validateSchema({
        schema: sectionSchema.update,
        data: req.body,
      });

      const updatedSection = await sectionService.update(idSection, data);

      return res.json({
        success: true,
        message: "Seccion actualizada correctamente",
        section: updatedSection,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id: idSection } = await validateUtils.validateSchema({
        schema: sectionSchema.params,
        data: req.params,
      });

      const section = await sectionService.getById(idSection);

      return res.json({
        success: true,
        message: "Seccion encontrada",
        section,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id: idSection } = await validateUtils.validateSchema({
        schema: sectionSchema.params,
        data: req.params,
      });

      const deletedSection = await sectionService.delete(idSection);

      return res.json({
        success: true,
        message: "Seccion eliminada correctamente",
        section: deletedSection,
      });
    } catch (error) {
      next(error);
    }
  },
};

export { sectionController };
