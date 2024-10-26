import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import { Form, Button, Alert } from 'react-bootstrap';
import './Login.css'; // Optional: Keep this for any specific styles

const PublicLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [game, setGame] = useState('TankOff Classic');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useApi();
  const { setUserData } = useContext(UserContext);

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

  return (
    <div className="login-container">
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
        <Button type="submit" className="login-button">Login</Button>
      </Form>
    </div>
  );
};

export default PublicLogin;
