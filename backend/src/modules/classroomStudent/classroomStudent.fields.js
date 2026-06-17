const classroomStudentFields = {
  create: {
    idClassroomStudent: true,
    classroom: {
      select: {
        idClassroom: true,
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
    student: {
      select: {
        idStudent: true,
        firstname: true,
        lastname: true,
        code: true,
        gender: true,
        phone: true,
        email: true,
        status: true,
      },
    },
  },
  edit: ["idClassroom", "idStudent"],
  select: {
    idClassroomStudent: true,
    classroom: {
      select: {
        idClassroom: true,
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
    student: {
      select: {
        idStudent: true,
        firstname: true,
        lastname: true,
        code: true,
        gender: true,
        phone: true,
        email: true,
        status: true,
      },
    },
  },
  sort: ["idClassroomStudent", "idClassroom", "idStudent"],
  search: ["idClassroomStudent", "idClassroom", "idStudent"],
  update: ["idClassroom", "idStudent"],
};

export { classroomStudentFields };
