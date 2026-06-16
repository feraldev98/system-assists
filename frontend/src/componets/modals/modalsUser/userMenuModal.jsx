import { useState, useEffect, useRef } from "react";
import { Title } from "../../atoms/title";
import { Paragraph } from "../../atoms/paragraph";
import { useAuth } from "../../../hooks/hookGlobals/useAuth";
import { menuUserItems } from "../../../mocks/menuModalUser";

function UserMenuModal({ closeModal, openPasswordModal, }) {

  // USAMOS EL HOOK useAuth PARA EL MENEJO DE SERRAR SESIÓN
  const { logout } = useAuth()

  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef(null);


  const user = {
    name: "Wynsely Durán",
    email: "wynjs@gmail.com",
    avatar: null,
  };

  const CLOSE_DURATION = 300

  const handleClick = (action) => {
    if (action === "password") {
      handleClose();
      setTimeout(() => {
        openPasswordModal();
      }, CLOSE_DURATION);
    }

    //LOGOUT
    if (action === "logout") {
      handleClose();
      setTimeout(() => {
        logout();
      }, CLOSE_DURATION);
    }
  };

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
    }, CLOSE_DURATION);
  };

  // CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className={`absolute right-0 top-full w-50 md:w-65 bg-blue shadow-xl
        z-50 overflow-hidden transition-all duration-300
        animate-[slideDown_0.3s_ease-out]
        ${isClosing
          ? "opacity-0 translate-y-2"
          : "opacity-100 translate-y-0"
        }
      `}
    >
      {/* USER INFO */}
      <div className="p-4 bg-white/10 border-b border-white">
        <div>
          <Title
            level="h4"
            variant="primary"
            text={user.name}
          />
          <Paragraph
            size="small"
            variant="secondary"
            text={user.email}
          />
        </div>

      </div>

      <div className="h-px bg-white/20"></div>

      <ul className="py-2">
        {menuUserItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <li key={index}>
              <button
                onClick={() => handleClick(item.action)}
                className="
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  text-white
                  hover:bg-blueT/80
                  transition-colors duration-200
                "
              >
                <Icon size={18} />

                <span className="text-sm">
                  {item.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { UserMenuModal };