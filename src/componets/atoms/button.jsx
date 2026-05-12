function Button({
  text,
  onClick,
  className = '',
  type,
  disabled = false, 
  children,
  variant = 'default'
}) {

  const variants = {
    default: ``,
    primary: `
      md:right-9 lg:right-9  xl:right-8 bottom-[-2em]
      bg-blue h-10 lg:px-5 rounded-[10px]
      text-[.8em] lg:text-[.9em] xl:text-[1em]
      font-semibold text-white border-none
      shadow-blue
      hover:bg-blueT hover:shadow-md
      transition-all duration-300 cursor-pointer
`,
    secondary: `
      w-full bg-blue text-white font-bold text-[1.1em]
      py-1 transition-all duration-300 ease-in-out
      hover:bg-blueT
      hover:shadow-lg
      hover:-translate-y-0.5
      active:scale-95
    `,
  }

  return (
    <button
      className={`
        ${className}
        ${variants[variant] || variants.default}
      `}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text || children}
    </button>
  )
}

export { Button }