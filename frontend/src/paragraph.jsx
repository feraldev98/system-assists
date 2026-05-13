function Paragraph ({ 
  children,
  text, 
  className = '',
  size = 'medium',
  variant = 'default',
  align = 'left',
  weight = 'normal',
  ...props 
}) {

  const variants ={
    default: 'text-black',
    primary: 'text-white',
    secondary: 'text-gray-500 ',
    danger: 'text-blue-dark'
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const sizes = {
    base : "text-base",
    small:  "text-[0.6em] sm:text-[.7em] md:text-[.9em]",
    medium: "text-[.4em] xs:text-[.7em] sm:text-[.7em] md:text-[.9em] lg:text-[1em]" ,
    large:  "text-[.7em] sm:text-[.9em] lg:text-[1.2em] xl:text-[1.3em]",
    slogan : "text-[.9em] sm:text-[1.2em] lg:text-[1.2em] xl:text-[1.3em]",
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    semi: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <p 
      className={`
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.medium}
        ${alignments[align] || alignments.left}
        ${weights[weight] || weights.normal}
        ${className}
      `}
      {...props}
    >
      {children || text}
    </p>
  );
};

export { Paragraph };