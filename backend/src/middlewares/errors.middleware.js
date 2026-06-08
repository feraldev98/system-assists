function errorsMiddleware(err, req, res, _next) {
  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  // Prisma unique
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "Valor duplicado",
      errors: [
        {
          field: err.meta?.target?.[0],
          message: "Ya existe un registro con este valor",
        },
      ],
    });
  }

  // Prisma foreign key
  if (err.code === "P2003") {
    return res.status(409).json({
      success: false,
      message: "No se puede eliminar el registro",
      errors: [
        {
          field: err.meta.modelName ? `id${err.meta.modelName}` : "id",
          message: "No existe un registro con el ID proporcionado",
        },
      ],
    });
  }

  // Prisma not delete related
  if (
    err.name === "PrismaClientUnknownRequestError" &&
    err.message.includes("violates RESTRICT setting")
  ) {
    return res.status(409).json({
      success: false,
      message: "No se puede eliminar el registro",
      errors: [
        {
          field: "id",
          message:
            "Existen registros relacionados que dependen de este registro",
        },
      ],
    });
  }

  // Prisma not found
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Registro no encontrado",
      errors: [
        {
          field: err.meta.modelName ? `id${err.meta.modelName}` : "id",
          message: "No existe un registro con el ID proporcionado",
        },
      ],
    });
  }

  // JWT invalid
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Token inválido",
    });
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expirado",
    });
  }

  // Operational
  if (err.isOperational) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
      errors: err.errors || null,
    });
  }

  // Unknown
  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
}

export { errorsMiddleware };
