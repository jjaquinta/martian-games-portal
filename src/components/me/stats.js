import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Card, Table, Row, Col } from 'react-bootstrap';
import { MGServices } from '../MGServices';

const MeStats = () => {
  const { userData } = useContext(UserContext);

  useEffect(() => {
  //  console.log('UserData in MeStats:', userData);
  }, [userData]);

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
                <tr>
                  <th>Status:</th>
                  <td>{userData.user?.status || '-'}</td>
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
                  <th>Banned:</th>
                  <td>{userData.player.banned ? 'Yes' : 'No'}</td>
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
            
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MeStats;
