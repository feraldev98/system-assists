import { FiX } from "react-icons/fi";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { Button } from "../../atoms/button";
import { FormItem } from "../../molecules/formItems";
import { Title } from "../../atoms/title";
import { useToggle } from "../../../hooks/hookModal/useToggle";
import { useLoading } from "../../../hooks/hookGlobals/useLoading";
import { useState } from "react";

function ChangePasswordModal({closeModal}) {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const {
  loading = true,
  startLoading,
  stopLoading 
} = useLoading()

  //VER CONTRASEÑA
  const {
    state: showCurrentPassword,
    toggle: toggleCurrentPassword 
  } = useToggle()

  const {
    state: showNewPassword,
    toggle: toggleNewPassword
  } = useToggle()

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading()
    setError("");

    try {
      console.log({
        currentPassword,
        newPassword,
      });

    // PETICIÓN BACK
      closeModal();

    } catch (err) {
      setError(
        "Error al cambiar contraseña"
      );
    } finally {
      stopLoading()
    }
  };

  //LISTA DE ITEMS
  const formFields = [
  {
    text: 'Nueva contraseña',
    type: showCurrentPassword ? 'text' : 'password',
    placeholder: '••••••••',
    name: 'passwd',
    value: currentPassword,
    onChange: (e) => setCurrentPassword(e.target.value),
    icon: showCurrentPassword ? <IoEye size={18}/> : <IoEyeOff size={18}/>,
    onIconClick: toggleCurrentPassword,
  },

  {
    text: 'Confirmar contraseña',
    type: showNewPassword ? 'text' : 'password',
    placeholder: '••••••••',
    name: 'newPasswd',
    value: newPassword,
    onChange: (e) => setNewPassword(e.target.value),
    icon: showNewPassword ? <IoEye size={18}/> : < IoEyeOff size={18}/>,
    onIconClick: toggleNewPassword,
  },
]


  return (
    <div
      className=" fixed inset-0  flex justify-center items-center md:block bg-black/50 z-100 transition-opacity duration-300"
      onClick={closeModal}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) =>
          e.stopPropagation()
        }
        className=" absolute md:m-0  w-[20em] md:w-[23em]  max-w-md bg-white md:absolute
          md:right-8
          md:top-16
          shadow-xl shadow-blueT px-6 py-7 flex flex-col gap-5
          animate-[slideDown_0.3s_ease-out]
        "
      >
        {/* HEADER */}
          <div className=" flex flex-col items-center border-b border-black/30 pb-3">
            <Title
              text="Restablecer contraseña"
              level="h3"
              weight="bold"
              className="font-poppins"
              align="center"
            />
            <FiX 
              onClick={closeModal}
              className="absolute right-2 top-2 text-blue/40 z-100"/>
          </div>
        {/* ERROR */}
        {error && (
          <span className="text-sm text-red-500">
            {error}
          </span>
        )}

        <FormItem
          formFields={formFields}
          inputSize="medium"
        />

        {/* BUTTONS */}
          <Button
            type="submit"
            disabled={loading}
            variant="secondary"
            text={loading
              ? "Guardando..."
              : "Confirmar"}
          />
            
      </form>
    </div>
  );
}

export { ChangePasswordModal };