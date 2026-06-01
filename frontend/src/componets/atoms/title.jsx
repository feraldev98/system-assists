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
    secondary: 'text-cyan-700',
    danger: 'text-blue',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const defaultByLevel = {
  h1: 'text-[1.3em] xs:text-[1.6em] sm:text-[1.9]  lg:text-[2.1em] xl:text[2.3em]',
  h2: 'text-[1.3em] xs:text-[1.2 sm:text-[1.3em] md:text-[1.6em]',
  h3: 'text-[1.3em] sm:text-[1.2em] md:text-[1.2em] xl:text-[1.2em]',
  h4: 'text-base md:text-[1.1em]',
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