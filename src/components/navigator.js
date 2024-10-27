import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './navigator.css';

function Navigator() {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    me: false,
    history: false,
    game: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Nav className="flex-column p-3 navigator">
      <div className="section-links-wrapper">
        {/* Me Section */}
        <Nav.Link onClick={() => toggleSection('me')} className="section-title" style={{color: '#24f02f'}}>
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

        {/* History Section */}
        <Nav.Link onClick={() => toggleSection('history')} className="section-title" style={{color: '#24f02f'}}>
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

        {/* Game Section */}
        <Nav.Link onClick={() => toggleSection('game')} className="section-title" style={{color: '#24f02f'}}>
          Game
        </Nav.Link>
        {expandedSections.game && (
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
      </div>
    </Nav>
  );
}

export default Navigator;
