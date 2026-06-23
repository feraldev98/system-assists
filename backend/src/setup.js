import { prisma } from "./config/prisma.js";
import { userService } from "./modules/user/user.service.js";
import { authUtils } from "./utils/auth.utils.js";

const setup = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@system.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminFirstname = process.env.ADMIN_NAME || "Admin";
    const adminLastname = process.env.ADMIN_LASTNAME || "System";

    const adminExists = await prisma.user.findUnique({
      where: {
        email: adminEmail,
      },
    });

    if (adminExists) {
      throw new Error("El usuario administrador ya existe");
    }

    const passwordHash = await authUtils.generatePasswordHash({
      password: adminPassword,
    });

    const queryResult = await userService.create({
      firstname: adminFirstname,
      lastname: adminLastname,
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
    });

    console.log("Usuario administrador creado:", queryResult.user);
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
  }
};

setup();
