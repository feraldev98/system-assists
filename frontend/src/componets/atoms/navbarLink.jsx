import { Link, useLocation } from "react-router-dom";

function NavbarLink({ href, text, onClick, className = '', variant = 'default' }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  const baseStyles = `
    font-poppins text-white
    transition-all duration-200
  `;

  const variants = {
    default: `
      ${isActive ? 'text-cyan-400' : 'hover:text-white'}
    `,
    submenu: `
      block px-5 py-2 rounded-md
      ${isActive ? 'bg-blueT' : 'hover:bg-blueT/80'}
    `
  };

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {text}
    </Link>
  );
}

export { NavbarLink };