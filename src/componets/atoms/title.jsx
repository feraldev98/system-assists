function Title({
  level = 'h1',
  children,
  text,
  className = '',
  variant = 'default',
  align = 'left',
  weight = 'normal',
  ...props
}) {
  const Tag = level;

  const variants = {
    default: 'text-black',
    primary: 'text-white',
    secondary: 'text-orange',
    danger: 'text-blue',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const defaultByLevel = {
  h1: 'text-[.7em] xs:text-[.8em] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
  h2: 'text-[1.7em] xs:text-[2.5] sm:text-[2.2em] md:text-[2.4em]',
  h3: 'text-[1.3em] sm:text-[1.2em] md:text-[1.2em] xl:text-[1.2em]',
  h4: 'text-sm sm:text-base md:text-[1.1em]',
  h5: 'text-xs sm:text-sm md:text-base',
  h6: 'text-[10px] sm:text-xs md:text-sm',
};


  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    bold: 'font-bold',
  };

  return (
    <Tag
      className={`
        ${defaultByLevel[level] || defaultByLevel.h1}
        ${weights[weight] || weights.normal}
        ${variants[variant] || variants.default}
        ${alignments[align] || alignments.left}
        ${className}
      `}
      {...props}
    >
      {children || text}
    </Tag>
  );
}

export { Title };