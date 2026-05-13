import { Bell } from "lucide-react"
import { Title } from "../../atoms/title"
import { Link } from "../../atoms/link"

function IEMessage ({institutionalMessages}) {
  const title = 'MENSAJES INSTITUCIONALES'
  return(
    <div className="bg-white rounded-md border border-borderC p-6 shadow-sm">
              <Title 
                text={title}
                level="h4"
                weight="semibol"
                className="mb-5"
              />
            <div className="flex flex-col gap-4">
              {institutionalMessages.map((item, i) => (
                <Link
                  key={i}
                  text={item}
                  
                />
              ))}
            </div>
          </div>
  )
}

export {IEMessage}