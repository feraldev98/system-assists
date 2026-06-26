import { AppError } from "../../utils/AppError.js";
import { authService } from "./auth.service.js";
import { authUtils } from "../../utils/auth.utils.js";
import { validateUtils } from "../../utils/validate.utils.js";
import { authSchema } from "./auth.schema.js";
import { authFields } from "./auth.fields.js";
import { userService } from "../user/user.service.js";

const authController = {
  login: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: authSchema.login,
        data: req.body,
      });

      const credentials = await authService.getCredentials({
        email: validate.email,
      });
      if (!credentials)
        throw new AppError("Usuario y/o contraseña incorrectos", 400, {
          message: "Usuario y/o contraseña incorrectos",
        });

      await authUtils.comparePassword(
        validate.email,
        validate.password,
        credentials.passwordHash,
      );

      const token = await authUtils.generateToken({ credentials });
      res.cookie("token", token, authFields.COOKIE_OPTIONS);

      return res.json({
        success: true,
        message: `Bienvenido ${credentials.firstname} ${credentials.lastname}`,
        user: {
          email: credentials.email,
          firstname: credentials.firstname,
          lastname: credentials.lastname,
          role: credentials.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      if (!req.cookies.token)
        throw new AppError("Sin autorización", 401, {
          message: "Sin autorización",
        });
      res.clearCookie("token", authFields.COOKIE_OPTIONS);

      return res.json({
        success: true,
        message: "Sesión cerrada correctamente",
      });
    } catch (error) {
      next(error);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const validate = await validateUtils.validateSchema({
        schema: authSchema.changePassword,
        data: req.body,
      });
      const user = req.user;
      if (!user) {
        throw new AppError("Sin autorización", 401, {
          message: "Sin autorización",
        });
      }

      const userCredentials = await authService.getCredentials({
        email: user.email,
      });
      if (!userCredentials) {
        throw new AppError("Sin autorización", 401, {
          message: "Sin autorización",
        });
      }

      await authUtils.comparePasswordChange({
        oldPassword: validate.oldPassword,
        passwordHash: userCredentials.passwordHash,
        msg: "Contraseña incorrecta",
      });

      await authUtils.comparePasswordChange({
        equals: false,
        oldPassword: validate.password,
        passwordHash: userCredentials.passwordHash,
        msg: "La nueva contraseña no puede ser igual a la anterior",
      });

      const newPasswordHash = await authUtils.generatePasswordHash({
        password: validate.password,
      });

      const updatedUser = await authService.changePassword({
        idUser: userCredentials.idUser,
        passwordHash: newPasswordHash,
      });

      return res.json({
        success: true,
        message: "Contraseña actualizada correctamente",
        user: {
          ...updatedUser,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  me: async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        throw new AppError("Sin autorización", 401, {
          message: "Sin autorización",
        });
      }

      console.log(user);

      const userData = await userService.getByEmail({ email: user.email });
      if (!userData) {
        throw new AppError("Usuario no encontrado", 404, {
          message: "Usuario no encontrado",
        });
      }

      return res.json({
        success: true,
        user: userData,
      });
    } catch (error) {
      next(error);
    }
  },
};

export { authController };
