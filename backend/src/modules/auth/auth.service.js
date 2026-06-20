import { prisma } from "../../config/prisma.js";
import { authFields } from "./auth.fields.js";

const authService = {
  getCredentials: async ({ email }) => {
    const queryResult = await prisma.user.findUnique({
      where: { email },
      select: authFields.getCredentialsSelectFields,
    });
    return queryResult;
  },

  changePassword: async ({ idUser, passwordHash }) => {
    const queryResult = await prisma.user.update({
      where: { idUser },
      data: { passwordHash },
      select: authFields.changePasswordSelectFields,
    });
    return queryResult;
  },
};

export { authService };
