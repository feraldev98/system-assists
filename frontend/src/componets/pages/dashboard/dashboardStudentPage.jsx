import { MyTemplate } from "../../templates/myTemplate"
import { Banner } from "../../organims/homePage/banner"
import { useEffect, useState } from "react"
import { CardStats } from "../../organims/homePage/cardStats"
import { Overview } from "../../organims/homePage/homeOverview"


function DashboardStudentPage({ userData }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const role = userData?.role || 'admin'

  const stats = [
    { label: 'Estudiantes', value: '900' },
    { label: 'Asistieron', value: '870' },
    { label: 'Faltaron', value: '30' },
    { label: 'Asistencia promedio', value: '94%' },
  ]


  const greetingLabel = {
  admin: 'Administrador',
  assistant: 'Auxiliar',
  father: 'Padre',
}[role] || 'Usuario'

  const hora = new Date().getHours()
  const saludo =
    hora < 12 ? 'Buenos días' : hora < 18 ? 'Buenas tardes' : 'Buenas noches'


  return (
    <MyTemplate>
      <Banner
        greetingLabel={greetingLabel}
        userData={userData}
        visible={visible}
        saludo={saludo}
      />
      <CardStats
        visible={visible}
        stats={stats}
      />
      <Overview
        visible={visible}
      />
    </MyTemplate>
  )
}

export { DashboardStudentPage }