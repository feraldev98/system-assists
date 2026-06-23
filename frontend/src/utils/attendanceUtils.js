// Utilidades para el control de asistencia.
// Configuración del horario de ingreso
const CLASS_START = {
  hour: 7,
  minute: 30,
};
// Minutos de tolerancia permitidos
const LATE_TOLERANCE = 10;


// Determina si un estudiante llega a tiempo o con tardanza
export function calcStatus(now = new Date()) {

  const limit = new Date();

  limit.setHours(
    CLASS_START.hour,
    CLASS_START.minute + LATE_TOLERANCE,
    0,
    0
  );

  return now <= limit
    ? "present"
    : "late";
}


// Convierte una fecha en una hora legible
export function formatTime(date) {
  return date.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}