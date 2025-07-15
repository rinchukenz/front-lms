// import React, { useEffect, useState } from "react";
// import { getContents } from "../services/OrgAdminService";

// function Content({ title, type, delete: handleDeleteContent }) {
//   const handleDeleteContent = async (contentId) => {
//     try {
//       await deleteContent(contentId);
//       toast.success("Content deleted successfully");
//       fetchContents();
//     } catch (error) {
//       toast.error("Failed to delete content");
//     }
//   };

//   return (
//     <div className="bg-white flex justify-between p-4 rounded-lg shadow-md border m-2 border-gray-200 w-full">
//       <h1>{title}</h1>
//       <p className="text-gray-600 text-sm">{type}</p>
//       <button onClick={handleDeleteContent}>delete</button>
//     </div>
//   );
// }

// export default Content;
