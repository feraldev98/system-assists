import { useState } from "react"
import { useClickOutside } from "../../../hooks/hookModal/useClickOutside"
import { Title } from "../../atoms/title"
import { FormItem } from "../../molecules/formItems"
import { Button } from "../../atoms/button"
import { apiFetch } from "../../../helpers/apiFetch"

function ModalRegisterBehaviors({
  closeModal,
  student,
  updateBehavior
}) {

  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [section, setSection] = useState('')
  const [behaviorType, setBehaviorType] = useState('')
  const [qualification, setQuaification] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Título del modal
  const title = 'Calificar Comportamiento'

  //cerrar modal al hacer click fuera
  const modalRef = useClickOutside(closeModal)


  //lista formulario
  const formFields = [
    {
      text: 'Estudiante',
      type: 'text',
      name: 'name',
      value: name,
      onChange: (e) => setName(e.target.value)
    },
    [
      {
        text: 'Grado',
        type: 'select',
        name: 'grade',
        value: grade,
        onChange: (e) => setGrade(e.target.value),
        options: [
          { text: 'Seleccionar grado...', value: '' },
          { text: 'Primero', value: '1' },
          { text: 'Segundo', value: '2' },
          { text: 'Tercero', value: '3' },
          { text: 'Cuarto', value: '4' },
          { text: 'Quinto', value: '5' }
        ]
      },
      {
        text: 'Sección',
        type: 'select',
        name: 'section',
        value: section,
        onChange: (e) => setSection(e.target.value),
        options: [
          { text: 'Secciona la sección..', value: '' },
          { text: 'A', value: 'A' },
          { text: 'B', value: 'B' },
          { text: 'C', value: 'C' },
          { text: 'D', value: 'D' },
          { text: 'E', value: 'E' },
          { text: 'F', value: 'F' }
        ]
      },
    ],
    [
      {
        text: 'Calificación',
        type: 'select',
        name: 'qualification',
        value: qualification,
        onChange: (e) => setQuaification(e.target.value),
        options: [
          { text: 'Calificar..', value: '' },
          { text: 'AD', value: 'AD' },
          { text: 'A', value: 'A' },
          { text: 'B', value: 'B' },
          { text: 'C', value: 'C' },
        ]
      },
      {
        text: 'Tipo incidente',
        type: 'select',
        name: 'behaviorType',
        value: behaviorType,
        onChange: (e) => setBehaviorType(e.target.value),
        options: [
          { text: 'Secciona un tipo..', value: '' },
          { text: 'Participación destacada', value: 'A' },
          { text: 'Respeto y compañerismo', value: 'B' },
          { text: 'Distracción en clase', value: 'C' },
          { text: 'Uso indebido del celular', value: 'D' },
          { text: 'Impuntualidad', value: 'E' },
          { text: 'Agresión verbal', value: 'F' }
        ]
      },

    ],
    {
      text: 'Descripcion',
      type: 'textarea',
      placeholder: 'Describe el incidente...',
      name: '',
      value: '',
      onChange: (e) => setCalification(e.target.value)
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      //validaciones

      //Enviar datos
      const data = await apiFetch('/behavior-control', 'POST',(
        name,
        grade,
        section,
        qualification,
        behaviorType,
        description
      ))

      setSuccess(data.message || 'Calificación exitosa')
      name('')
      grade('')
      section('')
      qualification('')
      behaviorType('')
      description('')
    } catch (error) {
      setError(error.message || 'Ocurrió un error al calificar estudiante')
    }
  }
  return (
    <div

      className="fixed inset-0 flex justify-center items-center 
      bg-black/50 z-100 transition-opacity duration-300
    ">

      <form
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className=" flex flex-col gap-4
          w-[25em] md:w-[50em] max-w-2xl bg-white
          rounded-md shadow-xl p-6
        "
      >
        {error && <span className="text-red-500 text-sm">{error}</span>}
        {success && <span className="text-green-600 text-sm">{success}</span>}
        <Title
          text={title}
          level="h3"
          weight="bold"
        />
        <FormItem
          formFields={formFields}
          selectVariant="secondary"
        />
        <Button
          text='Calificar'
          variant="primary"
          type='submit'
        />
      </form>
    </div>
  )
}

export { ModalRegisterBehaviors }