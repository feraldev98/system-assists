const authFields = {
  login: ["email", "password"],

  changePassword: ["oldPassword", "password", "repassword"],

  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 8, // 8 horas
  },

  getCredentialsSelectFields: {
    idUser: true,
    firstname: true,
    lastname: true,
    email: true,
    passwordHash: true,
    role: true,
  },

  changePasswordSelectFields: {
    firstname: true,
    lastname: true,
    email: true,
    role: true,
  },
};

export { authFields };
