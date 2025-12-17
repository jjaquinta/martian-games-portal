import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useApi } from './useAPI';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import './Header.css';

function Header() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { quickSwitch } = useApi();

  const handleLogout = () => {
    setUserData(null);
    navigate('/portal');
  };

  return (
    <Navbar variant="dark" expand="lg" className="premium-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/portal" className="navbar-brand-premium">
          <RocketLaunchIcon className="brand-icon" />
          Martian Games Portal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <div className="navbar-center-wrapper">
            <Navbar.Text className="navbar-welcome-text">
              {userData && userData.player ? (
                <>Welcome {userData.player.login} / {userData.player.nickname} to {userData.gameInfo.gameDisplayName}!</>
              ) : (
                <>Please log in with the ID you use for the game</>
              )}
            </Navbar.Text>
          </div>

          <Nav className="ms-auto align-items-center">
            {userData ? (
              <>
                {Array.isArray(userData?.user?.links) && userData.user.links.length > 0 && (
                  <select
                    onChange={(e) => {
                      const [game, login] = e.target.value.split('|');
                      if (game && login) {
                        quickSwitch(game, login);
                      }
                    }}
                    className="quick-switch-select"
                  >
                    <option value="">Quick Switch</option>
                    {userData.user.links.map((link, index) => (
                      <option
                        key={index}
                        value={`${link.game}|${link.login}`}
                      >
                        {`${link.game} - ${link.login}`}
                      </option>
                    ))}
                  </select>
                )}
                <Nav.Link onClick={handleLogout} className="nav-link-premium">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/portal/public/login" className="nav-link-premium">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
