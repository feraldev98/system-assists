import { IoAnalyticsSharp } from "react-icons/io5";
import { FaUserCheck, FaUsers, FaUserTimes } from "react-icons/fa";

export const statsAdmin = [
    { 
      label: 'Estudiantes', 
      value: '900' ,
      className: "bg-blue-100 text-blue-700",
      icon: FaUsers,
    },
    { 
      label: 'Asistieron', 
      value: '870',
      className: "bg-green-100 text-green-700",
      icon: FaUserCheck,
    },
    { 
      label: 'Faltaron', 
      value: '30',
      className: "bg-red-100 text-red-700",
      icon: FaUserTimes,
    },
    { 
      label: 'Asistencia promedio', 
      value: '94%',
      className: 'bg-yellow-100 text-yellow-700',
      icon :IoAnalyticsSharp
    },

]