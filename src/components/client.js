import React, { useEffect, useState } from 'react';

const Client = () => {
  const [userData, setUserData] = useState({
    user: 'Guest',
    gameStats: {}
  });

  useEffect(() => {
    // Simulating a fetch call to get client data
    setUserData({
      user: 'Player1',
      gameStats: {
        gamesPlayed: 100,
        wins: 50,
        losses: 50,
        xp: 1200,
        rank: 'Pro'
      }
    });
  }, []);

  return (
    <div className="client-content">
      <h1>Welcome, {userData.user}!</h1>
      {userData.gameStats && (
        <div className="game-stats">
          <h2>Your Game Statistics</h2>
          <ul>
            <li>Games Played: {userData.gameStats.gamesPlayed}</li>
            <li>Wins: {userData.gameStats.wins}</li>
            <li>Losses: {userData.gameStats.losses}</li>
            <li>XP: {userData.gameStats.xp}</li>
            <li>Rank: {userData.gameStats.rank}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Client;
