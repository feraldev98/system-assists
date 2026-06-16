const userFields = {
  editableFields: [
    "firstname",
    "lastname",
    "email",
    "role",
    "phone",
    "password",
    "repassword",
  ],

  sortFields: [
    "firstname",
    "lastname",
    "email",
    "phone",
    "createdAt",
    "updatedAt",
  ],

  selectFields: {
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
