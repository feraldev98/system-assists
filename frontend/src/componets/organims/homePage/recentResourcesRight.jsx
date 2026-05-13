import { Link } from "../../atoms/link"
import { Small } from "../../atoms/small"

function RecentResources ({recentResources}) {
  return(
    <div className="flex flex-col divide-y divide-gray-100">
              {recentResources.map((item, i) => (
                <div
                  key={i}
                  className="py-4 flex items-start justify-between gap-4"
                >
                  <Link 
                    text={item.title}
                    size="large"
                  />

                  <Small 
                    text={item.time}
                  />
                </div>
              ))}
            </div>
  )
}

export {RecentResources}