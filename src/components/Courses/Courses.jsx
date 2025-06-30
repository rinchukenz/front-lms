import React from 'react'
import CourseCard from '../CourseCard/CourseCard'

function Courses() {
  return (
    <div className="overflow-x-auto transition-all duration-300 ease-in-out">
      <div className="flex gap-2 w-max grid-cols-2">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  )
}

export default Courses
