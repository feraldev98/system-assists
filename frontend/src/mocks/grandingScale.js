import {FaMedal, FaRegMeh, FaThumbsUp, FaUserCheck, FaUsers } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";


export const grandingScale = [
  {
    title: "Excelente",
    value: "AD",
    icon: FaMedal ,
    description:
      "Mantiene una conducta ejemplar.",
  },

  {
    title: "Bueno",
    value: "A",
    icon: FaThumbsUp ,
    description:
      "Buen comportamiento y respeto constante.", 
  },

  {
    title: "Regular",
    value: "B",
    icon: FaRegMeh ,
    description:
      "Cumple parcialmente las normas.",
  },

  {
    title: "Malo",
    value: "C",
    icon: FaTriangleExclamation ,
    description:
      "Conductas inadecuadas con frecuencia.",
  }
]

