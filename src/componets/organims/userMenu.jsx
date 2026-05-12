import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { NavbarLink } from "../atoms/navbarLink";
import { Button } from '../atoms/button';
import { UserMenuModal } from '../modals/modalsUser/userMenuModal';
import { UserNavbar } from '../molecules/userNavbar';
import { ChangePasswordModal } from '../modals/modalsUser/userPasswordModal';

function UserMenu({ onLogout, handleLogout, mobile = false }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
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
      <div className="text-white p-[1em]  
      transition-colors duration-400 hover:bg-blueT border-r boder-white
    ">
        <Bell />
      </div>

      {/*Usuario en el navbar */}
      <UserNavbar 
        user= {user}
        setIsUserMenuOpen={setIsUserMenuOpen}
        isUserMenuOpen={isUserMenuOpen}
      />

      {/*Renderizado de modales menu usuario y cambiar contraseña */}
      {
        isUserMenuOpen && (
          <UserMenuModal 
            setIsUserMenuOpen={setIsUserMenuOpen} 
            handleLogout={handleLogout}
            setIsPasswordModalOpen={setIsPasswordModalOpen}
          />
        )
      }
      {
        isPasswordModalOpen && (
          <ChangePasswordModal setIsPasswordModalOpen={setIsPasswordModalOpen}/>
        )
      }
    </div>
  );
}

export { UserMenu };