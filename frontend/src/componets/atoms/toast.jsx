import { useToast } from "../../hooks/hookGlobals/useToast";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { FiX } from "react-icons/fi";

function Toast() {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`
        fixed top-5 right-5 z-[2000]
        flex items-center gap-2
        px-4 py-3 rounded-lg shadow-lg
        text-white font-poppins text-sm
        animate-[slideDown_0.3s_ease-out]
        ${isSuccess ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {isSuccess ? <IoCheckmarkCircle size={20} /> : <IoCloseCircle size={20} />}
      <span>{toast.message}</span>
      <button onClick={hideToast} className="ml-2 opacity-80 hover:opacity-100">
        <FiX size={16} />
      </button>
    </div>
  );
}

export { Toast };