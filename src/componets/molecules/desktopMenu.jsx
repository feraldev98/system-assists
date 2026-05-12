// NavbarMenu.jsx

import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

import { NavbarLink } from "../atoms/navbarLink";
import { MobileMenu } from "./mobileMenu";

function NavbarMenu() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuRef = useRef(null);

  const menu = [
    {
      href: "/students",
      text: "Estudiantes",
      submenu: [
        { href: "/students/schedules", text: "Horarios" },
        { href: "/students/courses", text: "Cursos" },
        { href: "/students/grades", text: "Calificaciones" },
        { href: "/students/attendance", text: "Asistencia" },
      ],
    },
    {
      href: "/teachers",
      text: "Docentes",
      submenu: [
        { href: "/teachers/courses", text: "Cursos" },
        { href: "/teachers/schedule", text: "Horarios" },
        { href: "/teachers/evaluations", text: "Evaluaciones" },
      ],
    },
    {
      href: "/attendance",
      text: "Asistencias",
      submenu: [
        { href: "/attendance/entry", text: "Entrada" },
        { href: "/attendance/classroom", text: "Aulas" },
      ],
    },
    {
      href: "/aboutUs",
      text: "Institución",
    },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleToggle = (e) => {
    e.preventDefault();

    setMobileOpen((prev) => !prev);
  };

  // cerrar dropdown y menú móvil al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef}>
      {/* HAMBURGER */}
      <button
        className="md:hidden text-white z-50 relative"
        onClick={handleToggle}
      >
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* DESKTOP MENU */}
      <ul
        ref={menuRef}
        className="
          hidden md:flex top-0 h-full
          list-none m-0 p-0 
          absolute left-1/2 -translate-x-1/2
        "
      >
        {menu.map((item, index) => (
          <li
            key={index}
            className="
              h-[4em]
              px-5 xl:px-8
              flex items-center
              relative
              transition-colors duration-300
              hover:bg-blueT
            "
          >
            {item.submenu ? (
              <div className="relative h-full flex items-center">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="
                    flex items-center gap-1
                    h-full
                    text-white
                    font-poppins
                    text-[.9em]
                  "
                >
                  {item.text}

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      openDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === index && (
                  <ul
                    className="
                      absolute top-full left-0
                      bg-blue
                      shadow-lg
                      py-2
                      min-w-[200px]
                      z-50
                      list-none
                    "
                  >
                    {item.submenu.map((subitem, subindex) => (
                      <NavbarLink
                        key={subindex}
                        href={subitem.href}
                        text={subitem.text}
                        onClick={() => setOpenDropdown(null)}
                        variant="submenu"
                        className="
                          block px-5 py-2
                          text-white text-[.8em]
                          hover:bg-blueT/80
                          hover:pl-6
                          transition-all duration-200
                        "
                      />
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <NavbarLink
                href={item.href}
                text={item.text}
                className="text-white text-[.9em]"
              />
            )}
          </li>
        ))}
      </ul>

      {/* MOBILE MENU */}
      <MobileMenu
        menu={menu}
        mobileOpen={mobileOpen}
        openDropdown={openDropdown}
        toggleDropdown={toggleDropdown}
        setOpenDropdown={setOpenDropdown}
        setMobileOpen={setMobileOpen}
      />
    </div>
  );
}

export { NavbarMenu };