import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormLogin } from '../../organims/formLogin'
import { DescriptionLogin } from '../../molecules/loginPage/descriptión'

export const LoginPage = ({ onLogin }) => {

  const navigate = useNavigate()

  const handleLoginSuccess = (user) => {
    onLogin(user)

    // redirección según rol
    switch (user.role) {

      case 'admin':
        navigate('/')
        break
      case 'assistant':
        navigate('/attendance-control')
        break
      case 'father':
        navigate('/attendance-student')
        break
      default:
        navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-[Poppins] overflow-hidden">

      {/* LEFT */}
      <div className="md:flex md:w-1/2 bg-linear-to-br from-[#032d3c] via-[#054d6a] to-[#0a7ea4] text-white 
        items-center justify-center p-10 relative">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-white/10" />
        <DescriptionLogin />
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 relative overflow-hidden bg-white">

        <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_0%_0%,rgba(166,166,166,0.45),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_100%_100%,rgba(3,45,60,0.12),transparent_70%)]" />

        <FormLogin onLogin={handleLoginSuccess} />
      </div>
    </div>
  )
}