import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Dashboard.css';
import martianGamesImage from './audio/martian_games.jpg';
import { FaSignInAlt, FaSignOutAlt, FaFileAlt, FaUserShield, FaEnvelope, FaYoutube } from 'react-icons/fa';

function Dashboard() {
  const { userData } = useContext(UserContext);

  const menuItems = [
    { to: '/portal/public/login', label: 'Login', icon: FaSignInAlt, show: !userData, gradient: 'linear-gradient(135deg, #4a9eff, #6bb0ff)' },
    { to: '/portal/logout', label: 'Logout', icon: FaSignOutAlt, show: !!userData, gradient: 'linear-gradient(135deg, #2a3f5f, #3d5a80)' },
    { to: '/portal/public/policies', label: 'Policies', icon: FaFileAlt, show: true, gradient: 'linear-gradient(135deg, #d4af37, #e8c968)' },
    { to: '/portal/public/mod-conduct', label: 'Mod Conduct', icon: FaUserShield, show: true, gradient: 'linear-gradient(135deg, #3d5a80, #4a9eff)' },
    { to: '/portal/public/contact', label: 'Contact', icon: FaEnvelope, show: true, gradient: 'linear-gradient(135deg, #1a2332, #4a9eff)' },
    { to: '/portal/public/youtube', label: 'Youtube', icon: FaYoutube, show: true, gradient: 'linear-gradient(135deg, #4a9eff, #d4af37)' },
  ];

  const visibleItems = menuItems.filter(item => item.show);

  return (
    <div className="dashboard-background" style={{ backgroundImage: `url(${martianGamesImage})` }}>
      <div className="dashboard-container">
        <h1 className="dashboard-title">
          <span className="title-gradient">MARTIAN</span>
          <span className="title-gradient-alt">GAMES</span>
          <span className="title-subtitle">PORTAL</span>
        </h1>

        <nav className="dashboard-nav">
          <div className="dashboard-grid">
            {visibleItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="dashboard-card"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    '--card-gradient': item.gradient,
                  }}
                >
                  <div className="card-icon-wrapper">
                    <Icon className="card-icon" />
                  </div>
                  <span className="card-label">{item.label}</span>
                  <div className="card-shine"></div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Dashboard;
