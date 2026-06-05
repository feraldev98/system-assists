import { Paragraph } from "../../atoms/paragraph";
import { Small } from "../../atoms/small";
import { Title } from "../../atoms/title";

function SectionNotifications({ notifications }) {
  return (
    <div
      className="
        flex flex-col gap-3 px-5 rounded-md
        border border-borderC bg-gray-200
        max-h-[50vh] overflow-y-auto 
        md:mt-6 w-[96%] md:w-[90%]
        md:max-w-6xl mx-auto
      "
    >
      <Title
        level="h3"
        weight="bold"
        className="sticky top-0 bg-gray-200 w-full py-3"
        text='Todas las notificaciones'
      />
      {notifications.map((notification) => (
        <article
          key={notification.id}
          className={`
            rounded-lg
            shadow-sm
            border
            border-blue/50
            p-3
            bg-white
            ${
              !notification.isRead
                ? "border-l-8 border-blue"
                : ""
            }
          `}
        >
          <Title
            level="h5"
            weight="bold"
            text={notification.title}
          />

          <Paragraph
            text={notification.message}
            className="mt-2"
          />

          <Small
            text={notification.date}
            className="mt-2 text-gray-500"
          />
        </article>
      ))}
    </div>
  );
}

export { SectionNotifications };