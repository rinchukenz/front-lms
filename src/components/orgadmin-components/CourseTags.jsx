import React from 'react'

function CourseTags({course}) {
  return (
    <div>
      {course.tags?.length > 0 && (
        <div className="mb-12 border-t border-[#A2A2A2] pt-10">
          <h2 className="text-2xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-3">
            {course.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-4 py-1.5 rounded-full cursor-pointer font-bold border border-[#A1A1A1] transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseTags
