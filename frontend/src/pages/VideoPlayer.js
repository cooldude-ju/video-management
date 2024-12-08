import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const VideoPlayer = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await fetch(`${API_BASE_URL}/videos`);
            const data = await response.json();
            setVideos(data);
        };

        fetchVideos();
    }, []);

    const handleVideoSelection = (videoId) => {
        setSelectedVideo(videoId);
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Video Player</h1>
                <div className="space-y-4 mb-8">
                    <select
                        onChange={(e) => handleVideoSelection(e.target.value)}
                        className="w-full py-3 px-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="" disabled selected className="text-gray-500">
                            Select a Video
                        </option>
                        {videos.map((video, index) => (
                            <option key={index} value={video.id} className="bg-white text-black hover:bg-gray-200">
                                {video.name}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedVideo && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-center text-indigo-600 mb-3">Playing Video</h2>
                        <video className="w-full rounded-lg border-2 border-indigo-600" controls src={`${process.env.REACT_APP_API_BASE_URL}/video/${selectedVideo}`} />
                    </div>
                )}
                <div className="mt-6 flex justify-between">
                    <Link to="/" className="text-indigo-500 font-semibold hover:underline">
                        Go to Dashboard
                    </Link>
                    <Link to="/record" className="text-indigo-500 font-semibold hover:underline">
                        Go to Video Recorder
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
