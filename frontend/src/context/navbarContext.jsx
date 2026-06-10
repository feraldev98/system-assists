import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export function NavbarProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); 

  return (
    <NavbarContext.Provider
      value={{
        mobileOpen,
        setMobileOpen,
        openDropdown,
        setOpenDropdown,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error("useNavbar debe usarse dentro de NavbarProvider"); 
  }

  return context;
}