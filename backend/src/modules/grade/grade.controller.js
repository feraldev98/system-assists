import { gradeSchema } from "./grade.schema.js";
import { gradeService } from "./grade.service.js";
import { validateSchema } from "../../utils/validate.utils.js";

const gradeController = {
  create: async (req, res) => {
    const data = await validateSchema(gradeSchema.createGrade, req.body);
    const newGrade = await gradeService.create(data);

    return res.json({
      message: "Grado creado correctamente",
      grade: newGrade,
    });
  },
};

export { gradeController };
