import { statusBadge } from "../../../mocks/statusBadge";
import { Table } from "../tableReusable";
import { FiltersSearchDownload } from "./filtersSearchDownload";
import { ModalActionsAttendance } from "../../modals/attendanceAssitant/modalActionsAttendace";
import { FaEdit } from "react-icons/fa";
//HOOKS
import { useModal } from "../../../hooks/hookModal/useModal";
import { useState } from "react";
import { useRowToggle } from "../../../hooks/hooksAssistant/useRowToggle";
import { useStudentSearch } from "../../../hooks/hooksAssistant/useStudentSeach";

function AttendanceTable({
  students,
  lastScanned,
  updateStudentStatus,
}) {
  const [selectedStudent, setSelectedStudent] = useState(null);

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

  //hook modal
  const {
    isOpen,
    setIsOpen,
    openModal,
    closeModal,
    toggleModal
  } = useModal()

  //controlar interaccion por fila
  const {
    openRowId,
    toggleRow,
    closeRow,
  } = useRowToggle();

  //abrir modal y ponerla activa
  const handleEdit = (student) => {
    setSelectedStudent(student);
    openModal();
  };

  const headers = [
    "Estudiante", "Código", "Grado", "Seccion", "Estado", "Hora", "Acciones"
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
                ${isJustScanned
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
              <td className="px-6 py-4 relative">
                <button
                  onClick={() => handleEdit(student)}
                  className="text-blue-700 hover:underline text-sm"
                >
                  <FaEdit size={20}/>
                </button>
                {isOpen && selectedStudent?.id === student.id && (
                  <ModalActionsAttendance 
                    closeModal={closeModal}
                    updateStudentStatus={updateStudentStatus}
                    student={student}
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