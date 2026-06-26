import { useFilterOptions } from "../../../hooks/hooksAssistant/useFilterOptions"
import { Select } from "../../atoms/select"

function FiltersGradeSectionStudents() {

  const {gradeOptions, sectionOptions } = useFilterOptions()
  return(
    <div className="flex  justify-end items-center gap-3">
          <Select
            options={gradeOptions}
            variant="primary"
          />
          <Select
            options={sectionOptions}
            variant="primary"
          />
        </div>
  )
}

export {FiltersGradeSectionStudents}