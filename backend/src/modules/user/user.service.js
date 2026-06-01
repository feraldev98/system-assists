import { prisma } from "../../config/prisma.js";

const userService = {
  createUser: async ({
    firstname,
    lastname,
    email,
    passwordHash,
    phone = null,
    role,
  }) => {
    const USER_SELECT = {
      idUser: true,
      firstname: true,
      lastname: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    };
    const queryResult = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: { firstname, lastname, email, passwordHash, phone, role },
        select: USER_SELECT,
      });
      return { user };
    });
    return queryResult;
  },
  getUsers: async ({ page, limit, role, sortBy, search, sortOrder }) => {
    const where = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        {
          firstname: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lastname: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const users = await prisma.user.findMany({
      where,

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

      skip: (page - 1) * limit,

      take: limit,

      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.user.count({
      where,
    });
    return [users, total];
  },
};

export { userService };
