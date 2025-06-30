import React from 'react'

function CustomButton({ icon, text, className, action }) {

  return (
    <button className={className} onClick={action}>
      {icon && <img src={icon} className="w-5 h-5" />}
      {text}
    </button>
  )
}

export default CustomButton
