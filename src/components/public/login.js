import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import { Form, Alert } from 'react-bootstrap';
import './Login.css';
import loginAudio from '../audio/loginScreenAudio.mp3';
import bgVideo from '../video/bgvideo.mp4';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const PublicLogin = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState('');
  const [game, setGame] = useState(localStorage.getItem('game') || 'TankOff Classic');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useApi();
  const { setUserData } = useContext(UserContext);
  const [isMuted, setIsMuted] = useState(false); // Initially unmuted

  const audioRef = useRef(new Audio(loginAudio));
  const videoRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    // Start playing audio on component mount
    if (!isMuted) {
      audio.play().catch(error => console.error("Error playing audio:", error));
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      if (video.currentTime >= 9) {
        video.currentTime = 0;
        video.play();
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(game, username, password);
      if (result.success) {
        // Store the username and selected game in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('game', game);
        
        setUserData(result.data);
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

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.play().catch((error) => console.error('Error playing audio:', error));
    } else {
      audio.pause();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="login-container">
      <video ref={videoRef} autoPlay loop muted={isMuted} className="background-video" preload="auto">
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
          <button 
            type="button" 
            onClick={toggleMute} 
            className={`mute-button ${isMuted ? 'muted' : ''}`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default PublicLogin;
