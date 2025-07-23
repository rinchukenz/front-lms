import React, { useEffect, useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar({ percentage }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 600; // 1 second
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progressValue = Math.min((elapsed / duration) * percentage, percentage);
      setProgress(Math.floor(progressValue));

      if (progressValue < percentage) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [percentage]);

  return (
    <div style={{ width: 120, height: 120 }}>
      <CircularProgressbarWithChildren
        value={progress}
        strokeWidth={20}
        styles={buildStyles({
          pathColor: "#9D5CFF",      // pink-purple
          trailColor: "#E5E7EB",     // light gray (for smoother animation effect)
        })}
      >
        <div className="text-center text-black font-semibold text-sm">
          {progress}%
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default CircularProgressBar;
