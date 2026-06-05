import { userService } from "./user.service.js";
import { userSchema } from "./user.schema.js";
import { authUtils } from "../../utils/auth.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";

const userController = {
  create: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: userSchema.create,
        data: req.body,
      });

      const passwordHash = await authUtils.generatePasswordHash(
        validate.password,
      );

      const queryResult = await userService.createUser({
        ...validate,
        passwordHash,
      });

      return res.json({
        success: true,
        message: "Usuario creado correctamente",
        user: queryResult,
      });
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: userSchema.params,
        data: req.query,
      });

      console.log(validate);

      const [users, total] = await userService.getUsers(validate);

      return res.json({
        success: true,
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
      const { id: userId } = await validateUtils.validateSchema({
        schema: userSchema.params,
        data: req.params,
      });

      const data = await validateUtils.validateSchema({
        schema: userSchema.update,
        data: req.body,
      });

      if (data.password) {
        data.passwordHash = await authUtils.generatePasswordHash(data.password);

        delete data.password;
        delete data.repassword;
      }

      const updatedUser = await userService.updateUser(userId, data);

      return res.json({
        success: true,
        message: "Datos actualizados correctamente",
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = await validateUtils.validateSchema({
        schema: userSchema.params,
        data: req.params,
      });
      const user = await userService.getUserById(id);

      return res.json({
        success: true,
        message: "Usuario encontrado",
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = await validateUtils.validateSchema({
        schema: userSchema.params,
        data: req.params,
      });
      const deletedUser = await userService.deleteUser(id);

      return res.json({
        success: true,
        message: "Usuario eliminado correctamente",
        user: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  },
};

export { userController };
