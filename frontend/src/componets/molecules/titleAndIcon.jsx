import { Title } from "../atoms/title"

function TitleAndIcon ({title, icon: Icon, level, weight, sizeIcon}) {
  return(
    <div className="flex gap-3 items-center">
      <Icon 
        className ='text-cyan-700'
        size = {sizeIcon}
      />
      <Title
        level={level}
        weight={weight}
        text={title}
      />
    </div>
  )
}

export {TitleAndIcon}