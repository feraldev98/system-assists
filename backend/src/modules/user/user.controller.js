import { generatePasswordHash } from "../../utils/auth.utils.js";
import { userService } from "./user.service.js";
import {
  userCreateSchema,
  userParamsSchema,
  userUpdateSchema,
} from "./user.schema.js";
import { idSchema, validateSchema } from "../../utils/validate.utils.js";

const userController = {
  create: async (req, res, next) => {
    try {
      const validate = await validateSchema(userCreateSchema, req.body);

      const passwordHash = await generatePasswordHash(validate.password);

      const queryResult = await userService.createUser({
        ...validate,
        passwordHash,
      });

      return res.json({
        message: "Usuario creado correctamente",
        user: queryResult,
      });
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const validate = await validateSchema(userParamsSchema, req.query);

      const [users, total] = await userService.getUsers(validate);

      return res.json({
        data: users,

        pagination: {
          page: validate.page,
          limit: validate.limit,
          total,
          totalPages: Math.ceil(total / validate.limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id: userId } = await validateSchema(idSchema, req.params);

      const data = await validateSchema(userUpdateSchema, req.body);

      if (data.password) {
        data.passwordHash = await generatePasswordHash(data.password);

        delete data.password;
        delete data.repassword;
      }

      const updatedUser = await userService.updateUser(userId, data);

      return res.json({
        message: "Datos actualizados correctamente",
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = await validateSchema(idSchema, req.params);
      const user = await userService.getUserById(id);

      return res.json({
        message: "Usuario encontrado",
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = await validateSchema(idSchema, req.params);
      const deletedUser = await userService.deleteUser(id);

      return res.json({
        message: "Usuario eliminado correctamente",
        user: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  },
};

export { userController };
