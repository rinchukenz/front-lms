import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import { ChevronRight } from "lucide-react";

const sampleSchedule = {
  "2025-01-19": 3,
  "2025-01-20": 2, // Today
  "2025-01-21": 4,
};

function CalendarCarouselStyled() {
  const scrollRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(dayjs("2025-01-20"));

  const days = Array.from({ length: 3 }, (_, i) => {
    return currentDate.startOf("week").add(i + 1, "day");
  });

  const isToday = (date) => dayjs().isSame(date, "day");

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      {/* Month Header */}
      <div className="flex justify-between items-center mb-3 px-1">
        <span className="text-sm font-semibold text-gray-500">
          {currentDate.format("MMMM, YYYY")}
        </span>
        <button className="text-gray-700">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1"
      >
        {days.map((day) => {
          const dateKey = day.format("YYYY-MM-DD");
          const classCount = sampleSchedule[dateKey] || 0;

          const isTodayDate = isToday(day);

          return (
            <div
              key={dateKey}
              className={`w-24 shrink-0 rounded-xl text-center p-3 snap-start border
                ${isTodayDate ? "bg-violet-500 text-white" : "bg-white text-violet-500 border-gray-200"}
              `}
            >
              <p className="text-sm font-semibold">{day.format("dddd")}</p>
              <p className="text-2xl font-bold">{day.format("D")}</p>
              <p className="text-xs mt-1">
                {classCount} {classCount === 1 ? "class" : "classes"}
              </p>
              {isTodayDate && (
                <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarCarouselStyled;
