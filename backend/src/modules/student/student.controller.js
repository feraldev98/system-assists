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
      const queryResult = await studentService.create(validate);
      return res.json({
        success: true,
        message: "Estudiante creado correctamente",
        student: {...queryResult},
      });
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: studentSchema.params,
        data: req.query,
      });

      const [students, total] = await studentService.get(validate);

      return res.json({
        success: true,
        data: students,
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
      const { id: idStudent } = await validateUtils.validateSchema({
        schema: studentSchema.params,
        data: req.params,
      });

      const data = await validateUtils.validateSchema({
        schema: studentSchema.update,
        data: req.body,
      });

      const updatedStudent = await studentService.update({ idStudent, data });

      return res.json({
        success: true,
        message: "Estudiante actualizado correctamente",
        student: updatedStudent,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id: idStudent } = await validateUtils.validateSchema({
        schema: studentSchema.params,
        data: req.params,
      });

      const student = await studentService.getById({ idStudent });

      return res.json({
        success: true,
        message: "Estudiante encontrado",
        student,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id: idStudent } = await validateUtils.validateSchema({
        schema: studentSchema.params,
        data: req.params,
      });

      const deletedStudent = await studentService.delete({ idStudent });

      return res.json({
        success: true,
        message: "Estudiante eliminado correctamente",
        student: deletedStudent,
      });
    } catch (error) {
      next(error);
    }
  },
};

export { studentController };
