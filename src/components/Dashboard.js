import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Dashboard.css'; // Import the CSS file for dashboard styles
import martianGamesImage from './audio/martian_games.jpg'; // Import the image

function Dashboard() {
  const { userData } = useContext(UserContext);

  return (
    <div className="dashboard-background" style={{ backgroundImage: `url(${martianGamesImage})` }}>
      <div className="dashboard-container">
        <h1 className="dashboard-title">martian games portal</h1>
        <nav className="dashboard-nav">
          <ul className="dashboard-list">
            {!userData && (
              <li className="dashboard-item">
                <Link to="/portal/public/login" className="dashboard-button">Login</Link>
              </li>
            )}
            {userData && (
              <li className="dashboard-item">
                <Link to="/portal/logout" className="dashboard-button">Logout</Link>
              </li>
            )}
            <li className="dashboard-item">
              <Link to="/portal/public/downloads" className="dashboard-button">Downloads</Link>
            </li>
            <li className="dashboard-item">
              <Link to="/portal/public/policies" className="dashboard-button">Policies</Link>
            </li>
            <li className="dashboard-item">
              <Link to="/portal/public/mod-conduct" className="dashboard-button">Mod Conduct</Link>
            </li>
            <li className="dashboard-item">
              <Link to="/portal/public/contact" className="dashboard-button">Contact</Link>
            </li>
            <li className="dashboard-item">
            <Link to="/portal/public/youtube" className="dashboard-button">Youtube</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Dashboard;
