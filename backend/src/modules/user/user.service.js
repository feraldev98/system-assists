import { prisma } from "../../config/prisma.js";

const userService = {
  createUser: async ({ firstname, lastname, email, passwordHash, role }) => {
    const USER_SELECT = {
      idUser: true,
      firstname: true,
      lastname: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    };
    const queryResult = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: { firstname, lastname, email, passwordHash, role },
        select: USER_SELECT,
      });
      return { user };
    });
    return queryResult;
  },
};

export { userService };
