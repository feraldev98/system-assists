function MyTemplate({ children }) {
  return (
    <div className="bg-gray-400/10 pt-[4em]  flex flex-col justify-center  items-center ">
      {children}
    </div>
  )
}

export { MyTemplate }