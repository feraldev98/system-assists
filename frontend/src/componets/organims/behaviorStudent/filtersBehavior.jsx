import { useMemo, useState } from "react";
import { Button } from "../../atoms/button";
import { Table } from "../tableReusable";
import { matchesDateFilter } from "../../../utils/dateFIlters";

// Opciones disponibles
const DATE_FILTERS = [
  "Esta Semana",
  "Este Bimestre",
  "Todo el Año",
];

function FilterBehavior({ currentStudent }) {

  // Filtro de fecha
  const [dateFilter, setDateFilter] =
    useState("Todo el Año");

  // Filtro por calificación
  const [statusFilter, setStatusFilter] =
    useState("Todos");

  // Historial filtrado
  const filteredBehaviors = useMemo(() => {

    // Si no existe estudiante seleccionado
    if (!currentStudent) return [];

    let data = [...currentStudent.behaviors];

    // Filtrar por calificación
    if (statusFilter !== "Todos") {

      data = data.filter(
        (item) =>
          item.grade.toLowerCase() ===
          statusFilter.toLowerCase()
      );

    }

    // Filtrar por fecha
    data = data.filter((item) =>
      matchesDateFilter(
        item.date,
        dateFilter
      )
    );

    return data;

  }, [
    currentStudent,
    dateFilter,
    statusFilter
  ]);

  return (
    <section
      className="
        w-[96%]
        md:px-0
        md:max-w-7xl
        mx-auto
        mt-8
        flex
        flex-col
        gap-5
      "
    >

      {/* BOTONES DE FECHA */}
      <div
        className="
          flex
          gap-3
          md:gap-6
          justify-between
          md:justify-start
          w-full
          md:w-sm
          rounded-md
          px-3
        "
      >
        {DATE_FILTERS.map((filter) => (

          <Button
            key={filter}
            text={filter}
            variant={
              dateFilter === filter
                ? "base"
                : "ternary"
            }
            onClick={() =>
              setDateFilter(filter)
            }
          />

        ))}
      </div>

      {/* TABLA */}
      <Table
        headers={[
          "Fecha",
          "Calificación",
          "Observaciones",
          "Auxiliar"
        ]}
        data={filteredBehaviors}
        emptyMessage="No hay historial de comportamiento para este período"
        renderRow={(item, index) => (

          <tr
            key={item.id ?? index}
            className="
              border-b
              border-borderC/20
              last:border-0
              hover:bg-gray-50
              transition-colors
            "
          >

            {/* Fecha */}
            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
              {item.date}
            </td>

            {/* Calificación */}
            <td className="px-6 py-4">
              <span
                className={`
                  inline-block
                  px-2
                  py-1
                  rounded
                  text-xs
                  font-bold

                  ${item.grade === "AD"
                    ? "bg-green-100 text-green-700"
                    : ""
                  }

                  ${item.grade === "A"
                    ? "bg-blue-100 text-blue-700"
                    : ""
                  }

                  ${item.grade === "B"
                    ? "bg-yellow-100 text-yellow-700"
                    : ""
                  }

                  ${item.grade === "C"
                    ? "bg-red-100 text-red-700"
                    : ""
                  }
                `}
              >
                {item.grade}
              </span>
            </td>

            {/* Observación */}
            <td className="px-6 py-4 text-sm text-gray-700">
              {item.note}
            </td>

            {/* Auxiliar */}
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {item.auxiliar}
            </td>

          </tr>

        )}
      />

    </section>
  );
}

export { FilterBehavior };