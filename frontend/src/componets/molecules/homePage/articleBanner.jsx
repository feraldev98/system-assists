import { Title } from "../../atoms/title"
import { Paragraph } from "../../atoms/paragraph"

function Article ({greetingLabel, visible, userData, saludo}) {
  return(
    <article className="max-w-5xl mx-auto relative z-10">
          <span className="inline-block bg-white/10 text-cyan-200 text-xs 
            font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
          >
            {greetingLabel}
          </span>

          <Title
            level="h2"
            weight="bold"
            variant="primary"
            className={`transition-all duration-500 font-poppins${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}>
            {saludo}, {userData?.nombre || 'bienvenido'}
          </Title>

          <Paragraph 
            className="mt-2"
            variant="secondary"
            size="small"
          >
            Sistema de control de asistencia — {new Date().toLocaleDateString('es-PE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Paragraph>
      </article>
  )
}

export {Article}