import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // You can use any icon library

function CalendarCarousel() {
  const scrollRef = useRef(null);
  const daysInMonth = new Date(2025, 5, 0).getDate(); // June 2025
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const scroll = (direction) => {
    const scrollAmount = 100; // Adjust for how much to scroll per click
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full px-8 py-6">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-violet-100"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-6 scroll-smooth snap-x snap-mandatory"
      >
        {days.map((day) => (
          <div
            key={day}
            className="min-w-[64px] h-16 flex flex-col items-center justify-center bg-violet-100 rounded-lg text-violet-700 font-semibold snap-start shrink-0"
          >
            <span className="text-lg">{day}</span>
            <span className="text-sm">Jun</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-violet-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default CalendarCarousel;
