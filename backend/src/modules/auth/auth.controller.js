import { AppError } from "../../utils/AppError.js";
import { authService } from "./auth.service.js";
import { loginSchema } from "./auth.schema.js";
import { authUtils } from "../../utils/auth.utils.js";
import { validateSchema } from "../../utils/validate.utils.js";

const authController = {
  login: async (req, res, next) => {
    try {
      const validate = await validateSchema(loginSchema, req.body);

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

      const token = await authUtils.generateToken(credentials);
      res.cookie("token", token, authUtils.COOKIE_OPTIONS);

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
      res.clearCookie("token", authUtils.COOKIE_OPTIONS);

      return res.json({
        success: true,
        message: "Sesión cerrada correctamente",
      });
    } catch (error) {
      next(error);
    }
  },
};

export { authController };
