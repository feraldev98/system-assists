import { priorityStyles } from "../../tokens/priorityStyles";

function NotificationPriority({ priority }) {

  const className =
    priorityStyles[priority] ??
    "bg-gray-100 text-gray-500";

  return (
    <span
      className={`
        px-3 py-1
        rounded-full
        text-xs font-medium
        ${className}
      `}
    >
      {priority}
    </span>
  );
}

export { NotificationPriority };