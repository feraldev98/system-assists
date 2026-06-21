import { attendanceService } from "./attendance.service.js";
import { attendanceSchema } from "./attendance.schema.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { AppError } from "../../utils/AppError.js";

const attendanceController = {
  create: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: attendanceSchema.create,
        data: req.body,
      });

      const idAuxiliar = await req.user.sub;
      console.log(idAuxiliar);

      if (!idAuxiliar) {
        throw new AppError("Sin autorización", 401, {
          message: "Sin autorización",
        });
      }

      const queryResult = await attendanceService.create(validate, idAuxiliar);

      return res.json({
        success: true,
        message: "Asistencia creada correctamente",
        attendance: queryResult,
      });
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      // TODO: validar query con attendanceSchema.params
      // TODO: llamar attendanceService.get
      // TODO: retornar con paginación
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      // TODO: validar params con attendanceSchema.params
      // TODO: llamar attendanceService.getById
      // TODO: retornar resultado
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      // TODO: validar params con attendanceSchema.params
      // TODO: validar body con attendanceSchema.update
      // TODO: llamar attendanceService.update
      // TODO: retornar resultado
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      // TODO: validar params con attendanceSchema.params
      // TODO: llamar attendanceService.delete
      // TODO: retornar resultado
    } catch (error) {
      next(error);
    }
  },
};

export { attendanceController };
