import { Title } from "../../atoms/title"
import { FormItem } from "../../molecules/formItems"
import { Button } from "../../atoms/button"
import { apiFetch } from "../../../helpers/apiFetch"
//hooks
import { useToast } from "../../../hooks/hookGlobals/useToast"
import { useState } from "react"
import { useClickOutside } from "../../../hooks/hookModal/useClickOutside"
import { FiX } from "react-icons/fi"

function ModalRegisterStudents({ closeModal }) {

  const [firstname, setFirtsname] = useState('')
  const [lastname, setLastname] = useState('')
  const [dni, setDni] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')

  const [error, setError] = useState('')
  const { showToast } = useToast()

  //Cerrar modal alhacer click fuera
  const modalRef = useClickOutside(closeModal)

  //Titulo modal
  const title = 'REGISTRAR ESTUDIANTE'

  const formFields = [
    {
      text: 'Nombres',
      type: 'text',
      name: 'firstname',
      value: firstname,
      onChange: (e) => setFirtsname(e.target.value)
    },
    {
      text: 'Apellidos',
      type: 'text',
      name: 'lastname',
      value: lastname,
      onChange: (e) => setLastname(e.target.value)
    },
    [
      {
        text: 'DNI',
        type: 'number',
        name: 'dni',
        value: dni,
        onChange: (e) => setDni(e.target.value)
      },
      {
        text: 'Telefono',
        type: 'tel',
        name: 'phone',
        value: phone,
        onChange: (e) => setPhone(e.target.value)
      }
    ],
    {
      text: 'Correo Electrónico',
      type: 'email',
      name: 'email',
      value: email,
      onChange: (e) => setEmail(e.target.value)
    },
    [
      {
      text: 'Género',
      type: 'select',
      name: 'gender',
      value: gender,
      onChange: (e) => setGender(e.target.value),
      options : [
        {text : 'Masculino', value: 'M'},
        {text : 'Femenino', value: 'F'},
        {text : 'Otro', value: 'O'}
      ]
    },
    {
      text: 'Estado',
      type: 'text',
      name: 'status',
      value: status,
      onChange: (e) => setStatus(e.target.value)
    }
    ]
  ]

  //OnSubmit 
  const onSubmit = async (e) => {
    e.preventDefault()
    setError('') //limpiar errores previos

    try {
      //validadciones

      //Enviar Datos
      const data = await apiFetch('/student', 'POST', (
        firstname,
        lastname,
        dni,
        gender,
        phone,
        email,
        status
      ))

        // 3. Manejar la respuesta
      if (response) {

        showToast ('Registro Exitoso', "success")
        handleClose() 

      } else {
        throw new Error('Error al registrar. Intenta de nuevo.')
      }

        firstname('')
        lastname('')
        dni('')
        gender('')
        phone('')
        email('')
        status('')
    } catch (error) {
      setError(error.message || ' Error al registrar estudiatne' )
    }
  }



  return (
    <div
      className="fixed inset-0 flex justify-center items-center 
      bg-black/50 z-100 transition-opacity duration-300"
    >
      <form 
        ref={modalRef}
        onSubmit={onSubmit}
        className="flex flex-col gap-4 
          w-[25em] md:w-[50em] max-w-2xl bg-white 
          rounded-md shadow-xl p-6
        "
      >
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <div className="relative">
          <Title
          text={title}
          level="h3"
          weight="bold"
        />
        <FiX 
          size={23} 
          className="absolute right-2 top-2"
          onClick={closeModal}
        />
        </div>
        <FormItem
          formFields={formFields}
          selectVariant="secondary"
        />
        <div className=" flex justify-end gap-5">
          <Button
          text='Registrar'
          variant="primary"
          type='submit'
        />
          <Button
          text='Cancelar'
          variant="primary"
          type='submit'
        />
        </div>
      </form>
    </div>
  )
}

export { ModalRegisterStudents }