import { FiltersGradeSectionStudents } from "../../molecules/adminRegisters/filtersStudents"
import { StudentSearch } from "../../molecules/adminRegisters/serachStudents"
import { FiltersGradeSection } from "../../molecules/filtersGradeSection"
import { Table } from "../tableReusable"

function ListEstudents () {

  const headers = [
    "Estudiante",
    "DNI",
    "Grado",
    "Sección",
    "Padre u Apoderado",
    "Auxiliar",
    "Acciones"
  ]

  return(
    <div className=" flex flex-col gap-6 w-[96%] md:w-[90%] md:max-w-7xl mx-auto mt-10">
      <div className="grid grid-cols-2 mt-5">
        <StudentSearch/>
        <FiltersGradeSectionStudents/>
      </div>
      <Table
        headers={headers}
        emptyMessage="No hay estudiantes registrados..."
      />
    </div>
  )
}

export {ListEstudents}