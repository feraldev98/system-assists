import { Select } from "../../atoms/select";
import { AttendanceSearch } from "../../molecules/attendanceControl/attendanceSearch"
import { exportAttendanceExcel } from "../../../services/export/exportAttendanceExcel";
import { exportAttendancePdf } from "../../../services/export/exportAttendancePdf";
import { DownloadButtons } from "../../molecules/downloadButtons";
import { FiltersGradeSection } from "../../molecules/filtersGradeSection";
import { useFilterOptions } from "../../../hooks/hooksAssistant/useFilterOptions";

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

  //hook encargado de filtrar estudiantes por grado y seccion
  const { gradeOptions, sectionOptions } = useFilterOptions(students);

  return (
    <div className="grid lg:grid-cols-2 gap-5 my-5">
      {/*boton de buscar por nombre y/o código */}
      <AttendanceSearch
        search={search}
        setSearch={setSearch}
      />
      <div className="flex items-center justify-end gap-2">
        <FiltersGradeSection
          grade={grade}
          section={section}
          setGrade={setGrade}
          setSection={setSection}
          gradeOptions={gradeOptions}
          sectionOptions={sectionOptions}
        />
        <DownloadButtons
          onExcel={() => exportAttendanceExcel(filtered)}
          onPdf={() =>
            exportAttendancePdf(
              filtered,
              grade,
              section
            )}
        />
      </div>

    </div>
  )
}

export { FiltersSearchDownload }