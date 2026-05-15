import { MyTemplate } from "../../templates/myTemplate"
import { Banner } from "../../organims/dashboardStudent/banner"
import { useEffect, useState } from "react"
import { CardStats } from "../../organims/dashboardStudent/cardStats"
import { Overview } from "../../organims/dashboardStudent/homeOverview"


function DashboardStudentPage({ userData }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const role = userData?.role || 'admin'

  const stats = [
    { label:'Asistió el día de hoy' , attended : true },
    { label: 'Tradanzas', value: '2' },
    { label: 'Comportamiento', value: 'AD' },
    { label: 'Días presentes', value: '25/30' },
  ]


  const greetingLabel = {
  admin: 'Administrador',
  assistant: 'Auxiliar',
  father: 'Padre de familia',
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