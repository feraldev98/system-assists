import { Link } from "../../atoms/link"
import { Small } from "../../atoms/small"

function PendingTasks({pendingTasks}) {
  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {pendingTasks.map((task, i) => (
        <div
          key={i}
          className="py-4 flex items-start justify-between gap-4"
        >
          <Link
            text={task.title}
            size="large"
          />
          <Small 
            text={`Finaliza en: ${task.days}`}
          />
        </div>
      ))}
    </div>
  )
}

export { PendingTasks }