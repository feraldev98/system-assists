function Small ({
  text,
  children,
  variant = 'default',
  size = 'small',
  align = 'left',
  className = '',
  ...props
}) {

  const variants = {
    default : `text-gray-500`,
    primary: ``
  }

  const sices = {
    small: 'text-sm',
    medium: 'text-md',
    large: 'text-lg',
  }

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
  return(
    <small
      className={`
        ${className}
        ${variants[variant] || variants.default}
        ${sices[size] || sices.small}
        ${alignments[align] || alignments.left}
      `}
    >
      {children || text}
    </small>
  )
}

export {Small}