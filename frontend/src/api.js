import axios from 'axios';

// Fetch all videos
export const fetchVideos = async () => {
  try {
    const response = await axios.get('http://localhost:5000/videos');
    return response;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};


