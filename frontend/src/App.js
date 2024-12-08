import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import VideoRecording from './pages/VideoRecording';
import VideoPlayer from './pages/VideoPlayer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/record" element={<VideoRecording />} />
                <Route path="/play" element={<VideoPlayer />} />
            </Routes>
        </Router>
    );
}

export default App;
