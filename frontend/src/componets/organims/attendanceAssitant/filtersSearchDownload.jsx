import { Select } from "../../atoms/select";
import { AttendanceSearch } from "../../molecules/attendanceControl/attendanceSearch"
import { DownloadButtons } from "./downloadButtons";

function FiltersSearchDownload({
  search,
  setSearch,
  grade,
  setGrade,
  section,
  setSection,
  students,
  filtered
}) {

  const gradeOptions = [
    {
      text: "Grados",
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
      <div className="flex items-center justify-end gap-2">
        <div className="flex justify-end items-center gap-3">
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
        <DownloadButtons
          filtered={filtered}
          grade={grade}
          section={section}
        />
      </div>

    </div>
  )
}

export { FiltersSearchDownload }