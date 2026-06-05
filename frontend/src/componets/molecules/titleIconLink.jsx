import { Link } from "react-router-dom"
import { Title } from "../atoms/title"
import { Small } from "../atoms/small"

function TitleIconLink ({ title, icon: Icon, href, text, weight, siseSmall }) {
  return (
    <div className="flex items-center justify-between w-full gap-2 mb-5">
      <div className="flex items-center gap-2 " >
        <Icon className="w-5 h-5 text-cyan-700" />
        <Title
        text = {title}
        level="h4"
        weight={weight}
      />
      </div>
      <Link
          to ={href}
        >
          <Small
          size={siseSmall}
            text={text}
            variant="primary"
            className="text-cyan-700 hover:underline
                    transition-colors duration-300
                    cursor-pointer"
          />
        </Link>
    </div>
  )
}

export { TitleIconLink }