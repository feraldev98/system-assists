const parentFields = {
  create: {
    idStudentParent: true,
    relationship: true,
    parent: {
      select: {
        idUser: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
      },
    },
    student: {
      select: {
        idStudent: true,
        firstname: true,
        lastname: true,
        phone: true,
        email: true,
        dni: true,
        status: true,
      },
    },
  },
  update: ["idStudent", "idParent", "relationship"],
  select: {
    idStudentParent: true,
    relationship: true,
    parent: {
      select: {
        idUser: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
      },
    },
    student: {
      select: {
        idStudent: true,
        firstname: true,
        lastname: true,
        phone: true,
        email: true,
        dni: true,
        status: true,
      },
    },
  },
  sort: ["idStudentParent", "student", "relationship", "parent"],
  search: [
    "student",
    "relationship",
    "parent",
    "idStudentParent",
    "idParent",
    "idStudent",
  ],
  relationship: [
    "PADRE",
    "MADRE",
    "ABUELO",
    "ABUELA",
    "TÍO",
    "TÍA",
    "APODERADO",
    "OTRO",
  ],
};

export { parentFields };
