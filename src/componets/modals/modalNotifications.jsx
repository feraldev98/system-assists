import { Title } from "../atoms/title"

function ModalNotifications () {

  const title = 'Mis Notificaiones'
  return(
    <Title 
      level="h2"
      text={title}
      align="center"
      weight="bold"
    />
  )
}

export {ModalNotifications}