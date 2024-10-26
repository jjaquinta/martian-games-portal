import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function Dashboard() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          {!userData && <li><Link to="/portal/public/login">Login</Link></li>}
          {userData && <li><Link to="/portal/logout">Logout</Link></li>}
          <li><Link to="/portal/public/policies">Policies</Link></li>
          <li><Link to="/portal/public/mod-conduct">Mod Conduct</Link></li>
          <li><Link to="/portal/public/contact">Contact</Link></li>
          <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
