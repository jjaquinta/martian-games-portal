import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import { Form, Alert } from 'react-bootstrap';
import './Login.css';
import loginAudio from '../audio/loginScreenAudio.mp3';
import bgVideo from '../video/bgvideo.mp4';
// React Icons removed in favor of MUI Icons for reliability
import VolumeOff from '@mui/icons-material/VolumeOff';
import VolumeUp from '@mui/icons-material/VolumeUp';

const PublicLogin = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState('');
  const [game, setGame] = useState(localStorage.getItem('game') || 'TankOff Classic');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const { login } = useApi();
  const { setUserData } = useContext(UserContext);
  const [isMuted, setIsMuted] = useState(JSON.parse(localStorage.getItem('isMuted')) || false);

  const audioRef = useRef(new Audio(loginAudio));
  const videoRef = useRef(null);

  // Audio and video effects (same as before)
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    const playAudio = async () => {
      if (!isMuted) {
        try {
          await audio.play();
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    };
    playAudio();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.pause();
    } else {
      audio.play().catch(error => console.error('Error playing audio:', error));
    }
    localStorage.setItem('isMuted', isMuted);
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    video.muted = true;
    video.play().catch(error => console.error("Error playing video:", error));
    return () => {
      video.pause();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    performLogin(username, password); // Use a shared login function
  };

  const handleGuestLogin = async () => {
    performLogin('guest', 'guest'); // Pass guest credentials
  };

  const performLogin = async (loginUsername, loginPassword) => {
    setError('');
    setLoading(true);

    try {
      const result = await login(game, loginUsername, loginPassword);
      if (result.success) {
        localStorage.setItem('username', loginUsername);
        localStorage.setItem('game', game);
        setUserData(result.data);
        navigate('/portal/me/stats');
      } else {
        setError(result.errorMsg || 'Login failed. Please try again.');
        console.error('Login failed:', result);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  return (
    <div className="login-container">
      <video ref={videoRef} autoPlay loop className="background-video" preload="auto">
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
              <option value="KartWars2">Kart Wars</option>
              <option value="MotorWars2">Motor Wars 2</option>
            </Form.Select>
          </Form.Group>
          <button type="submit" className="login-button">Login</button>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="login-button"
          >
            Login as Guest
          </button>
          import VolumeOff from '@mui/icons-material/VolumeOff';
          import VolumeUp from '@mui/icons-material/VolumeUp';

          // ... (in component)

          <button
            type="button"
            onClick={toggleMute}
            className={`mute-button ${isMuted ? 'muted' : ''}`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeOff sx={{ fontSize: 24 }} /> : <VolumeUp sx={{ fontSize: 24 }} />}
          </button>
        </Form>
        {loading && (
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLogin;
