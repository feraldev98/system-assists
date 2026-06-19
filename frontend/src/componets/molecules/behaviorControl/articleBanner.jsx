import { Title } from "../../atoms/title"
import { Paragraph } from "../../atoms/paragraph"
import { useVisible } from "../../../hooks/hookGlobals/useVisible"
import { useGreeting } from "../../../hooks/hookGlobals/useGreeting"

function ArticleBannerControl ({ 
  currentStudent,
  setSelectedStudent, 
  selectedStudent,
  students
}) {
  const title = 'COMPORTAMIENTO ESTUDIANTIL'
  const description = 'Calificación del comportamiento de los estudiantes'

  const { visible } = useVisible(90)

  const {
    greetingLabel,
    greetingHour,
    name
  } = useGreeting()

  return(
    <article className="mx-auto max-w-6xl 
      z-10
    ">
      <div className="relative flex flex-col gap-1">
        <span className="inline-block bg-white/10 text-cyan-200 text-xs 
            font-semibold tracking-widest uppercase px-3 py-1 rounded-full "
          >
            {greetingLabel}
          </span>
          <Title
            weight="bold"
            level="h2"
            variant="primary"
            className={`transition-all duration-500 font-poppins ${
            visible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-3'
          }`}>
            {title}
          </Title>

          <Paragraph 
            className="mt-2"
            variant="secondary"
            size="small"
          >
            Bienvenido hoy — {new Date().toLocaleDateString('es-PE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Paragraph>
          <Paragraph
            text={description}
            size="small"
            variant="base"
            className="font-poppins"
          />
      </div>

      </article>
  )
}

export {ArticleBannerControl}