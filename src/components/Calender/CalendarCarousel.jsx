import React, { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ClassSchedule from "../ClassSchedule/ClassSchedule";

// Sample class data
const classData = {
  "2025-06-19": 2,
  "2025-06-20": 1,
  "2025-06-21": 2,
};

const classDetails = {
  "2025-06-19": [
    {
      title: "SpringBoot",
      type: "Live class",
      time: "9:00 am - 1:00 pm",
    },
    {
      title: "Core Java Lec : 1",
      type: "Recorded class",
      time: "Duration: 2 hours",
    },
  ],
  "2025-06-20": [
    {
      title: "React js",
      type: "Live class",
      time: "9:00 am - 1:00 pm",
    },
  ],
  "2025-06-21": [
    {
      title: "MySQL",
      type: "Live class",
      time: "9:00 am - 1:00 pm",
    },
    {
      title: "Core Java Lec : 2",
      type: "Recorded class",
      time: "Duration: 2 hours",
    },
  ],
};

function CalendarCarousel() {
  const today = dayjs();
  const scrollRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.month());
  const [currentYear, setCurrentYear] = useState(today.year());

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const todayElement = scrollContainer?.querySelector(".today-date");

    if (scrollContainer && todayElement) {
      const offsetLeft = todayElement.offsetLeft;
      const containerWidth = scrollContainer.offsetWidth;
      const elementWidth = todayElement.offsetWidth;
      scrollContainer.scrollLeft = offsetLeft - containerWidth / 2 + elementWidth / 2;
    }
  }, []);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const current = dayjs().year(currentYear).month(currentMonth).startOf("month");
  const daysInMonth = current.daysInMonth();
  const days = Array.from({ length: daysInMonth }, (_, i) => current.add(i, "day"));

  const isToday = (date) => date.isSame(today, "day");
  const isSelected = (date) => date.isSame(selectedDate, "day");

  return (
    <div className="mx-3 md:ml-10">
      <div className="w-full md:w-[95%] mx-auto my-4 px-4 py-6 relative border-[#D9D9D9] border rounded-lg bg-white">
        {/* Header */}
        <div className="flex justify-start gap-2 items-center mb-3">
          <button onClick={goToPreviousMonth} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-semibold text-gray-500">
            {dayjs().year(currentYear).month(currentMonth).format("MMMM, YYYY")}
          </span>
          <button onClick={goToNextMonth} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Calendar Row */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4">
          {days.map((date) => {
            const key = date.format("YYYY-MM-DD");
            const classCount = classData[key] || 0;
            const selected = isSelected(date);
            const todayMatch = isToday(date);

            return (
              <div
                key={key}
                onClick={() => setSelectedDate(date)}
                className={`w-24 flex-shrink-0 rounded-xl px-1.5 py-0.5 text-center border cursor-pointer transition-all duration-200 ${
                  selected ? "bg-[#CD68FF] text-white" : "bg-white text-black border-gray-300"
                } ${todayMatch ? "today-date" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xxs font-semibold">{date.format("dddd")}</p>
                  {todayMatch && (
                    <div className="flex items-center gap-1">
                      <p className="ml-auto text-xxxs font-semibold">Today</p>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </div>
                <p className="text-4xl font-display my-2.5">{date.date()}</p>
                <p className="text-xxs flex justify-end">{classCount} classes</p>
              </div>
            );
          })}
        </div>

        {/* Class Details */}
        <div>
          <ClassSchedule selectedDate={selectedDate} classData={classDetails} />
        </div>
      </div>
    </div>
  );
}

export default CalendarCarousel;
