import { Button } from "../atoms/button"
import { FaFileDownload } from "react-icons/fa";

function DownloadButtons({
  onPdf,
  onExcel
}) {

  return (
    <div className="flex gap-2 justify-end">
      <Button
        onClick={onExcel}
        className="flex gap-1 items-center my-auto bg-green-500 p-2 rounded-md text-white
        transition-all duration-300 hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-blue"
      >
        <FaFileDownload/> Excel
      </Button>

      <Button
        onClick={onPdf}
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