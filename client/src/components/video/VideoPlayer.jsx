// import React, { useRef } from 'react';
// import './video.css'; // Import your CSS file

// const VideoPlayer = () => {
//   // Reference to the video element
//   const videoRef = useRef(null);

//   // Function to play or pause the video
//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (video.paused) {
//       video.play();
//     } else {
//       video.pause();
//     }
//   };

//   return (
//     <div className="video-container">
//       <video ref={videoRef} className="video-player" controls>
//         <source src="/video-1.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       <button className="play-pause-button" onClick={togglePlay}>Play/Pause</button>
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './video.css'; // Import your CSS file
import { useParams } from 'react-router';

const VideoPlayer = () => {
    const { courseId } = useParams();
    const [videoLink, setVideoLink] = useState('');
    const videoRef = useRef(null);

    useEffect(() => {
        fetchVideoContent();
    }, []);

    const fetchVideoContent = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/coursematerials/${courseId}`);
            const materialContent = response.data[0].material_content;
            setVideoLink(materialContent);
        } catch (error) {
            console.error('Error fetching video content:', error);
        }
    };

    const togglePlay = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    return (
        <>
            <div className="video-container">
                <div className="video-path">
                    <span>Course </span>
                    <span>Part 1</span>
                    <span>Video</span>
                </div>
            </div>

        <div className="video-container">
            {videoLink ? (
                <video ref={videoRef} className="video-player" controls>
                    <source src={videoLink} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>    
            ) : (
                <p>Loading video...</p>
            )}
            <button className="play-pause-button" onClick={togglePlay}>Play/Pause</button>
            </div>
            </>
    );

};

export default VideoPlayer;