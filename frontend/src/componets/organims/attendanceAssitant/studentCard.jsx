import { HiCheckCircle, HiClock, HiXCircle, HiUserCircle } from "react-icons/hi2";


function StudentCard({ student }) {
  const STATUS_CONFIG = {
  present: {
    label: "Presente",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    bar: "bg-green-500",
    icon: <HiCheckCircle size={22} className="text-green-500" />,
  },
  late: {
    label: "Tardanza",
    color: "text-yellow-700",
    bg: "bg-yellow-50 border-yellow-200",
    bar: "bg-yellow-400",
    icon: <HiClock size={22} className="text-yellow-500" />,
  },
  absent: {
    label: "Falta",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    bar: "bg-red-500",
    icon: <HiXCircle size={22} className="text-red-500" />,x
  },
};

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-gray-300 gap-3 border-2 border-dashed border-gray-200 rounded-3xl p-8">
        <HiUserCircle size={64} className="text-gray-200" />
        <p className="text-sm font-medium text-gray-400 text-center">
          Escanee un QR para ver el estudiante
        </p>
      </div>
    );
  }

  const status = STATUS_CONFIG[student.status] ?? STATUS_CONFIG.absent;

  return (
    <div className="rounded-3xl border border-blue/20 shadow-md bg-white overflow-hidden">
      {/* Barra de color según estado */}
      <div className={`h-2 w-full ${status.bar}`} />

      <div className="p-6">
        {/* Avatar + nombre */}
        <div className="flex items-center gap-4 mb-5">
          {student.img ? (
            <img
              src={student.img}
              alt={student.student}
              className="w-16 h-16 rounded-2xl object-cover border border-gray-100 shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-blue/10 flex items-center justify-center">
              <HiUserCircle size={40} className="text-blue/40" />
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-gray-800 leading-tight">
              {student.student}
            </h2>
            <span className="text-sm text-gray-400 font-mono">
              #{student.code}
            </span>
          </div>
        </div>

        {/* Estado */}
        <div
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-semibold mb-5 ${status.bg} ${status.color}`}
        >
          {status.icon}
          {status.label}
          {student.time && (
            <span className="ml-auto font-mono text-xs opacity-70">
              {student.time}
            </span>
          )}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
            <p className="text-gray-400 text-xs mb-0.5">Grado</p>
            <p className="font-semibold text-gray-700">{student.grade}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
            <p className="text-gray-400 text-xs mb-0.5">Sección</p>
            <p className="font-semibold text-gray-700">{student.section}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 col-span-2">
            <p className="text-gray-400 text-xs mb-0.5">Comportamiento</p>
            <p className="font-semibold text-gray-700">
              {student.behaviorGrade}{" "}
              <span className="font-normal text-gray-500 text-xs">
                — {student.behaviorDescription}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { StudentCard };