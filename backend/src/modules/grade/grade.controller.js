import { gradeSchema } from "./grade.schema.js";
import { gradeService } from "./grade.service.js";
import { validateSchema } from "../../utils/validate.utils.js";

const gradeController = {
  create: async (req, res, next) => {
    try {
      const data = await validateSchema(gradeSchema.createGrade, req.body);
      const newGrade = await gradeService.create(data);

      return res.json({
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
        data: grades,
        pagination: {
          page: 1,
          limit: totalGrades,
          total: totalGrades,
          totalPages: Math.ceil(totalGrades / validate.limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export { gradeController };
