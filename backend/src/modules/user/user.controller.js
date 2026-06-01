import { AppError } from "../../utils/AppError.js";
import { generatePasswordHash } from "../../utils/auth.utils.js";
import { userSchema } from "./user.schema.js";
import { userService } from "./user.service.js";


const userController = {
    create: async (req, res, next) => {
    try {
      const { firstname, lastname, email, password, repassword, role } = req.body;
      const validate = await userSchema.safeParseAsync({
        firstname,
        lastname,
        email,
        password,
        repassword,
        role
      });

      if(!validate.success) throw new AppError(
        "Error de validación",
        400,
        validate.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message
        }))
      )

      const passwordHash = await generatePasswordHash(password)

      const queryResult = await userService.createUser({ firstname, lastname, email, passwordHash, role })

      return res.json(queryResult.user)
    } catch (error) {
      next(error)
    }
  }
}

export { userController }