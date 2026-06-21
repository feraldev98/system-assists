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
      const validate = await validateUtils.validateSchema({
        schema: attendanceSchema.params,
        data: req.query,
      });

      const { attendances, total } = await attendanceService.get(validate);

      return res.json({
        success: true,
        data: attendances,
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
      const { id: idAttendance } = await validateUtils.validateSchema({
        schema: attendanceSchema.params,
        data: req.params,
      });

      const attendance = await attendanceService.getById({ idAttendance });

      return res.json({
        success: true,
        message: "Asistencia encontrada",
        data: attendance,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id: idAttendance } = await validateUtils.validateSchema({
        schema: attendanceSchema.params,
        data: req.params,
      });

      const data = await validateUtils.validateSchema({
        schema: attendanceSchema.update,
        data: req.body,
      });

      const updatedAttendance = await attendanceService.update({
        idAttendance,
        data,
      });

      return res.json({
        success: true,
        message: "Asistencia actualizada correctamente",
        attendance: updatedAttendance,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id: idAttendance } = await validateUtils.validateSchema({
        schema: attendanceSchema.params,
        data: req.params,
      });

      const deletedAttendance = await attendanceService.delete({
        idAttendance,
      });

      return res.json({
        success: true,
        message: "Asistencia eliminada correctamente",
        attendance: deletedAttendance,
      });
    } catch (error) {
      next(error);
    }
  },
};

export { attendanceController };
