import React, { useEffect, useState } from "react";

function ProgressCard({ progress, course }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const duration = 600; // in milliseconds
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const newProgress = Math.min((elapsed / duration) * progress, progress);
      setAnimatedProgress(Math.floor(newProgress));

      if (newProgress < progress) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [progress]);

  return (
    <div className="mb-0.5 md:mb-3">
      <div className="w-full max-w-md p-1 md:p-3 border border-gray-300 rounded-md shadow-sm">
        <div className="flex justify-between items-center mb-1 md:mb-3">
          <h2 className="text-xs md:text-sm font-semibold text-gray-800">
            {course}
          </h2>
          <button className="px-4 md:px-5 text-xxxs md:text-xs font-normal cursor-pointer border border-gray-300 rounded-full hover:bg-gray-100">
            Resume
          </button>
        </div>

        <div className="w-full h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-purple-400 rounded-full transition-all duration-300"
            style={{ width: `${animatedProgress}%` }}
          ></div>
        </div>
      </div>
      <p className="text-xxs font-normal ml-1">{animatedProgress}% complete</p>
    </div>
  );
}

export default ProgressCard;
