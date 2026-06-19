import { Select } from "../atoms/select"
import { behaviorGradeOptions } from "../../mocks/behabiorGradeOptions"
import { dateFilterOptions } from "../../mocks/dateFilterOptions"

function FiltersGradeSection({
  gradeOptions, 
  sectionOptions,
  setGrade,
  setSection,
  grade,
  section,
  showBehaviorFilter = (false)
}) {
  return(
    <div className="flex  justify-end items-center gap-3">
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
            value={section}
            variant="primary"
          />
          {
            showBehaviorFilter && (
              <div className="flex items-center justify-end gap-3">
                <Select
                  options={behaviorGradeOptions}
                  variant="primary"
                />
                <Select
                  options={dateFilterOptions}
                  variant="primary"
                />
              </div>
            )
          }
        </div>
  )
}

export {FiltersGradeSection}