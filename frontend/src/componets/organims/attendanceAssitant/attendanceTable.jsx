import { useState } from "react";
import { FaEdit } from "react-icons/fa";

import { Table } from "../tableReusable";
import { FiltersSearchDownload } from "./filtersSerchDowldAttendance";
import { ModalActionsAttendance } from "../../modals/assistant/modalActionsAttendace";

import { statusBadge } from "../../../mocks/statusBadge";

import { useModal } from "../../../hooks/hookModal/useModal";
import { useStudentSearch } from "../../../hooks/hooksAssistant/useStudentSeach";
import { useRowToggle } from "../../../hooks/hooksAssistant/useRowToggle";

function AttendanceTable({
  students,
  lastScanned,
  updateStudentStatus,
}) {

  const [selectedStudent, setSelectedStudent] = useState(null);

  // filtros
  const {
    search,
    setSearch,
    filtered,
    grade,
    setGrade,
    section,
    setSection,
  } = useStudentSearch(students);

  // modal
  const {
    isOpen,
    openModal,
    closeModal,
  } = useModal();

  // fila activa
  const {
    openRowId,
    openRow,
    closeRow,
  } = useRowToggle();

  // abrir modal
  const handleEdit = (student) => {
    setSelectedStudent(student);
    // activar fila
    openRow(student.id);
    // abrir modal
    openModal();
  };

  const headers = [
    "Estudiante",
    "DNI",
    "Grado",
    "Sección",
    "Estado",
    "Hora",
    "Acciones",
  ];

  return (
    <div className="w-full lg:flex-1 mt-8">

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
            statusBadge[student.attendance.status]
            ?? statusBadge.absent;
          const Icon = badge.icon;
          const isJustScanned =
            lastScanned?.dni === student.dni;
          // fila activa
          const isActive =
            openRowId === student.id;

          return (
            <tr
              key={student.id}
              className={`
                border-b border-gray-100
                transition-colors
                ${isActive
                  ? "bg-blue-100"
                  : "hover:bg-gray-50"
                }
              `}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 font-medium">
                  {
                    isJustScanned && (
                      <span
                        className="
                        w-2 h-2 rounded-full
                        bg-blue animate-pulse
                      "
                      />
                    )
                  }
                  {student.student}
                </div>
              </td>

              <td className="px-6 py-4">
                {student.dni}
              </td>

              <td className="px-6 py-4">
                {student.grade}
              </td>

              <td className="px-6 py-4">
                {student.section}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`
                    inline-flex items-center gap-1
                    px-3 py-1 rounded-full text-xs
                    ${badge.className}
                  `}
                >
                  <Icon size={14} />
                  {badge.label}
                </span>
              </td>
              <td className="px-6 py-4">
                {student.attendance.time ?? "—"}
              </td>
              <td className="px-6 py-4 relative">
                <button
                  onClick={() => handleEdit(student)}
                  className="
                    text-blue-700
                    hover:underline
                  "
                >
                  <FaEdit size={20} />
                </button>
                {openRowId === student.id && (
                  <ModalActionsAttendance
                    closeModal={closeRow}
                    student={student}
                    updateStudentStatus={updateStudentStatus}
                  />
                )}
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
}

export { AttendanceTable };