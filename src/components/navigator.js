import React, { useState, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { FaGamepad, FaUser, FaHistory, FaGlobe, FaTools } from 'react-icons/fa'; // Import icons
import './navigator.css';

function Navigator() {
  const location = useLocation();
  const { userData } = useContext(UserContext);
  const [expandedSections, setExpandedSections] = useState({
    public: false,
    me: true,
    history: false,
    Game: false,
    Beta: false,
    Admin: false,
  });

  const openSection = (section) => {
    setExpandedSections((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: key === section, // Set true only for the specified section
        }),
        {}
      )
    );
  };

  const isUser = true;
  const isDeputy = userData?.user?.deputy;
  const isBeta = userData?.user?.beta;

  return (
    <Nav className="flex-column p-3 navigator">
      <div className="section-links-wrapper">
        
        {/* Public Section */}
        <Nav.Link onClick={() => openSection('public')} className="section-title" style={{ color: '#24f02f' }}>
          <FaGlobe style={{ marginRight: '8px' }} /> Public
        </Nav.Link>
        {expandedSections.public && (
          <>
            <Nav.Link as={Link} to="/portal/public/policies" className={location.pathname === '/portal/public/policies' ? 'glow' : ''}>
              Policies
            </Nav.Link>
            <Nav.Link as={Link} to="/portal/public/mod-conduct" className={location.pathname === '/portal/public/mod-conduct' ? 'glow' : ''}>
              Mod Conduct
            </Nav.Link>
            <Nav.Link as={Link} to="/portal/public/contact" className={location.pathname === '/portal/public/contact' ? 'glow' : ''}>
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/portal/public/loginYoutube" className={location.pathname === '/portal/public/loginYoutube' ? 'glow' : ''}>
              Youtube
            </Nav.Link>
          </>
        )}

        {/* Me Section */}
        {isUser && (
          <>
            <Nav.Link onClick={() => openSection('me')} className="section-title" style={{ color: '#24f02f' }}>
              <FaUser style={{ marginRight: '8px' }} /> Me
            </Nav.Link>
            {expandedSections.me && (
              <>
                <Nav.Link as={Link} to="/portal/me/stats" className={location.pathname === '/portal/me/stats' ? 'glow' : ''}>
                  My Stats
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/me/password" className={location.pathname === '/portal/me/password' ? 'glow' : ''}>
                  Change Password
                </Nav.Link>
                {userData?.gameInfo?.dbreports && (<Nav.Link as={Link} to="/portal/me/reports" className={location.pathname === '/portal/me/reports' ? 'glow' : ''}>
                  My Reports
                </Nav.Link>)}
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

        {/* History Section */}
        {isUser && (
          <>
            <Nav.Link onClick={() => openSection('history')} className="section-title" style={{ color: '#24f02f' }}>
              <FaHistory style={{ marginRight: '8px' }} /> History
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
              </>
            )}
          </>
        )}

        {/* Game Section */}
        {isUser && (
          <>
            <Nav.Link onClick={() => openSection('Game')} className="section-title" style={{ color: '#24f02f' }}>
              <FaGamepad style={{ marginRight: '8px' }} /> Game
            </Nav.Link>
            {expandedSections.Game && (
              <>
                <Nav.Link as={Link} to="/portal/game/leaderboard" className={location.pathname === '/portal/game/leaderboard' ? 'glow' : ''}>
                  Leaderboard
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/game/lookup" className={location.pathname === '/portal/game/lookup' ? 'glow' : ''}>
                  Player Lookup
                </Nav.Link>
                {userData?.gameInfo?.dblobby && (<Nav.Link as={Link} to="/portal/game/lobbychat" className={location.pathname === '/portal/game/lobbychat' ? 'glow' : ''}>
                  Lobby Chat
                </Nav.Link>)}
              </>
            )}
          </>
        )}

        {/* Beta Section */}
        {isBeta && (
          <>
            <Nav.Link onClick={() => openSection('Beta')} className="section-title" style={{ color: '#24f02f' }}>
              <FaTools style={{ marginRight: '8px' }} /> Beta
            </Nav.Link>
            {expandedSections.Beta && (
              <>
                <Nav.Link as={Link} to="/portal/beta/news" className={location.pathname === '/portal/beta/news' ? 'glow' : ''}>
                  News
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/beta/map" className={location.pathname === '/portal/beta/map' ? 'glow' : ''}>
                  Map Builder
                </Nav.Link>
              </>
            )}
          </>
        )}

        {/* Admin Section */}
        {isDeputy && (
          <>
            <Nav.Link onClick={() => openSection('Admin')} className="section-title" style={{ color: '#24f02f' }}>
              <FaTools style={{ marginRight: '8px' }} /> Admin
            </Nav.Link>
            {expandedSections.Admin && (
              <>
                <Nav.Link as={Link} to="/portal/admin/players" className={location.pathname === '/portal/admin/players' ? 'glow' : ''}>
                  Players
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/admin/reports" className={location.pathname === '/portal/admin/reports' ? 'glow' : ''}>
                  Reports
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/admin/logins" className={location.pathname === '/portal/admin/logins' ? 'glow' : ''}>
                  Logins
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/admin/investigate" className={location.pathname === '/portal/admin/investigate' ? 'glow' : ''}>
                  Investigate
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/admin/analysis" className={location.pathname === '/portal/admin/analysis' ? 'glow' : ''}>
                  Analysis
                </Nav.Link>
                <Nav.Link as={Link} to="/portal/admin/cases" className={location.pathname === '/portal/admin/cases' ? 'glow' : ''}>
                  Cases
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
