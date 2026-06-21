import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { searchUtils } from "../../utils/search.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { studentService } from "../student/student.service.js";
import { attendanceFields } from "./attendance.fields.js";

const attendanceService = {
  create: async ({ status, note, idStudent }, idAuxiliar) => {
    const student = await studentService.getById({ idStudent });
    if (
      [
        "SUSPENDIDO",
        "EXPULSADO",
        "TRANSFERIDO",
        "RETIRADO",
        "INACTIVO",
      ].includes(student.status)
    ) {
      throw new AppError(
        "El estudiante no tiene un estado válido para registrar asistencia",
        400,
        [
          {
            field: "idStudent",
            message: `El estudiante tiene un estado ${student.status} que no permite registrar asistencia`,
          },
        ],
      );
    }
    const queryResult = await prisma.$transaction(async (prisma) => {
      const attendance = await prisma.attendance.create({
        data: {
          date: new Date(),
          status,
          note,
          idStudent,
          idAuxiliar,
        },
        select: attendanceFields.create,
      });
      return { attendance };
    });

    return queryResult.attendance;
  },

  get: async ({ page, limit, sortOrder, sortBy, search, date }) => {
    const where = searchUtils.buildSearchWhere({
      search,
      numberFields: ["idAttendance", "idStudent", "idAuxiliar"],
      stringFields: ["note"],
      relationStringFields: [
        { relation: "student", field: "firstname" },
        { relation: "student", field: "lastname" },
        { relation: "student", field: "dni" },
        { relation: "auxiliar", field: "firstname" },
        { relation: "auxiliar", field: "lastname" },
      ],
      filters: {
        date,
      },
    });

    const [attendances, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        orderBy: validateUtils.buildOrderBy(sortBy, sortOrder),
        skip: (page - 1) * limit,
        take: limit,
        select: attendanceFields.select,
      }),
      prisma.attendance.count({ where }),
    ]);

    return { attendances, total };
  },

  getById: async ({ idAttendance }) => {
    const attendance = await prisma.attendance.findUnique({
      where: { idAttendance },
      select: attendanceFields.select,
    });

    if (!attendance) {
      throw new AppError("Asistencia no encontrada", 404, [
        {
          field: "idAttendance",
          message: "No existe un registro con el ID proporcionado",
        },
      ]);
    }

    return attendance;
  },

  update: async ({ idAttendance, data }) => {
    const queryResult = await prisma.$transaction(async (prisma) => {
      const attendance = await prisma.attendance.update({
        where: { idAttendance },
        data,
        select: attendanceFields.select,
      });

      if (!attendance) {
        throw new AppError("Asistencia no encontrada", 404, [
          {
            field: "idAttendance",
            message: "No existe un registro con el ID proporcionado",
          },
        ]);
      }

      return { attendance };
    });

    return queryResult.attendance;
  },

  delete: async ({ idAttendance }) => {
    const deletedAttendance = await prisma.attendance.delete({
      where: { idAttendance },
      select: attendanceFields.select,
    });

    return deletedAttendance;
  },
};

export { attendanceService };

/*


enum StatusAssistance {
  PRESENTE
  TARDANZA
  JUSTIFICADA
}

model Attendance {
  idAttendance Int              @id @default(autoincrement())
  date         DateTime
  status       StatusAssistance @default(PRESENTE)
  note         String?          @db.VarChar(100)
  idStudent    Int
  idAuxiliar   Int

  student  Student @relation(fields: [idStudent], references: [idStudent])
  auxiliar User    @relation(fields: [idAuxiliar], references: [idUser])

  @@index([idStudent])
  @@index([idAuxiliar])
  @@index([date])
  @@index([idStudent, date])
}

*/
