import { Paragraph } from "../../atoms/paragraph"
import { Title } from "../../atoms/title"

function Titlebanner({title, currentStudent}) {
  return (
    <div>
      <Title
        level="h2"
        weight="bold"
        text={`${title} ${currentStudent.name}`}
      />
      <Paragraph
        text={` Historial de asistencias y estadísticas`}
      />
    </div>
  )
}

export { Titlebanner }