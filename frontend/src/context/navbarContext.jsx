import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export function NavbarProvider ({children}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdow, setOpenDropdown] = useState(null)

  return (
    <NavbarContext.Provider
      value={{
        mobileOpen,
        setMobileOpen,
        openDropdow,
        setOpenDropdown
      }}
    >
      {children}
    </NavbarContext.Provider>
  )
}

export function useNavbar() {
  const context = useContext(NavbarContext)

  if(!context) {
    throw new Erro ('useNavbar debe usarse dentro de NavbarProvider')
  }

  return context
}