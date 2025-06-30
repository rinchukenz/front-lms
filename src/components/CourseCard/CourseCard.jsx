import React from 'react'
import python from '../../assets/python.jpeg'

function CourseCard() {
  return (
    <div>
      <img className='w-[90%] h-25' src={python} alt="" />
      <h2 className='text-xs font-semibold mt-1'>Python Full Stack Development</h2>
      <p className='text-xxs font-normal'>Siddu Hiremath</p>
      <span className='text-sm font-bold'>₹799</span>
    </div>
  )
}

export default CourseCard
