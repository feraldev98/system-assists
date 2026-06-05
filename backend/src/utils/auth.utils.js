import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "./AppError.js";

const authUtils = {
  generatePasswordHash: async (password) => {
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    return passwordHash;
  },
  generateToken: async (credentials) => {
    const payload = {
      sub: credentials.idUser,
      role: credentials.role,
    };

    const jwtSecret = process.env.JWT_SECRET || "secret";
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: "8h" });
    return token;
  },
  comparePassword: async (email, password, passwordHash) => {
    const isPasswordCorrect = await bcrypt.compare(password, passwordHash);
    if (!isPasswordCorrect)
      throw new AppError("Usuario y/o contraseña incorrectos", 400, {
        message: "Usuario y/o contraseña incorrectos",
      });
  },
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 8, // 8 horas
  },
};

export { authUtils };
