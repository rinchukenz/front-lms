import React, { useState } from "react";
import dayjs from "dayjs"; // for date handling (install via npm)

function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const today = dayjs();
  const isToday = (day) =>
    today.date() === day &&
    today.month() === currentDate.month() &&
    today.year() === currentDate.year();

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null); // Empty placeholders before 1st
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          ←
        </button>
        <div className="text-lg font-bold">
          {currentDate.format("MMMM YYYY")}
        </div>
        <button
          onClick={handleNextMonth}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 mt-2 text-center text-sm">
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className={`h-10 flex items-center justify-center rounded-full
              ${day ? "text-gray-800" : "text-transparent"}
              ${isToday(day) ? "bg-violet-500 text-white font-bold" : ""}
              hover:bg-violet-100 cursor-pointer`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
