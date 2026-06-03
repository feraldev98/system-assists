function Footer () {
  return (
    <footer className="h-[3em] bg-blue mt-5 relative overflow-hidden w-full bottom-0">
      <div className="absolute -top-3 right-15 w-40 h-40 rounded-full bg-white/10 z-1" />
      <div className="absolute -bottom-3 right-60 w-20 h-20 rounded-full bg-white/10 z-1" />

      <small className=" absolute w-full
        top-3 translate-x-[50%] text-blueT
      ">Desarrollado por: @WynsleyJ</small>
    </footer>
  )
}

export {Footer}