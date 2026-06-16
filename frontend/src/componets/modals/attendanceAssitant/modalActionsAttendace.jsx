import { FiX } from "react-icons/fi";
import { Title } from "../../atoms/title";
import { useClickOutside } from "../../../hooks/hookModal/useClickOutside";
import { useAttendanceControl } from "../../../hooks/hooksAssistant/useAttendance";

function ModalActionsAttendance({
  closeModal,
  student,
  updateStudentStatus
}) {

  //hook para cerrar al hacer click afuera del modal
  const modalRef = useClickOutside(closeModal);

  // Identifica al estudiante por su DNI y cambia su estado de asistencia
  const handleChangeStatus = (status) => {
    console.log(status);
    updateStudentStatus(student.dni, status);
    closeModal();
  };

  const title = 'Selecciona el estado'

  const statusActions = [
    {
      text: 'Presente',
      className: 'bg-green-100 text-green-700',
      onClick : () => handleChangeStatus("present")
    },
    {
      text: 'Tardanza',
      className: 'bg-yellow-100 text-yellow-700',
      onClick : () => handleChangeStatus("late")
    },
    {
      text: 'Falta',
      className: 'bg-red-100 text-red-700',
      onClick : () => handleChangeStatus("absent")
    },
  ]

  return (
    <div
      ref={modalRef}
      className="absolute flex flex-col gap-4 p-2 rounded-md
      bg-blue  z-10 right-2"
    >
      <div className="relative">
        <Title
          level="h4"
          weight="bold"
          variant="primary"
          text={title}

        />
        <FiX
          onClick={closeModal}
          className=" text-lg text-white absolute top-0 right-0"
        />
      </div>
      <div className="flex  items-start gap-2">
        {
          statusActions.map((stats, s) => {
            return (
              <button
                key={s}
                onClick={stats.onClick}
                className={`
                  ${stats.className}
                    px-2 py-1 cursor-pointer
                    rounded-md
                    transition-all duration-300 
                    hover:-translate-y-0.5
                  `}
              >
                {stats.text}
              </button>
            )
          })
        }
      </div>
    </div>
  );
}

export { ModalActionsAttendance }