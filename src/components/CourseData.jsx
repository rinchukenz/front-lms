import React from 'react'
import { useParams } from 'react-router-dom';

function CourseData() {

    const {cId} = useParams();
    console.log(cId);

  return (
    <div>
      <h1 className='m-10'>Coursedata - {cId}</h1>
    </div>
  )
}

export default CourseData
