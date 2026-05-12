import { Lock, X,Eye, EyeOff} from "lucide-react";
import { useState } from "react";
import { Button } from "../../atoms/button";
import { FormItem } from "../../molecules/formItems";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/title";

function ChangePasswordModal({setIsPasswordModalOpen }) {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //ver contraseña
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const handleClose = () => {
    setIsPasswordModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log({
        currentPassword,
        newPassword,
      });

      // petición backend
      handleClose();
    } catch (err) {
      setError(
        "Error al cambiar contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
  {
    text: 'Nueva contraseña',
    type: showCurrentPassword ? 'text' : 'password',
    placeholder: '••••••••',
    name: 'passwd',
    value: currentPassword,
    onChange: (e) => setCurrentPassword(e.target.value),
    icon: showCurrentPassword ? <Eye size={18}/> : <EyeOff size={18}/>,
    onIconClick: () =>
      setShowCurrentPassword(prev => !prev),
  },

  {
    text: 'Confirmar contraseña',
    type: showNewPassword ? 'text' : 'password',
    placeholder: '••••••••',
    name: 'newPasswd',
    value: newPassword,
    onChange: (e) =>
      setNewPassword(e.target.value),
    icon: showNewPassword ? <Eye size={18}/> : < EyeOff size={18}/>,
    onIconClick: () =>
      setShowNewPassword(prev => !prev),
  },
]

  return (
    <div
      className=" fixed inset-0  flex justify-center items-center md:block bg-black/50 z-100 transition-opacity duration-300"
      onClick={handleClose}
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
            <X 
              onClick={handleClose}
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