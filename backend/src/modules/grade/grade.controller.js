import { validateUtils } from "../../utils/validate.utils.js";
import { userSchema } from "../user/user.schema.js";
import { gradeSchema } from "./grade.schema.js";
import { gradeService } from "./grade.service.js";

const gradeController = {
  create: async (req, res, next) => {
    try {
      const data = await validateUtils.validateSchema({
        schema: gradeSchema.create,
        data: req.body,
      });
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
      const validate = await validateUtils.validateSchema({
        schema: gradeSchema.params,
        data: req.query,
      });
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
      const validate = await validateUtils.validateSchema({
        schema: userSchema.params,
        data: req.params,
      });
      const grade = await gradeService.getById(validate.id);
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
      const { id: idGrade } = await validateUtils.validateSchema({
        schema: userSchema.params,
        data: req.params,
      });

      const data = await validateUtils.validateSchema({
        schema: gradeSchema.update,
        data: req.body,
      });
      const updatedGrade = await gradeService.update(idGrade, data);

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
      const { id } = await validateUtils.validateSchema({
        schema: gradeSchema.params,
        data: req.params,
      });
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
