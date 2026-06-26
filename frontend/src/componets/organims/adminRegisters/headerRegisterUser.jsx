import { FaUserPlus } from "react-icons/fa6"
import { Button } from "../../atoms/button"
import { TitleAndDescaription } from "../../molecules/titleandDescription"
import { useModal } from "../../../hooks/hookModal/useModal"
import { ModalRegisterUser } from "../../modals/adminRegisters/modalReegisterUsers"

function HeaderRegisterUser  () {
  // hook de modal
  const modalOpenRegisterUser = useModal()
  //abrir el modal de registrar usuario
  const handleOpenRegisterUser = () => {
    modalOpenRegisterUser.openModal()
  }


  return(
    <section className="mt-6 flex items-center justify-between
      w-[96%] md:w-[90%] md:max-w-6xl mx-auto relative"
    >
      <TitleAndDescaription
        title= 'Registrar Usuarios'
        description= 'Gestiona los usuarios del sistema'
        level='h2'
        weight='bold'  
      />
      <Button
        onClick={handleOpenRegisterUser}
        variant="primary"
        className="flex items-center gap-2"
      >
        <FaUserPlus className="size-5"/>
        Nuevo Usuario
      </Button>
      {
        modalOpenRegisterUser.isOpen && (
          <ModalRegisterUser
            closeModal={modalOpenRegisterUser.closeModal}
          />
        )
      }
    </section>
  )
}

export {HeaderRegisterUser}