import { MyTemplate } from "../../templates/myTemplate";

function DashboardAdminPage () {
  
  const stats = [
    { label: 'Estudiantes', value: '900' },
    { label: 'Asistieron', value: '870' },
    { label: 'Faltaron', value: '30' },
    { label: 'Asistencia promedio', value: '94%' },
  ]
  return(
    <MyTemplate>
      <h1>
        Dashboard Administrador
      </h1>
    </MyTemplate>
  )
}

export {DashboardAdminPage}