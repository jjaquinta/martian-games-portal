import React from 'react';
import './Dashboard.css'; // Ensure this line is present
import martianGamesImage from '../audio/martian_games.jpg'; // Import the image

const Dashboard = () => {
  return (
    <div
      className="dashboard-container"
      style={{ backgroundImage: `url(${martianGamesImage})` }} // Set the background image here
    >
      <h1>Welcome to the Dashboard</h1>
      {/* Other dashboard content goes here */}
    </div>
  );
};

export default Dashboard;
