
function Select({
  options, 
  name,
  value,
  onChange,
  required,
  className,
  variant = 'default',
  size = 'medium',
  ...props
}) {

  const variants = {
    default :`w-full text-center
      border-b border-blue py-o px-1 text-black/50 
    `
  }

  const sizes ={
    small : 'text-[.9em]',
    medium : 'text-[1.2em]',
    large : 'text-[1.5em]'
  } 

  return (
    <select  
      name= {name}
      value={value}
      onChange={onChange}
      required ={required}
      className= {`
        ${className}
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.medium}
        `}
        {...props}
    >
      {
        options.map((opt, o) =>{
          return(
            <option key={o} value={opt.value} className="text-left">
              {opt.text}
            </option>
          )
        })
      }
    </select>
    )
}

export { Select }