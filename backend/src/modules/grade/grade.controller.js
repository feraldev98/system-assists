import { gradeSchema } from "./grade.schema.js";
import { gradeService } from "./grade.service.js";
import { idSchema, validateSchema } from "../../utils/validate.utils.js";

const gradeController = {
  create: async (req, res, next) => {
    try {
      const data = await validateSchema(gradeSchema.createGrade, req.body);
      const newGrade = await gradeService.create(data);

      return res.json({
        success: true,
        message: "Grado creado correctamente",
        grade: newGrade,
      });
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const validate = await validateSchema(gradeSchema.userParams, req.query);
      const [grades, totalGrades] = await gradeService.get(validate);
      return res.json({
        success: true,
        data: grades,
        pagination: {
          page: 1,
          limit: validate.limit,
          total: totalGrades,
          totalPages: Math.ceil(totalGrades / validate.limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = await validateSchema(idSchema, req.params);
      const grade = await gradeService.getById(id);
      return res.json({
        success: true,
        message: "Grado encontrado",
        grade,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = await validateSchema(idSchema, req.params);
      const data = await validateSchema(gradeSchema.updateGrade, req.body);
      const updatedGrade = await gradeService.update(id, data);
      return res.json({
        success: true,
        message: "Grado actualizado correctamente",
        grade: updatedGrade,
      });
    } catch (error) {
      next(error);
    }
  },

  // todo: delete by id.
  delete: async (req, res, next) => {
    try {
      const { id } = await validateSchema(idSchema, req.params);
      const deletedGrade = await gradeService.delete(id);
      return res.json({
        success: true,
        message: "Grado eliminado correctamente",
        grade: deletedGrade,
      });
    } catch (error) {
      next(error);
    }
  },
};

export { gradeController };
