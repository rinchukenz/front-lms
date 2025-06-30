import React from "react";

function Placement() {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-2xl sm:text-3xl">Placement Opportunities</h2>
      <p className="text-sm mt-4 font-medium">
        Explore the latest job and internship opportunities shared by top
        companies.
      </p>
      <p className="text-xs font-bold mt-3">Click the link below to view full details and apply.</p>
      <button className="w-1/2 px-4 py-0.5 mt-3 rounded-2xl border border-black text-xxs">→ View Placement Opportunities</button>
    </div>
  );
}

export default Placement;
