import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigator() {
  return (
    <Nav className="flex-column bg-light p-3" style={{ width: '200px' }}>
      <Nav.Link as={Link} to="/me/stats">My Stats</Nav.Link>
      <Nav.Link as={Link} to="/me/password">Change Password</Nav.Link>
      <Nav.Item>
        <Nav.Link as="span" className="text-muted">History</Nav.Link>
        <Nav className="flex-column ml-3">
          <Nav.Link as={Link} to="/me/history/nicknames">Nicknames</Nav.Link>
          <Nav.Link as={Link} to="/me/history/xp">XP</Nav.Link>
          <Nav.Link as={Link} to="/me/history/rank">Rank</Nav.Link>
        </Nav>
      </Nav.Item>
      <Nav.Link as={Link} to="/me/reports">My Reports</Nav.Link>
      <Nav.Link as={Link} to="/me/actions">My Actions</Nav.Link>
      <Nav.Link as={Link} to="/me/cases">My Cases</Nav.Link>
      <Nav.Link as={Link} to="/game/leaderboard">Leaderboard</Nav.Link>
      <Nav.Link as={Link} to="/game/lookup">Player Lookup</Nav.Link>
      <Nav.Link as={Link} to="/game/lobbychat">Lobby Chat</Nav.Link>
    </Nav>
  );
}

export default Navigator;
