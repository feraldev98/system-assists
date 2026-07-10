const classroomAuxiliarFields = {
  create: {
    idClassroomAuxiliar: true,
    idClassroom: true,
    classroom: {
      select: {
        year: true,
        section: {
          select: {
            grade: {
              select: {
                level: true,
              },
            },
            name: true,
          },
        },
      },
    },
    auxiliar: {
      select: {
        idUser: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
      },
    },
  },
  update: [],
  select: {},
  sort: [],
  search: [],
  status: ["ACTIVO", "INACTIVO"],
};

export { classroomAuxiliarFields };
