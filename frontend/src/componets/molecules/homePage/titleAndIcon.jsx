import { Title } from "../../atoms/title"

function TitlesAndIcon ({ title, icon: Icon }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <Icon className="w-5 h-5 text-cyan-700" />
      <Title
        text = {title}
        level="h4"
      />
      
    </div>
  )
}

export { TitlesAndIcon }