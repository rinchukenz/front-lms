import React from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCard({ image, title, subtitle, id }) {

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/orgadmin/courses/${id}`);
  }

  return (
    <div onClick={handleClick} className="bg-white rounded-xl shadow-md p-2">
      <img className="w-full h-[160px] object-fill rounded-md" src={image} alt={title} />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-xxs text-gray-500">{subtitle}</p>
    </div>
  );
}

export default CourseCard;
