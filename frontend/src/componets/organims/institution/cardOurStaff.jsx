import { FaUserCircle } from "react-icons/fa"
import { Title } from "../../atoms/title"
import { Small } from "../../atoms/small"

function CardOurStaff ({title, staffList}) {
  return(
    <div className="flex flex-col gap-5 mt-5 w-full">
      <Title
        level='h3'
        weight="bold"
        text={title}
      />
      <div className="grid gap-2 md:gap-5 mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {
          staffList.map((item, i) => {
            return(
              <div key={i} className="flex items-center bg-white p-3 
                border border-borderC/50
                rounded-md  
                transition-all duration-300 
                hover:-translate-y-1 hover:shadow-lg shadow-blue
              ">
                <div className="shrink-0">
                  {
                    item.img ? (
                      <img src={item.img} alt={item.title} />
                    ) : (
                      <FaUserCircle className="size-16 md:size-20 text-blueT" />
                    )
                  }
                </div>
                <div className="min-w-0 overflow-hidden ml-3 flex flex-col">
                  <Title
                    level="h5"
                    weight="bold"
                    text={item.name}
                  />
                  <Small
                    text={item.post}
                    variant="primary"
                  />
                  <div className="truncate w-full break-all" title={item.email}>
                    <Small
                    text={item.email}
                    size="xsmall"
                  />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export {CardOurStaff}