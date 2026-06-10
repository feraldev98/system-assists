import { useCallback, useState } from "react";
import { studentsMock } from "../mocks/studentsList";
import { calcStatus, formatTime } from "../utils/attendanceUtils";
import { apiFetch } from "../helpers/apiFetch";

export function useAttendanceControl() {
  const [students, setStudents] = useState(studentsMock);
  const [lastScanned, setLastScanned] = useState(null);

  const handleScan = useCallback(
    async (qrCode) => {
      const now = new Date();
      const newStatus = calcStatus(now);
      const time = formatTime(now);
      const date = now.toISOString().split("T")[0];

      // ─── 1. Buscar estudiante antes del await ──────────────────
      // El QR encodea el DNI del estudiante, se busca
      // en la lista local para tener el dato original.
      const found = students.find((s) => s.dni === qrCode);

      // ─── 2. Actualización optimista en UI ─────────────────────
      // Se refleja el cambio de inmediato en la tabla
      // sin esperar respuesta del servidor.
      setStudents((prev) =>
        prev.map((s) =>
          s.dni === qrCode ? { ...s, status: newStatus, time, date } : s
        )
      );

      // ─── 3. Mostrar card de inmediato ──────────────────────────
      // Si no se encuentra el DNI en la lista, se muestra
      // un estudiante "no encontrado" en la card.
      setLastScanned(
        found
          ? { ...found, status: newStatus, time }
          : { dni: qrCode, student: "Estudiante no encontrado", status: "absent", time }
      );

      // ─── 4. Registrar en el servidor ──────────────────────────
      // Se envía el DNI (leído del QR) junto con el estado
      // calculado según la hora de escaneo.
      const result = await apiFetch("/api/attendance", "POST", {
        dni: qrCode,
        status: newStatus,
        time,
        date,
      });

      if (!result) {
        // ─── 5. Rollback si la API falló ────────────────────────
        // Se revierte la tabla al estado anterior del estudiante
        // para no mostrar datos incorrectos.
        setStudents((prev) =>
          prev.map((s) =>
            s.dni === qrCode
              ? { ...s, status: found?.status ?? "absent", time: found?.time ?? null }
              : s
          )
        );

        // Se marca la card con apiError para que el componente
        // pueda mostrar un aviso visual si lo desea.
        setLastScanned((prev) => (prev ? { ...prev, apiError: true } : prev));
        return;
      }

      // ─── 6. Sincronizar con datos oficiales del servidor ──────
      // Si el backend devuelve el estudiante actualizado,
      // se reemplaza el dato optimista con el dato real.
      if (result.student) {
        setStudents((prev) =>
          prev.map((s) => (s.dni === qrCode ? { ...s, ...result.student } : s))
        );
        setLastScanned({ ...result.student, time });
      }
    },
    [students]
  );

  return {
    students,
    lastScanned,
    handleScan,
  };
}