import { Title } from "../../atoms/title"
import { Paragraph } from "../../atoms/paragraph"
import { FilterStudents } from "../filterStudents"
import { useVisible } from "../../../hooks/hookGlobals/useVisible"

function ArticleBannerBehavior ({ 
  currentStudent,
  setSelectedStudent, 
  selectedStudent,
  students
}) {
  const title = 'COMPORTAMIENTO DE MI MENOR'
  const paragraph = 'Seguimiendo del comportamiendo escolar'

  const { visible } = useVisible(90)

  return(
    <article className="mx-auto max-w-6xl 
      flex flex-col gap-2.5 sm:flex-row justify-between
      z-10
    ">
      <div className="relative flex flex-col gap-1">
        <span className="inline-block bg-white/10 text-cyan-200 text-xs 
            font-semibold tracking-widest uppercase px-3 py-1 rounded-full "
          >
            {title}
          </span>
          <Title
            text={`${currentStudent.name}`}
            weight="bold"
            variant="primary"
            className={`transition-all duration-500 font-poppins${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}/>
            

          <Paragraph
            text={paragraph}
            variant="secondary"
            size="small"
          >
          </Paragraph>
      </div>
      <FilterStudents
        variant="primary"
        setSelectedStudent={setSelectedStudent}
        selectedStudent={selectedStudent}
        students={students}
      />
      </article>
  )
}

export {ArticleBannerBehavior}