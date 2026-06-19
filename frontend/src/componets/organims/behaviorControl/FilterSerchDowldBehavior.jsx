import { Select } from "../../atoms/select";
import { AttendanceSearch } from "../../molecules/attendanceControl/attendanceSearch";
import { DownloadButtons } from "../../molecules/downloadButtons";
import { FiltersGradeSection } from "../../molecules/filtersGradeSection";
import { useFilterOptions } from "../../../hooks/hooksAssistant/useFilterOptions";
//logica de exportar excel/pdf
import { exportBehaviorExcel } from "../../../services/export/exportBehaviorExcel";
import { exportBehaviorPdf } from "../../../services/export/exportBehaviorPdf";

function FiltersBehavior({
  search,
  setSearch,
  grade,
  setGrade,
  section,
  setSection,
  students,
  showDownload = false,
  filtered,
  showBehaviorFilter,
}) {

  const { gradeOptions, sectionOptions } = useFilterOptions(students);

  return (
    <div className="grid lg:grid-cols-2 gap-5 mt-8">
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
          showBehaviorFilter={showBehaviorFilter}
        />
        {showDownload && (
          <DownloadButtons
            onExcel={() => exportBehaviorExcel(filtered)}
            onPdf={() => exportBehaviorPdf(filtered, grade, section)}
          />
        )}
      </div>


    </div>
  );
}

export { FiltersBehavior };
