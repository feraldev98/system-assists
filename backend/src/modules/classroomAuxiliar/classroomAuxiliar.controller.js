import { classroomAuxiliarService } from "./classroomAuxiliar.service.js";
import { classroomAuxiliarSchema } from "./classroomAuxiliar.schema.js";
import { validateUtils } from "../../utils/validate.utils.js";

const classroomAuxiliarController = {
  create: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: classroomAuxiliarSchema.create,
        data: req.body,
      });

      const queryResult = await classroomAuxiliarService.create(validate);

      return res.json({
        success: true,
        message: "Auxiliar asignado correctamente",
        data: queryResult,
      });
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};

export { classroomAuxiliarController };
