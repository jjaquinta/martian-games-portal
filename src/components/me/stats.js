import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Card, Table } from 'react-bootstrap';
import { MGServices } from '../MGServices';

const MeStats = () => {
  const { userData } = useContext(UserContext);

  useEffect(() => {
    console.log('UserData in MeStats:', userData);
  }, [userData]);

  if (!userData || !userData.player) {
    return <div>Loading user data...</div>;
  }

  const countryName = MGServices.getCountryName(userData.player.countryCode);
  const level = MGServices.toLevel(userData.player.xp);

  return (
    <Card>
      <Card.Header as="h2">My Stats</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Login:</th>
              <td>{userData.player.login}</td>
              <th>IP:</th>
              <td>{userData.player.ip}</td>
            </tr>
            <tr>
              <th>Nickname:</th>
              <td>{userData.player.nickname}</td>
              <th>Country:</th>
              <td>{countryName}</td>
            </tr>
            <tr>
              <th>Level:</th>
              <td>{level}</td>
              <th>Joined:</th>
              <td>{userData.player.timeJoined}</td>
            </tr>
            <tr>
              <th>XP:</th>
              <td>{userData.player.xp.toLocaleString()}</td>
              <th>Last Login:</th>
              <td>{userData.player.lastLogin}</td>
            </tr>
            <tr>
              <th>Role:</th>
              <td>{userData.user?.role || 'user'}</td>
              <th>Status:</th>
              <td>{userData.user?.status || '-'}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default MeStats;