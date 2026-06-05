import { Link } from "react-router-dom"
import { useVisible } from "../../../hooks/useVisible"
import { Title } from "../../atoms/title"
import { Small } from "../../atoms/small"
import { Paragraph } from "../../atoms/paragraph"

function CardQuickAccess ({quickActions, href}) {

  const { visible } = useVisible(90)

  return(
    <div className="grid sm:grid-cols-2 gap-3">
      {
        quickActions.map((item, i) => {
          return(
            <Link 
              key={i}
              to={item.href}
              className={` flex gap-2
                bg-blueT rounded-md p-3 shadow-md shadow-blue/50 
                border border-borderC  transition-all duration-300 ease-in-out
                hover:-translate-y-1 
                ${ visible
                  ? 'opacity-100 translate-0'
                  : 'opacity-0 translate-5'
                }
              `}
            >
              <span className="text-white">
                {item.icon}
              </span>
              <div>
                <Title
                level="h4"
                weight="bold"
                variant="primary"
                text={item.label}
              />
              <Paragraph
                text={item.description}
                size="small"
                variant="secondary"
              />
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export {CardQuickAccess}