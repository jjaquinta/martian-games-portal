import React, { useContext, useEffect, useState  } from 'react';
import { UserContext } from '../UserContext';
import { Card, Table, Row, Col } from 'react-bootstrap';
import { MGServices } from '../MGServices';
import { useApi } from '../useAPI';

const MeStats = () => {
  const { userData } = useContext(UserContext);
  const [emailInput, setEmailInput] = useState(''); 
  const [codeInput, setCodeInput] = useState(''); 
  const { registerEmail } = useApi();

  useEffect(() => {
  //  console.log('UserData in MeStats:', userData);
  }, [userData]);

  const handleRegisterEmail = () => {
    registerEmail(emailInput, ''); 
    setEmailInput('');
  };
  
  const handleRegisterCode = () => {
    registerEmail('', codeInput);
    setCodeInput('');
  };
  const handleRegisterReset = () => {
    registerEmail('', 'reset'); 
  };

  if (!userData || !userData.player) {
    return <div>Loading user data...</div>;
  }

  const countryName = MGServices.getCountryName(userData.player.countryCode);

  return (
    <Card>
      <Card.Header as="h2">My Stats</Card.Header>
      <Card.Body>
        <Row className="g-0">
          <Col md={6} className="p-2">
            <Table striped bordered hover responsive>
              <tbody>
                <tr>
                  <th>Login:</th>
                  <td>{userData.player.login}</td>
                </tr>
                <tr>
                  <th>Nickname:</th>
                  <td>{userData.player.nickname}</td>
                </tr>
                <tr>
                  <th>Level:</th>
                  <td>{userData.player.level}</td>
                </tr>
                <tr>
                  <th>XP:</th>
                  <td>{userData.player.experience.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Role:</th>
                  <td>{userData.user?.role || 'user'}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6} className="p-2">
            <Table striped bordered hover responsive>
              <tbody>
                <tr>
                  <th>ID:</th>
                  <td>{userData.player?.id}</td>
                </tr>
                <tr>
                  <th>IP:</th>
                  <td>{userData.player.ip}</td>
                </tr>
                <tr>
                  <th>Country:</th>
                  <td>{countryName}</td>
                </tr>
                <tr>
                  <th>Joined:</th>
                  <td>{userData.player.timeJoined}</td>
                </tr>
                <tr>
                  <th>Last Login:</th>
                  <td>{userData.player.lastLogin}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="g-0">
          <Col md={6} className="p-2">
            <Table striped bordered hover responsive>
              <tbody>
                <tr>
                  <th>Status:</th>
                  <td>{userData.player.banned 
                      ? 'Banned' 
                      : userData.player.status === 'frozen' 
                      ? 'Frozen' 
                      : 'Verified'}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>
                    {userData?.user?.email ? (
                      // Case 1: email is registered
                      <div>
                        {userData.user.email}<br/>
                        <button
                          onClick={handleRegisterReset}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    ) : userData?.user?.pendingEmail ? (
                      // Case 2: registration has been requested, but not confirmed
                      <div>
                        Confirmation code: <br/>
                        <input
                          type="code"
                          placeholder="Enter your code"
                          value={codeInput}
                          onChange={(e) => setCodeInput(e.target.value)}
                          style={{
                            padding: '8px',
                            marginRight: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                          }}
                        /><br/>
                        <button
                          onClick={handleRegisterCode}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Submit
                        </button>
                        <button
                          onClick={handleRegisterReset}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    ) : (
                      // Case 3: no registration made
                      <div>
                        Register email:<br/>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          style={{
                            padding: '8px',
                            marginRight: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                          }}
                        /><br/>
                        <button
                          onClick={handleRegisterEmail}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}

                  </td>
                </tr>
                {userData.user.nicknameOverride && userData.user.nicknameOverride.trim() !== '' && (
                <>
                  <tr>
                    <th>Nick Override:</th>
                    <td>{userData.user.nicknameOverride}</td>
                  </tr>
                  <tr>
                    <th>Since:</th>
                    <td>{userData.user.nicknameOverrideDateDisplay}</td>
                  </tr>
                  <tr>
                    <th>Times:</th>
                    <td
                    style={{
                      backgroundColor: userData.user.nicknameOverrideTimes >= 10
                        ? 'red'
                        : userData.user.nicknameOverrideTimes >= 5
                        ? 'yellow'
                        : 'inherit',
                    }}
                    >{userData.user.nicknameOverrideTimes}</td>
                  </tr>
                </>
                )}
              </tbody>
            </Table>
          </Col>
          <Col md={6} className="p-2">
            <Table striped bordered hover responsive>
              <tbody>
                <tr>
                  <th>XP/Day:</th>
                  <td>{userData.user.xpPerDay.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>XP/Week:</th>
                  <td>{userData.user.xpPerWeek.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>XP/Year:</th>
                  <td>{userData.user.xpPerYear.toLocaleString()}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MeStats;
