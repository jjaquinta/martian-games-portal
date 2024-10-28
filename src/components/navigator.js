import React, { useState, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import './navigator.css';

function Navigator() {
  const location = useLocation();
  const { userData } = useContext(UserContext);
  const [expandedSections, setExpandedSections] = useState({
    me: false,
    history: false,
    Game: false,
    Beta: false,
    Admin:false
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const hasAccess = (requiredRole) => {
    const userRole = userData?.user?.role || "user";
    const roleHierarchy = { "some role": 3, "beta": 2, "user": 1,"deputy":2 };
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };

  return (
    <Nav className="flex-column p-3 navigator">
      <div className="section-links-wrapper">
        {/* Me Section */}
        {hasAccess("user") && (
          <>
            <Nav.Link onClick={() => toggleSection('me')} className="section-title" style={{ color: '#24f02f' }}>
              Me
            </Nav.Link>
            {expandedSections.me && (
              <>
                <Nav.Link as={Link} to="/portal/me/stats" className={location.pathname === '/portal/me/stats' ? 'glow' : ''}>
                  My Stats
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/me/password" className={location.pathname === '/portal/me/password' ? 'glow' : ''}>
                  Change Password
                </Nav.Link>
              </>
            )}
          </>
        )}

        {/* History Section */}
        {hasAccess("user") && (
          <>
            <Nav.Link onClick={() => toggleSection('history')} className="section-title" style={{ color: '#24f02f' }}>
              History
            </Nav.Link>
            {expandedSections.history && (
              <>
                <Nav.Link as={Link} to="/portal/me/history/nicknames" className={location.pathname === '/portal/me/history/nicknames' ? 'glow' : ''}>
                  Nicknames
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/me/history/xp" className={location.pathname === '/portal/me/history/xp' ? 'glow' : ''}>
                  XP
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/me/history/rank" className={location.pathname === '/portal/me/history/rank' ? 'glow' : ''}>
                  Rank
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/me/reports" className={location.pathname === '/portal/me/reports' ? 'glow' : ''}>
                  My Reports
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/me/actions" className={location.pathname === '/portal/me/actions' ? 'glow' : ''}>
                  My Actions
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/me/cases" className={location.pathname === '/portal/me/cases' ? 'glow' : ''}>
                  My Cases
                </Nav.Link>
              </>
            )}
          </>
        )}

        {/* Game Section */}
        {hasAccess("user") && (
          <>
            <Nav.Link onClick={() => toggleSection('Game')} className="section-title" style={{ color: '#24f02f' }}>
              Game
            </Nav.Link>
            {expandedSections.Game && (
              <>
                <Nav.Link as={Link} to="/portal/game/leaderboard" className={location.pathname === '/portal/game/leaderboard' ? 'glow' : ''}>
                  Leaderboard
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/game/lookup" className={location.pathname === '/portal/game/lookup' ? 'glow' : ''}>
                  Player Lookup
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/game/lobbychat" className={location.pathname === '/portal/game/lobbychat' ? 'glow' : ''}>
                  Lobby Chat
                </Nav.Link>
              </>
            )}
          </>
        )}

        {/* beta Section */}
        {hasAccess("beta") && (
          <>
            <Nav.Link onClick={() => toggleSection('Beta')} className="section-title" style={{ color: '#24f02f' }}>
           Beta
            </Nav.Link>
            {expandedSections.Beta && (
              <>
                <Nav.Link as={Link} to="/portal/beta/news" className={location.pathname === '/portal/beta/news' ? 'glow' : ''}>
                  News
                </Nav.Link>
              </>
            )}
          </>
        )}

          {/* admin Section */}
          {hasAccess("some role") && (
          <>
            <Nav.Link onClick={() => toggleSection('Admin')} className="section-title" style={{ color: '#24f02f' }}>
           Admin
            </Nav.Link>
            {expandedSections.Admin && (
              <>
                <Nav.Link as={Link} to="/portal/admin/investigate" className={location.pathname === '/portal/admin/investigate' ? 'glow' : ''}>
                  Investigate
                </Nav.Link>
              </>
            )}
          </>
        )}
      </div>
    </Nav>
  );
}

export default Navigator;
