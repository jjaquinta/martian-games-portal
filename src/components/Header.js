import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // If UserContext.js is in src
import { useApi } from './useAPI';

function Header() {
  const { userData, setUserData } = useContext(UserContext); // Access user data and setUserData
  const navigate = useNavigate(); // Initialize navigation
  const { quickSwitch } = useApi();

  const handleLogout = () => {
    setUserData(null); // Clear user data on logout
    navigate('/portal'); // Redirect to login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/portal">Martian Games Portal</Navbar.Brand>
        <div className="text-center w-100">
          <Navbar.Text>
            {userData && userData.player ? (
              <>Welcome {userData.player.login} / {userData.player.nickname} to {userData.gameInfo.gameDisplayName}!</>
            ) : (
              <>Please log in with the ID you use for the game</>
            )}
          </Navbar.Text>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
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
                    style={{
                      marginLeft: '10px',
                      padding: '5px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
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
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/portal/public/login">Login</Nav.Link> 
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
