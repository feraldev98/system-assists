import { useState } from "react"
import { Button } from "../atoms/button"
import { Title } from "../atoms/title"
import { Link } from "../atoms/link"
import { FormItem } from "../molecules/formItems"
import { useNavigate } from 'react-router-dom'

function FormLogin({ onLogin }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  setTimeout(() => {

    const usuarios = [
      { user: 'alumno', pass: '1234', role: 'alumno' },
      { user: 'docente', pass: '1234', role: 'docente' },
      { user: 'auxiliar', pass: '1234', role: 'auxiliar' },
      { user: 'admin', pass: '1234', role: 'administrador' }
    ]

    const usuario = usuarios.find(
      u => u.user === email.toLowerCase().trim() && u.pass === password
    )

    if (!usuario) {
      setError('Credenciales incorrectas')
      setLoading(false)
      return
    }

    const response = {
      nombre: usuario.user,
      rol: usuario.role,
      correo: `${usuario.user}@institucion.edu.pe`
    }

    if (onLogin) onLogin(response)

    // navegación según tu sistema
    switch (usuario.role) {
      case 'administrador':
        navigate('/')
        break
      case 'docente':
        navigate('/')
        break
      case 'auxiliar':
        navigate('/')
        break
      case 'alumno':
        navigate('/')
        break
      default:
        navigate('/')
    }

    setLoading(false)

  }, 800)
}

  const formFields = [
    {
      text: 'Usuario',
      htmlFor: 'user',
      type: 'text',
      name: 'user',
      value: email,
      placeholder: 'Tu Usuario',
      onChange: (e) => setEmail(e.target.value)
    },
    {
      text: 'Contraseña',
      htmlFor: 'passwd',
      type: 'password',
      name: 'passwd',
      value: password,
      placeholder: 'Tu contraseña',
      onChange: (e) => setPassword(e.target.value)
    }
  ]

  return (
    <form
      onSubmit={handleSubmit}
      className="
        absolute w-80 sm:w-90 py-10
        bg-[#f6f6f6] rounded-lg shadow-lg shadow-blue/20
        flex flex-col gap-5 p-6 z-999
        transition-all duration-400
        border border-gray-500/30 font-poppins
      "
    >
      {error && (
        <span className="text-sm text-red-700 text-center">
          {error}
        </span>
      )}

      <Title
        text='Iniciar Sesión'
        level="h3"
        align="center"
        weight="bold"
        className="text-center font-bold text-3xl text-gray-800"
      />

      <FormItem formFields={formFields} />

      <Button
        type='submit'
        variant="primary"
        text={loading ? 'Enviando...' : 'Ingresar'}
        className="mt-4"
      />

      <div className="
        mt-4 pt-4 border-t border-gray-200
        flex items-center justify-between 
        text-xs text-blue-600
      ">
        <Link
          text='Olvidé mi Contraseña'
          href='#'
        />
        <Link
          text='No tengo cuenta'
          href='#'
        />
      </div>
    </form>
  )
}

export { FormLogin }