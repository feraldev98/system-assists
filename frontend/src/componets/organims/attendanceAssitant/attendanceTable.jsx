import { useAttendanceControl } from "../../../hooks/useAttendance";
import { useStudentSearch } from "../../../hooks/useStudentSeach";
import { statusBadge } from "../../../mocks/statusBadge";
import { Table } from "../tableReusable";
import { FiltersSearchDownload } from "./filtersSearchDownload";

function AttendanceTable() {
  //lista de la gestion de registros de asistencias
  const {
    students,
    lastScanned
  } = useAttendanceControl()

  //hook filtros y buscadores
  const {
    search,
    setSearch,
    filtered,
    grade,
    setGrade,
    section,
    setSection
  } = useStudentSearch(students)

  const headers = [
    "Estudiante",
    "Código",
    "Grado",
    "Seccion",
    "Estado",
    "Hora",
  ];

  return (
    <div className="w-full lg:flex-1 mt-8">

      {/* Buscador */}
      <FiltersSearchDownload
        search={search}
        setSearch={setSearch}
        grade={grade}
        setGrade={setGrade}
        section={section}
        setSection={setSection}
        students={students}
        filtered={filtered}
      />

      <Table
        headers={headers}
        data={filtered}
        emptyMessage="No se encontraron estudiantes"
        renderRow={(student) => {
          const badge =
            statusBadge[student.status] ?? statusBadge.absent;

          const Icon = badge.icon;
          const isJustScanned =
            lastScanned?.dni === student.dni;

          return (
            <tr
              key={student.id}
              className={`
                border-b border-gray-100
                transition-colors
                ${
                  isJustScanned
                    ? "bg-blue/5"
                    : "hover:bg-gray-50"
                }
              `}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 font-medium text-gray-800">
                  {isJustScanned && (
                    <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
                  )}

                  {student.student}
                </div>
              </td>

              <td className="px-6 py-4 text-gray-400 font-mono">
                {student.dni}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {student.grade}  
              </td>

              <td className="px-6 py-4 text-gray-600">
                {student.section}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`
                    inline-flex items-center gap-1
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${badge.className}
                  `}
                >
                  <Icon size={14} />
                  {badge.label}
                </span>
              </td>

              <td className="px-6 py-4 text-gray-400 font-mono">
                {student.time ?? "—"}
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
}

export { AttendanceTable };