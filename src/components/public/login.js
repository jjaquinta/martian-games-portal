import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import { Form, Alert } from 'react-bootstrap';
import './Login.css'; // Ensure this line is present
import loginAudio from '../audio/loginScreenAudio.mp3'; // Adjusted import path
import bgVideo from '../video/bgvideo.mp4'; // Import the background video

const PublicLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [game, setGame] = useState('TankOff Classic');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useApi();
  const { setUserData } = useContext(UserContext);
  
  // Create audio instance outside of useEffect
  const audioRef = useRef(new Audio(loginAudio)); // Use a ref to keep the audio instance

  // Play background music when the component mounts
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true; // Loop the audio

    // Cleanup function to stop the audio when the component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset audio to the beginning
    };
  }, []); // Empty dependency array to run only on mount

  // Video reference
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // Ensure the video is loaded before setting the timeout
    const handleLoadedMetadata = () => {
      // Play the video and ensure it loops
      video.play();
    };

    // Add event listener for when the video metadata is loaded
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(game, username, password);

      if (result.success) {
        setUserData(result.userData);
        navigate('/portal/me/stats');
      } else {
        setError(result.error || 'Login failed. Please try again.');
        console.error('Login failed:', result);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  // Function to play audio
  const playAudio = () => {
    const audio = audioRef.current;
    audio.play().catch((error) => {
      console.error('Error playing audio:', error); // Log any errors
    });
  };

  return (
    <div className="login-container" onClick={playAudio}> {/* Play audio on click */}
      <video ref={videoRef} autoPlay loop muted className="background-video" preload="auto">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-content">
        <h1 className="login-title">Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select
              name="game"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="login-select"
            >
              <option value="TankOff Classic">Tank Off Classic</option>
              <option value="TankOff2">Tank Off 2</option>
              <option value="AirWars3">Air Wars 3</option>
              <option value="AirWars2">Air Wars 2</option>
              <option value="MotorWars2">Motor Wars</option>
              <option value="KartWars2">Kart Wars</option>
            </Form.Select>
          </Form.Group>
          <button type="submit" className="login-button">Login</button>
        </Form>
      </div>
    </div>
  );
};

export default PublicLogin;
