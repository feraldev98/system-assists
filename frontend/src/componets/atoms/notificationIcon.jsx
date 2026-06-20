import { notificationTypes } from "../../tokens/notificationTypes";

function NotificationIcon({ type }) {

  const config =
    notificationTypes[type];

    if (!config) {
    console.log("Tipo recibido:", type);
    return null;
  }
    const Icon = config.icon;

  return (
    <div
      className={`
        ${config.className}
        p-3 rounded-xl
      `}
    >
      <Icon size={18}/>
    </div>
  );
}

export { NotificationIcon };