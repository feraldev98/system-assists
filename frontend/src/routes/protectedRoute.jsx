import { Navigate } from "react-router-dom";

export function ProtectedRoute({
  children,
  allowedRoles,
  userRole,
  isAuthenticated,
}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // El ADMIN puede acceder a cualquier ruta protegida
  if (userRole === "ADMIN") {
    return children;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}