import React, { useEffect, useState } from "react";
import axios from "axios";

function VideoLibrary() {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Please provide title and video file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      await axios.post("http://localhost:8080/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      setTitle("");
      fetchVideos(); // Refresh list
    } catch (err) {
      console.error("Video upload failed:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="px-6 py-10">

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="flex flex-col md:flex-row gap-4 mb-6 items-start"
      >
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Video
        </button>
      </form>

      {/* Video List */}
      {videos.length === 0 ? (
        <p className="text-gray-600">No videos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              <video
                controls
                src={video.videoUrl}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoLibrary;
