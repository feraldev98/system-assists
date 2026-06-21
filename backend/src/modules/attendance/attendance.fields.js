const attendanceFields = {
  createFields: ["date", "status", "idStudent", "note"],
  create: {
    idAttendance: true,
    date: true,
    status: true,
    note: true,
    student: {
      select: {
        idStudent: true,
        firstname: true,
        lastname: true,
        dni: true,
        gender: true,
        phone: true,
        email: true,
        status: true,
      },
    },
    auxiliar: {
      select: {
        idUser: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        role: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  },
  update: ["date", "status", "note", "idStudent", "idAuxiliar"],
  select: {
    idAttendance: true,
    date: true,
    status: true,
    note: true,
    student: {
      select: {
        idStudent: true,
        firstname: true,
        lastname: true,
        dni: true,
        gender: true,
        phone: true,
        email: true,
        status: true,
      },
    },
    auxiliar: {
      select: {
        idUser: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        role: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  },
  sort: ["idAttendance", "date", "status", "note", "idStudent", "idAuxiliar"],
  search: ["idAttendance", "date", "status", "note", "idStudent", "idAuxiliar"],
  status: ["PRESENTE", "TARDANZA", "JUSTIFICADA"],
};

export { attendanceFields };
