import { useAuth } from "./useAuth";

export const useGreeting = () => {

  const { userData } = useAuth();
  const role = userData?.role || "admin";

  const greetingLabel = {
    admin: "Administrador",
    assistant: "Auxiliar",
    father: "Padre de familia",
  }[role] || "Usuario";

  const hour = new Date().getHours();
  const greetingHour =
    hour < 12
      ? "Buenos días"
      : hour < 18
      ? "Buenas tardes"
      : "Buenas noches";

  return {
    greetingHour,
    greetingLabel,
    role,
    name: userData?.name
  };
};