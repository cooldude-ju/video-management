// src/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// Fetch all videos
export const fetchVideos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/videos`);
    return response;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Add other functions like uploadVideo if needed
