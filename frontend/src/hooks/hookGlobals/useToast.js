import { useToastContext } from "../../context/toastContext";

function useToast() {
  const { showToast, hideToast, toast } = useToastContext();
  return { showToast, hideToast, toast };
}

export { useToast };