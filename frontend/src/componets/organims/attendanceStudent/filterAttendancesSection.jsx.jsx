import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { IoTime } from "react-icons/io5";
import { FilterAttendances } from "../../molecules/attendanceStudent/filtersAttendances";
import { useMemo, useState } from "react";
import { Table } from "../tableReusable";

function FiltersAttendancesSection({
  currentStudent,
}) {

  // FILTROS
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [periodFilter, setPeriodFilter] = useState("");

  // FILTRAR ASISTENCIAS
  const filteredAttendances = useMemo(() => {
    if (!currentStudent) return [];

    let data = [...currentStudent.attendances];

    // FILTRO ESTADO
    if (statusFilter !== "Todos") {
      data = data.filter(
        (item) =>
          item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // FILTRO PERIODO
    if (periodFilter === "semanal") {
      data = data.slice(0, 7);
    }

    if (periodFilter === "bimestral") {
      data = data.slice(0, 60);
    }

    if (periodFilter === "anual") {
      data = data.slice(0, 365);
    }

    return data;
  }, [currentStudent, statusFilter, periodFilter]);

  return (
    <section
      className="
        w-full
        px-6
        md:max-w-7xl
        md:mx-auto
        py-8
        space-y-8
      "
    >

      {/* FILTROS */}
      <FilterAttendances
        statusFilter={statusFilter}
        currentStudent={currentStudent}
        setStatusFilter={setStatusFilter}
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
      />
      {/* TABLA */}
      <Table
        headers={[
          "Fecha",
          "Estado",
          "Hora llegada",
        ]}

        data={filteredAttendances}
        emptyMessage="No hay asistencias disponibles"
        renderRow={(attendance) => (
          <tr
            key={attendance.id}
            className="border-b border-borderC/20 hover:bg-gray-50 transition"
          >
            {/* FECHA */}
            <td className="px-6 py-5">
              <div className="flex items-center gap-3 text-blueT text-[.8em] md:text-[1em]">
                <FaCalendarAlt
                  size={16}
                  className="text-slate-400"
                />
                <span>{attendance.date}</span>
              </div>
            </td>

            {/* ESTADO */}
            <td className="px-6 py-3">
              {attendance.status === "Presente" && (
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                  <FaCheckCircle size={14} />
                  Presente
                </span>
              )}
              {attendance.status === "Ausente" && (
                <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm">
                  <FaTimesCircle size={14} />
                  Ausente
                </span>
              )}
              {attendance.status === "Tardanza" && (
                <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold text-sm">
                  <IoTime size={14} />
                  Tardanza
                </span>
              )}
            </td>
            {/* HORA */}
            <td className="px-6 py-5">
              <div className="flex items-center gap-3 text-[#1f2a44]">
                <FaClock
                  size={16}
                  className="text-slate-400"
                />
                <span>{attendance.time}</span>
              </div>
            </td>
          </tr>
        )}
      />
    </section>
  );
}

export { FiltersAttendancesSection };