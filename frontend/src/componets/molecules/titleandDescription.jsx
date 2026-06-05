import { Paragraph } from "../atoms/paragraph"
import { Title } from "../atoms/title"

function TitleAndDescaription ({title, description, level, weight, size}) {
  return(
    <div>
        <Title
          level={level}
          text={title}
          weight={weight}
        />

        <Paragraph
          text={description}
          size={size}
        />
      </div>
  )
}

export {TitleAndDescaription}