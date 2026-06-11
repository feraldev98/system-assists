import { exportAttendanceExcel } from "../../../utils/exporters/attendanceExportExcel"
import { exportAttendancePdf } from "../../../utils/exporters/attendanceExportPdf"
import { Button } from "../../atoms/button"
import { FaFileDownload } from "react-icons/fa";

function DownloadButtons({filtered, grade, section}) {

  //descargar en formato excel
  const downloadExcel = () => exportAttendanceExcel(
    filtered,
    grade,
    section
  )

  //Descargar en fromato pdf
  const downloadPdf = () => exportAttendancePdf(
    filtered,
    grade,
    section
  )

  return (
    <div className="flex gap-2 justify-end">
      <Button
        onClick={downloadExcel}
        className="flex gap-1 items-center my-auto bg-green-500 p-2 rounded-md text-white
        transition-all duration-300 hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-blue"
      >
        <FaFileDownload/> Excel
      </Button>

      <Button
        onClick={downloadPdf}
        className="flex gap-1  bg-blue-500flex items-center my-auto bg-blue-500 p-2 rounded-md text-white
        transition-all duration-300 hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-blue"
      >
        <FaFileDownload/> PDF
      </Button>
    </div>
  )
}

export { DownloadButtons }