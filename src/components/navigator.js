import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './navigator.css';

function Navigator() {
  const location = useLocation(); // Get the current location

  return (
    <Nav className="flex-column bg-light p-3 navigator"> {/* Add a class for styling */}
      <Nav.Link 
        as={Link} 
        to="/portal/me/stats" // Set the correct path for My Stats
        className={location.pathname === '/portal/me/stats' ? 'glow' : ''} // Apply glow class if on the stats page
      >
        My Stats
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/me/password" 
        className={location.pathname === '/portal/me/password' ? 'glow' : ''} // Apply glow class if on the password page
      >
        Change Password
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/me/history/nicknames" 
        className={location.pathname === '/portal/me/history/nicknames' ? 'glow' : ''} // Apply glow class if on the nicknames page
      >
        Nicknames
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/me/history/xp" 
        className={location.pathname === '/portal/me/history/xp' ? 'glow' : ''} // Apply glow class if on the XP page
      >
        XP
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/me/history/rank" 
        className={location.pathname === '/portal/me/history/rank' ? 'glow' : ''} // Apply glow class if on the rank page
      >
        Rank
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/me/reports" 
        className={location.pathname === '/portal/me/reports' ? 'glow' : ''} // Apply glow class if on the reports page
      >
        My Reports
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/me/actions" 
        className={location.pathname === '/portal/me/actions' ? 'glow' : ''} // Apply glow class if on the actions page
      >
        My Actions
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/me/cases" 
        className={location.pathname === '/portal/me/cases' ? 'glow' : ''} // Apply glow class if on the cases page
      >
        My Cases
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/game/leaderboard" 
        className={location.pathname === '/portal/game/leaderboard' ? 'glow' : ''} // Apply glow class if on the leaderboard page
      >
        Leaderboard
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/game/lookup" 
        className={location.pathname === '/portal/game/lookup' ? 'glow' : ''} // Apply glow class if on the player lookup page
      >
        Player Lookup
      </Nav.Link>
      <Nav.Link 
        as={Link} 
        to="/portal/game/lobbychat" 
        className={location.pathname === '/portal/game/lobbychat' ? 'glow' : ''} // Apply glow class if on the lobby chat page
      >
        Lobby Chat
      </Nav.Link>
    </Nav>
  );
}

export default Navigator;
