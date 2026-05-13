function Input({
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  required,
  className = '',
  size = 'medium',
  align = 'left',
  variant = 'default',

  icon,
  onIconClick,

  ...props
}) {

  const variants = {
    default: `
      bg-gray-200 rounded-lg h-10 px-3
      border-none
      focus:border-blue-500
      focus:ring-1 focus:ring-blueT
      outline-none
      transition-all duration-200
    `,

    primary: `
      bg-transparent border-0 border-b border-blue
      px-2 pt-2 pb-0 w-full
      focus:outline-none
      focus:border-[#FFBB00]
      transition
    `
  }

  const sizes = {
    small: 'text-[.9em]',
    medium: 'text-[1em]',
    large: 'text-[1.2em]'
  }

  const aligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className="relative w-full">

      <input
        className={`
          w-full
          ${className}
          ${variants[variant] || variants.default}
          ${sizes[size] || sizes.medium}
          ${aligns[align] || aligns.left}

          ${icon ? 'pr-10' : ''}
        `}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />

      {
        icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-500
              hover:text-black
              transition-colors
            "
          >
            {icon}
          </button>
        )
      }

    </div>
  )
}

export { Input }