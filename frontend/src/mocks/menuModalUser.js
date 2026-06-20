import { IoSettings, IoLogOutOutline  } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export const menuUserItems = [
  {
    text: "Cambiar Contraseña",
    icon: IoSettings,
    action: "password",
  },
  {
    text: "Perfil",
    icon: FaUser,
    href: "/profile",
  },
  {
    text: "Cerrar Sesión",
    icon: IoLogOutOutline,
    action: "logout",
  },
];