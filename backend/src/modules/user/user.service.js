import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { searchUtils } from "../../utils/search.utils.js";
import { userFields } from "./user.fields.js";

const userService = {
  create: async ({
    firstname,
    lastname,
    email,
    passwordHash,
    phone = null,
    role,
  }) => {
    const queryResult = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: { firstname, lastname, email, passwordHash, phone, role },
        select: userFields.selectFields,
      });
      return { user };
    });
    return queryResult;
  },
  get: async ({ page, limit, role, sortBy, search, sortOrder }) => {
    const where = searchUtils.buildWhere({
      search,
      searchFields: userFields.seachFields,
      filters: {
        role,
      },
    });
    const users = await prisma.user.findMany({
      where,
      select: userFields.selectFields,
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

  update: async (idUser, data) => {
    const updatedUser = await prisma.user.update({
      where: {
        idUser,
      },
      data,
      select: userFields.selectFields,
    });
    if (!updatedUser) {
      throw new AppError("Registro no encontrado", 404, [
        {
          field: "user",
          message: "No existe un registro con el ID proporcionado",
        },
      ]);
    }
    return updatedUser;
  },

  delete: async (idUser) => {
    const deletedUser = await prisma.user.delete({
      where: { idUser },
      select: userFields.selectFields,
    });
    return deletedUser;
  },

  getById: async (idUser) => {
    const user = await prisma.user.findUnique({
      where: { idUser },
      select: userFields.selectFields,
    });

    if (!user) {
      throw new AppError("Registro no encontrado", 404, [
        {
          field: "user",
          message: "No existe un registro con el ID proporcionado",
        },
      ]);
    }
    return user;
  },
};

export { userService };
