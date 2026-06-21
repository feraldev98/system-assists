const userFields = {
  create: [
    "firstname",
    "lastname",
    "email",
    "password",
    "repassword",
    "role",
    "phone",
  ],
  update: [
    "firstname",
    "lastname",
    "email",
    "role",
    "phone",
    "password",
    "repassword",
  ],

  sort: ["firstname", "lastname", "email", "phone", "createdAt", "updatedAt"],

  select: {
    idUser: true,
    firstname: true,
    lastname: true,
    email: true,
    phone: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  },

  search: ["firstname", "lastname", "email", "phone"],
};

export { userFields };
