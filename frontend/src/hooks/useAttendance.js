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
      // Se hace antes para tener el dato original disponible
      // tanto para mostrar la card como para el rollback.
      const found = students.find((s) => s.code === qrCode);

      // ─── 2. Actualización optimista en UI ─────────────────────
      // Se refleja el cambio de inmediato en la tabla
      // sin esperar respuesta del servidor.
      setStudents((prev) =>
        prev.map((s) =>
          s.code === qrCode ? { ...s, status: newStatus, time, date } : s
        )
      );

      // ─── 3. Mostrar card de inmediato ──────────────────────────
      setLastScanned(
        found
          ? { ...found, status: newStatus, time }
          : { code: qrCode, student: "Estudiante no encontrado", status: "absent", time }
      );

      // ─── 4. Registrar en el servidor ──────────────────────────
      // Si apiFetch devuelve null hubo un error (ya lo loguea internamente).
      const result = await apiFetch("/api/attendance", "POST", {
        code: qrCode,
        status: newStatus,
        time,
        date,
      });

      if (!result) {
        // ─── 5. Rollback si la API falló ────────────────────────
        // Se revierte la tabla al estado anterior del estudiante.
        setStudents((prev) =>
          prev.map((s) =>
            s.code === qrCode
              ? { ...s, status: found?.status ?? "absent", time: found?.time ?? null }
              : s
          )
        );

        // Se marca la card con error para que el componente
        setLastScanned((prev) => (prev ? { ...prev, apiError: true } : prev));
        return;
      }

      // ─── 6. Sincronizar con datos oficiales del servidor ──────
      // Si el backend devuelve el estudiante actualizado,
      // se reemplaza el dato optimista con el dato real.
      if (result.student) {
        setStudents((prev) =>
          prev.map((s) => (s.code === qrCode ? { ...s, ...result.student } : s))
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