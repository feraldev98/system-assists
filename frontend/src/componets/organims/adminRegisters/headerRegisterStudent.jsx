import { FaUserPlus } from "react-icons/fa6";
import { TitleAndDescaription } from "../../molecules/titleandDescription";
import { useModal } from "../../../hooks/hookModal/useModal";
import { Button } from "../../atoms/button";


// modales
import { ModalOptionsRegister } from "../../modals/adminRegisters/modalOptionsRegister";
import { ModalRegisterStudents } from "../../modals/adminRegisters/modalRegisterStudents";

function HeaderRegisterStudent() {

  const modalOptionsRegister = useModal();
  const modalRegisterStudents = useModal();

  //Abrir el modal de opciones de registro
  const handleOpenOptions = () => {
    modalOptionsRegister.openModal();
  };

  //Abril modal de registro manual
  const handleOpenRegisterStudent = () => {
    modalOptionsRegister.closeModal();
    modalRegisterStudents.openModal();
  };

  return (
    <section className="mt-6 flex items-center justify-between
      w-[96%] md:w-[90%] md:max-w-6xl mx-auto relative"
    >
      <TitleAndDescaription
        title="Registro de Estudiantes"
        level="h2"
        weight="bold"
        description="Gestiona los estudiantes de la institución"
      />

      <Button
        onClick={handleOpenOptions}
        variant="primary"
        className="flex items-center gap-2  "
      >
        <FaUserPlus className="size-5" />
        Nuevo Estudiante
      </Button>

          {modalOptionsRegister.isOpen && (
              <ModalOptionsRegister
                closeModal={modalOptionsRegister.closeModal}
                onRegisterStudent={handleOpenRegisterStudent}
              />
          )}

          {modalRegisterStudents.isOpen && (
              <ModalRegisterStudents
                closeModal={modalRegisterStudents.closeModal}
              />
          )}

    </section>
  );
}

export { HeaderRegisterStudent };