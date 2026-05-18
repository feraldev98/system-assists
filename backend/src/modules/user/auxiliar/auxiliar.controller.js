import { hash as bcryptHash } from "bcrypt";
import { AppError } from "../../../utils/AppError.js";
import { userSchema } from "../user.schema.js";
import { userService } from "../user.service.js";

const auxiliarController = {
  createAuxiliar: async (req, res, next) => {
    try {
      const { firstname, lastname, email, password, repassword } = req.body;
      const validationResult = await userSchema.safeParseAsync({
        firstname,
        lastname,
        email,
        password,
        repassword,
        role: 'AUXILIAR'
      });

      if(!validationResult.success) throw new AppError(
        "Error de validación",
        400,
        validationResult.error.issues
      )

      const passwordHash = await bcryptHash(password, 10)

      const queryResult = await userService.createUser({ firstname, lastname, email, passwordHash })

      return res.json(queryResult)
    } catch (error) {
      next(error)
    }
  }
}

export { auxiliarController }