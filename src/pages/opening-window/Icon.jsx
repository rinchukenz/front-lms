import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Icon = ({ src, className = "", delay = 0 }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -10,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay,
      });
    }
  }, [delay]);

  return (
    <img
      ref={iconRef}
      src={src}
      className={`absolute rounded-full shadow-lg ${className}`}
    />
  );
};

export default Icon;
