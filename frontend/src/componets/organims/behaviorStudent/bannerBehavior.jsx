import { ArticleBannerBehavior } from "../../molecules/behaviorStudent/articleBannerBehavior"

function BannerBehavior ({
  setSelectedStudent,
  selectedStudent,
  greetingLabel, 
  currentStudent,
  students,
  }){

  return(
    <section className="
      relative
      bg-linear-to-br from-darkB to-[#054d6a] 
      px-6 py-8 pb-16 mt-6 
      w-full 
      md:w-[90%]
      md:max-w-7xl 
      rounded-md  
      md:mx-auto
      overflow-hidden
    "
      
    >
      <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-white/5 z-1" />
      <div className="absolute -bottom-10 right-20 w-40 h-40 rounded-full bg-white/10 z-1" />
    <ArticleBannerBehavior
      currentStudent={currentStudent}
      setSelectedStudent={setSelectedStudent}
      selectedStudent={selectedStudent}
      students={students}
    />
    </section>
  )
}

export {BannerBehavior}