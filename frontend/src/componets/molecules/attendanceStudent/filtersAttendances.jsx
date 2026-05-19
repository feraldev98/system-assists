import { GrFilter } from "react-icons/gr";
import { TitleIconLink } from "../titleIconLink";

function FilterAttendances({
  statusFilter,
  currentStudent,
  setStatusFilter,
  periodFilter,
  setPeriodFilter,
}) {
  const title = "FILTRAR POR ESTADO";

  return (
    <div className="bg-white border border-borderC rounded-md p-6">
      <TitleIconLink title={title} icon={GrFilter} />

      {/* DESKTOP */}
      <div className="hidden md:flex flex-wrap items-center gap-3">
        {/* TODOS */}
        <button
          onClick={() => setStatusFilter("Todos")}
          className={`px-5 py-3 rounded-2xl font-semibold transition ${
            statusFilter === "Todos"
              ? "bg-[#003347] text-white"
              : "bg-gray-100 text-[#1f2a44] hover:bg-gray-200"
          }`}
        >
          Todos ({currentStudent?.stats?.days})
        </button>
        {/* PRESENTES */}
        <button
          onClick={() => setStatusFilter("Presente")}
          className={`px-5 py-3 rounded-2xl font-semibold transition ${
            statusFilter === "Presente"
              ? "bg-green-700 text-white"
              : "bg-gray-100 text-[#1f2a44] hover:bg-gray-200"
          }`}
        >
          Presentes ({currentStudent?.stats?.presents})
        </button>

        {/* AUSENTES */}
        <button
          onClick={() => setStatusFilter("Ausente")}
          className={`px-5 py-3 rounded-2xl font-semibold transition ${
            statusFilter === "Ausente"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-[#1f2a44] hover:bg-gray-200"
          }`}
        >
          Ausentes ({currentStudent?.stats?.absents})
        </button>
        {/* TARDANZAS */}
        <button
          onClick={() => setStatusFilter("Tardanza")}
          className={`px-5 py-3 rounded-2xl font-semibold transition ${
            statusFilter === "Tardanza"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-[#1f2a44] hover:bg-gray-200"
          }`}
        >
          Tardanzas ({currentStudent?.stats?.late})
        </button>

        {/* SELECT PERIODO */}
        <select
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          className="bg-gray-100 text-[#1f2a44] px-5 py-3 rounded-2xl font-semibold outline-none cursor-pointer hover:bg-gray-200 transition"
        >
          <option value="">Filtrar período</option>
          <option value="semanal">Semanal</option>
          <option value="bimestral">Bimestral</option>
          <option value="anual">Anual</option>
        </select>
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden gap-3 mt-4">
        
        {/* SELECT ESTADO */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-gray-100 text-[#1f2a44] px-5 py-3 rounded-2xl font-semibold outline-none"
        >
          <option value="Todos">
            Todos ({currentStudent?.stats?.days})
          </option>
          <option value="Presente">
            Presentes ({currentStudent?.stats?.presents})
          </option>
          <option value="Ausente">
            Ausentes ({currentStudent?.stats?.absents})
          </option>
          <option value="Tardanza">
            Tardanzas ({currentStudent?.stats?.late})
          </option>
        </select>

        {/* SELECT PERIODO */}
        <select
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          className="w-full bg-gray-100 text-[#1f2a44] px-5 py-3 rounded-2xl font-semibold outline-none"
        >
          <option value="">Filtrar período</option>
          <option value="semanal">Semanal</option>
          <option value="bimestral">Bimestral</option>
          <option value="anual">Anual</option>
        </select>
      </div>
    </div>
  );
}

export { FilterAttendances };