import {
  HiClock,
} from "react-icons/hi2";

import { FaUserCheck, FaUsers, FaUserTimes } from "react-icons/fa";

// Configuración visual de las estadísticas de asistencia.
export const statusBadge = {
  total: {
    label: "Total",
    className: "bg-blue-100 text-blue-700",
    icon: FaUsers,
  },

  present: {
    label: "Presente",
    className: "bg-green-100 text-green-700",
    icon: FaUserCheck,
  },

  late: {
    label: "Tardanza",
    className: "bg-yellow-100 text-yellow-700",
    icon: HiClock,
  },

  absent: {
    label: "Falta",
    className: "bg-red-100 text-red-700",
    icon: FaUserTimes,
  },
};