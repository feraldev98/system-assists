import { IoNotifications } from "react-icons/io5";
import { Button } from '../atoms/button';
import { UserNavbar } from '../molecules/userNavbar';
import { NavbarMenu } from '../molecules/desktopMenu';
import { Link } from 'react-router-dom';
//HOOKS
import { useModal } from "../../hooks/hookModal/useModal";
import { useAuth } from "../../hooks/hookGlobals/useAuth";
import { useNavbar } from "../../context/navbarContext";
//MODALES
import { UserMenuModal } from '../modals/modalsUser/userMenuModal';
import { ChangePasswordModal } from '../modals/modalsUser/userPasswordModal';

function UserMenu({ onLogout, mobile = false }) {

  //hook modal
  const userMenuModal = useModal() 
  const passwordModal = useModal()

  //hook idenfiticar rol
  const {role} =  useAuth()

  //hook mobilOpen
  const {setMobileOpen} = useNavbar()

  //navegar a las notificaciones segun el rol
  const notificationsRutes = {
    admin: '/notifications-assistant',
    assistant: '/notifications-assistant',
    father: '/notifications-student',
  }
  const notificationRoute =
  notificationsRutes[role] || '/notifications-student';


  const user = {
    name: 'Wynsely Durán',
    email: 'wynjs@gmail.com',
    avatar: null
  };

  return (
    <div className={`
        ${mobile
          ? "flex w-full mt-4 justify-end border-t border-white/10 pt-4"
          : `flex-col items-end hidden 
            md:flex  md:flex-row md:items-center md:relative ml-auto h-full`
        }
      
      `}
    >
      {/*icono notificaciones*/}
      <Link
        to={notificationRoute} 
        onClick={() => setMobileOpen (false)}
        variant=''
        className="text-white p-[1em]  
        transition-colors duration-400 hover:bg-blueT border-r boder-white
      ">
        <IoNotifications size={23} className='text-white'/>
      </Link>

      {/*Usuario en el navbar */}
      <UserNavbar 
        user={user}
        toggleModal={userMenuModal.toggleModal}
        isOpen={userMenuModal.isOpen}
      />

      {/*Renderizado de modales menu usuario y cambiar contraseña */}
      {
        userMenuModal.isOpen && (
          <UserMenuModal 
            closeModal={userMenuModal.closeModal}
            openPasswordModal={passwordModal.openModal}
          />
        )
      }
      {
        passwordModal.isOpen && (
          <ChangePasswordModal
            closeModal={passwordModal.closeModal}
          />
        )
      }
    </div>
  );
}

export { UserMenu };