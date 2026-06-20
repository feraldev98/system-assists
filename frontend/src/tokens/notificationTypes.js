import {
  FaUserTimes,
  FaClock,
  FaExclamationTriangle,
  FaBell,
  FaClipboardList,
  FaBullhorn
} from "react-icons/fa";

export const notificationTypes = {

  absent: {
    label: "Inasistencia",
    icon: FaUserTimes,
    iconClass: "text-red-600",
    bgClass: "bg-red-100"
  },

  late: {
    label: "Tardanza",
    icon: FaClock,
    iconClass: "text-yellow-600",
    bgClass: "bg-yellow-100"
  },

  behavior: {
    label: "Comportamiento",
    icon: FaExclamationTriangle,
    iconClass: "text-purple-600",
    bgClass: "bg-purple-100"
  },

  reminder: {
    label: "Recordatorio",
    icon: FaBell,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-100"
  },

  task: {
    label: "Tarea",
    icon: FaClipboardList,
    iconClass: "text-indigo-600",
    bgClass: "bg-indigo-100"
  },

  announcement: {
    label: "Anuncio",
    icon: FaBullhorn,
    iconClass: "text-green-600",
    bgClass: "bg-green-100"
  }

};