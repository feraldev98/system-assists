import { FiX } from "react-icons/fi"
import { useClickOutside } from "../../../hooks/hookModal/useClickOutside"
import { Title } from "../../atoms/title"
import { TitleAndDescaription } from "../../molecules/titleandDescription"
import { useState } from "react"
import { useLoading } from "../../../hooks/hookGlobals/useLoading"

function ModalRegisterUser ({closeModal}) {
  const [firstname, setFirtsname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPasssword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')

  const [error, setError] = useState('')
  const {loading, startLoading, stopLoading} =  useLoading()



  //evitar cerrar el formulario al hacer click afuer
  const {modalRef } = useClickOutside(closeModal)



  return(
    <div
      className="fixed inset-0 flex justify-center items-center 
      bg-black/50 z-100 transition-opacity duration-300"
    >
      <form
        ref={modalRef}
        className="
          lex flex-col gap-4 
          w-[25em] md:w-[50em] max-w-2xl bg-white 
          rounded-md shadow-xl p-6
        "
      >
        <div className=" relative">
          <TitleAndDescaription
          title= 'REGISTRAR USUARIO'
          description='Ingresa los datos correctamente'        
          level='h3'
          size='small'
        />
        <FiX
          size={23} 
          className="absolute top-0 right-0"
          onClick={closeModal}
          />
        </div>
      </form>
    </div>
  )
}

export {ModalRegisterUser}