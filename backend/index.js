
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');

require('dotenv').config(); 
const PORT = process.env.PORT || 5000;

const BASE_URL = process.env.REACT_APP_API_BASE_URL || `http://localhost:${PORT}`;


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });


// Directory to store videos
const VIDEO_DIR = process.env.VIDEO_UPLOAD_PATH;
if (!fs.existsSync(VIDEO_DIR)) {
    fs.mkdirSync(VIDEO_DIR);
}

// Multer setup for video uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, VIDEO_DIR),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });



// GET /videos: List all videos
app.get('/videos', (req, res) => {
    const files = fs.readdirSync(VIDEO_DIR).map(file => ({
        id: file,
        name: file,
        url: `${BASE_URL}/video/${file}`,
    }));
    res.status(200).json(files);
});

// GET /video/:id: Stream video
app.get('/video/:id', (req, res) => {
    const videoPath = path.join(VIDEO_DIR, req.params.id);
    if (fs.existsSync(videoPath)) {
        res.sendFile(videoPath);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
});

// Serve static files
app.use('/video', express.static(VIDEO_DIR));

// Start server
app.listen(PORT, () => console.log(`Server running at ${BASE_URL}`));




app.post('/record', upload.single('video'), (req, res) => {
    const inputPath = req.file.path;
    const outputPath = path.join(VIDEO_DIR, `${Date.now()}.mp4`); // Save in WebM format

    // Simply move the file
    fs.rename(inputPath, outputPath, (err) => {
        if (err) {
            console.error('Error moving file:', err);
            return res.status(500).send('Error uploading video.');
        }
        res.status(200).send({ message: 'Video uploaded successfully!', url: `/videos/${path.basename(outputPath)}` });
    });
});
