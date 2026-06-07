const studentFields = {
  status: [
    "ACTIVo",
    "INACTIVO",
    "SUSPENDIDO",
    "EXPULSADO",
    "TRANSFERIDO",
    "GRADUADO",
    "RETIRADO",
  ],
  update: ["firstname", "lastname", "gender", "phone", "email", "status"],
  select: {
    firstname: true,
    lastname: true,
    code: true,
    gender: true,
    phone: true,
    email: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  },
  sort: ["firstname", "lastname", "gender", "phone", "email", "status"],
  search: ["firstname", "lastname", "gender", "phone", "email", "status"],
  create: {
    firstname: true,
    lastname: true,
    code: true,
    gender: true,
    phone: true,
    email: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  },
};

export { studentFields };
