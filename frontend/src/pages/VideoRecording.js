import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import RecordRTC from 'recordrtc';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const VideoRecording = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Click "Start Recording" to begin.');
    const [videoURL, setVideoURL] = useState(null);
    const videoRef = useRef(null);
    const recorderRef = useRef(null);
    const streamRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            videoRef.current.srcObject = stream;

            recorderRef.current = new RecordRTC(stream, {
                type: 'video',
                mimeType: 'video/mp4',
                video: {
                    width: 1280,
                    height: 720,
                },
            });

            recorderRef.current.startRecording();
            setIsRecording(true);
            setIsPaused(false);
            setStatusMessage('Recording in progress...');
        } catch (error) {
            console.error('Error starting recording:', error);
            setStatusMessage('Failed to start recording. Please try again.');
        }
    };

    const pauseRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.pauseRecording();
            setIsPaused(true);
            setStatusMessage('Recording paused.');
        }
    };

    const resumeRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.resumeRecording();
            setIsPaused(false);
            setStatusMessage('Recording in progress...');
        }
    };

    const stopRecording = async () => {
        recorderRef.current.stopRecording(() => {
            const videoBlob = recorderRef.current.getBlob();
            const videoUrl = URL.createObjectURL(videoBlob);
            setVideoURL(videoUrl);

            setStatusMessage('Recording stopped and video saved.');

            const formData = new FormData();
            formData.append('video', videoBlob);

            try {
                fetch(`${API_BASE_URL}/record`, {
                    method: 'POST',
                    body: formData,
                });
                alert('Video uploaded successfully!');
            } catch (error) {
                console.error('Error uploading video:', error);
                setStatusMessage('Error uploading video. Please try again.');
            }
        });

        setIsRecording(false);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Video Recorder</h1>
                <video ref={videoRef} className="w-full rounded-lg" autoPlay></video>
                <p className="mt-4 text-center text-lg font-medium text-indigo-700">{statusMessage}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={startRecording}
                        disabled={isRecording}
                        className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg rounded-lg hover:bg-gradient-to-l transform transition duration-300"
                    >
                        Start Recording
                    </button>
                    <button
                        onClick={pauseRecording}
                        disabled={!isRecording || isPaused}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg rounded-lg hover:bg-gradient-to-l transform transition duration-300"
                    >
                        Pause Recording
                    </button>
                    <button
                        onClick={resumeRecording}
                        disabled={!isPaused}
                        className="px-6 py-3 bg-gradient-to-r from-blue-400 to-green-500 text-white text-lg rounded-lg hover:bg-gradient-to-l transform transition duration-300"
                    >
                        Resume Recording
                    </button>
                    <button
                        onClick={stopRecording}
                        disabled={!isRecording}
                        className="px-6 py-3 bg-gradient-to-r from-red-400 to-orange-500 text-white text-lg rounded-lg hover:bg-gradient-to-l transform transition duration-300"
                    >
                        Stop Recording
                    </button>
                </div>
                {videoURL && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-center text-indigo-600 mb-3">Recorded Video</h2>
                        <video className="w-full rounded-lg" controls src={videoURL}></video>
                    </div>
                )}
                <div className="mt-8 flex justify-between">
                    <Link
                        to="/"
                        className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        to="/play"
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Go to Video Player
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VideoRecording;
