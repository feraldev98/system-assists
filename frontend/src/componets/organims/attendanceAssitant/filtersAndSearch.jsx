import { Select } from "../../atoms/select";
import { AttendanceSearch } from "../../molecules/attendanceControl/attendanceSearch"

function FiltersSearch({
  search,
  setSearch,
  grade,
  setGrade,
  section,
  setSection,
  students
}) {
  
  const gradeOptions = [
  { 
    text: "Grados" ,
    value: ""
  },
  ...[...new Set(students.map((s) => s.grade))].map((grade) => ({
    value: grade,
    text: grade,
  })),
];

const sectionOptions = [
  { 
    text: "Secciones", 
    value: "", 
  },
  ...[...new Set(students.map((s) => s.section))].map((section) => ({
    value: section,
    text: section,
  })),
];
  return (
    <div className="grid sm:grid-cols-2 gap-5 my-5">
      {/*boton de buscar por nombre y/o código */}
      <AttendanceSearch
        search={search}
        setSearch={setSearch}
      />
      <div className="flex justify-end items-center gap-5">
        <Select
          options={gradeOptions}
          onChange={(e) => {
            setGrade(e.target.value)
          }}
          value={grade}
          variant="primary"
        />
        <Select
          options={sectionOptions}
          onChange={(e) => {
            setSection(e.target.value)
          }}
          value={grade}
          variant="primary"
        />
      </div>
      
    </div>
  )
}

export { FiltersSearch }