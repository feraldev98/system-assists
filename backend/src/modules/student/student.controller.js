import { studentService } from "./student.service.js";
import { studentSchema } from "./student.schema.js";
import { validateUtils } from "../../utils/validate.utils.js";

const studentController = {
  create: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: studentSchema.create,
        data: req.body,
      });
      console.log(validate);
      const queryResult = await studentService.create(validate);
      return res.json({
        success: true,
        message: "Estudiante creado correctamente",
        student: queryResult,
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

export { studentController };
