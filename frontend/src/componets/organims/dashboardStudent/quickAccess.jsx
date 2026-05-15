import { Link } from "react-router-dom"
import { Small } from "../../atoms/small"
import { Title } from "../../atoms/title"

function QuickAccess({quickAccess, href, visible, }) {
  return (
    <Link
      to={href}
      className=" grid sm:grid-cols-2 xl:grid-cols-3 gap-3 w-full ">
      {quickAccess.map((item, i) => (
        <div
          key={i}
          className={`bg-blueT rounded-md p-4 
              shadow-md shadow-blue/20 border border-borderC
              transition-all duration-300 ease-in-out font-hani 
              hover:-translate-y-1
              md:w-40
              lg:w-45
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            
          `}
        >
          <div>
            <Title
              weight="bold"
              variant="primary"
              level="h4"
              text={item.title}
          
          />
          <Small 
            text={`${item.days}`}
            className="text-green-50"
          />
          </div>
        </div>
      ))}
    </Link>
  )
}

export { QuickAccess }