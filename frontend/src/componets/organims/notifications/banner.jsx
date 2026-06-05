import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/title";
import { TitleAndDescaription } from "../../molecules/titleandDescription";
import { CardStatsNotifications } from "./cardStatsNotifications";

function BannerNotifications({ unreadCount = 0, onMarkAllAsRead, notifications }) {
  const title = 'Mis Notificaciones'
  const description =
    unreadCount > 0
      ? `${unreadCount} notificaciones sin leer`
      : "No tienes notificaciones recientes";

  return (
    <section
      className=" flex flex-col gap-5
        mt-6
        py-4
        md:mt-6
        w-[96%]
        md:w-[90%]
        md:max-w-6xl
        mx-auto
      "
    >
      <div className="flex justify-between">
        <TitleAndDescaription
          title={title}
          level='h2'
          weight='bold'        
          description={description}
        />
        {
          unreadCount > 0 && (
            <Button
              text='Marcar como leídas'
              variant="danger"
              onClick={onMarkAllAsRead}
            />
          )
        }
      </div>
      <CardStatsNotifications
        notifications={notifications}
      />
    </section>
  );
}

export { BannerNotifications };