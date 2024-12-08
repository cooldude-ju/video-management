import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchVideos } from './api'; // Ensure fetchVideos API is implemented




const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  // Fetch all recorded videos on load
  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetchVideos();
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    getVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8 animate__animated animate__fadeIn">
          Video Dashboard
        </h1>

        {/* Buttons */}
        <div className="space-y-4 mb-8">
          <Link
            to="/record"
            className="block w-full py-3 px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl rounded-lg hover:bg-gradient-to-l transform transition duration-300 hover:scale-105 text-center"
          >
            Start Recording
          </Link>
          <Link
            to="/play"
            className="block w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xl rounded-lg hover:bg-gradient-to-l transform transition duration-300 hover:scale-105 text-center"
          >
            View Videos
          </Link>
        </div>

        {/* Video List */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recorded Videos</h2>
        <ul className="space-y-3">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span className="text-gray-800 font-medium">{video.name || `Video ${index + 1}`}</span>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 font-semibold hover:underline"
                >
                  Play
                </a>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No videos recorded yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
