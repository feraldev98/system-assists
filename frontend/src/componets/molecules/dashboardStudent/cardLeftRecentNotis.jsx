import { Title } from "../../atoms/title"
import { Link } from "react-router-dom"
import { Small } from "../../atoms/small"


function CardRecentNotifications({ RecentNotifications }) {

  return (
      <>
        {
        RecentNotifications.map((item, i) => {
          return (
            <div
              className=" p-4 flex gap-4  border border-gray-200 py-2 px-3
                    rounded-md hover:shadow-md transition-all
                    "
              key={i}
            >
              <span 
                className="flex items-center h-full py-1 px-2 text-[.8em] border-r border-gray-200 pr-4  
                  rounded-md
              ">{item.status}</span>
              <div className="flex flex-col w-full ">

                <Title
                  level="h5"
                  text={item.title}
                />
                <Small
                  text={item.message}
                  variant="primary"
                />
                <Small
                  size="xsmall"
                  text={item.dateTime}
                />
              </div>
            </div>
          )
        })
      }
      </>
  )
}

export { CardRecentNotifications }