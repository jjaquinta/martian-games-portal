import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../useAPI';

const PublicLogin = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [password, setPassword] = useState();
  const [game, setGame] = useState(() => localStorage.getItem('game') || 'TankOff Classic');
  const navigate = useNavigate();
  const { login } = useApi(); // Call the hook and extract the login function

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Call the login function from the custom hook
    const result = await login(game, username, password, navigate);

    if (!result.success) {
      console.error('Login failed:', result.error || result.status);
    }
  };
  

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br/>
        <input
          type="password"
          name="password"
          placeholder="Pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>
        <select
          name="game"
          value={game}
          onChange={(e) => setGame(e.target.value)}
        >
          <option value="TankOff Classic">Tank Off Classic</option>
          <option value="TankOff2">Tank Off 2</option>
          <option value="AirWars3">Air Wars 3</option>
          <option value="AirWars2">Air Wars 2</option>
          <option value="MotorWars2">Motor Wars</option>
          <option value="KartWars2">Kart Wars</option>
        </select>
        <br/>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default PublicLogin;
