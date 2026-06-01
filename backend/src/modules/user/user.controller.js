import { AppError } from "../../utils/AppError.js";
import { generatePasswordHash } from "../../utils/auth.utils.js";
import { userSchema } from "./user.schema.js";
import { userService } from "./user.service.js";

const userController = {
  create: async (req, res, next) => {
    try {
      const validate = await userSchema.safeParseAsync(req.body);

      if (!validate.success)
        throw new AppError(
          "Error de validación",
          400,
          validate.error.issues.map((issue) => ({
            field: issue.path[0],
            message: issue.message,
          })),
        );

      const { firstname, lastname, email, password, phone, role } =
        validate.data;

      const passwordHash = await generatePasswordHash(password);

      const queryResult = await userService.createUser({
        firstname,
        lastname,
        email,
        passwordHash,
        phone,
        role,
      });

      return res.json(queryResult.user);
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const page = Math.max(Number(req.query.page) || 1, 1);

      const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

      const role = ["ADMIN", "AUXILIAR", "PARENT"].includes(req.query.role)
        ? req.query.role
        : undefined;

      const sortBy = [
        "firstname",
        "lastname",
        "email",
        "phone",
        "createdAt",
        "updatedAt",
      ].includes(req.query.sortBy)
        ? req.query.sortBy
        : "createdAt";

      const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

      const search = req.query.search?.trim();

      const [users, total] = await userService.getUsers({
        page,
        limit,
        role,
        sortBy,
        search,
        sortOrder,
      });

      return res.json({
        data: users,

        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export { userController };
