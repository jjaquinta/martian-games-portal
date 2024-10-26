import React, { useState, useEffect, useContext } from 'react';
import { Card, Table, Alert, Spinner } from 'react-bootstrap';
import { UserContext } from '../../UserContext';
import { MGServices } from '../../MGServices';

function MeHistoryRank() {
  const [rankHistory, setRankHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    console.log('UserData in MeHistoryRank:', userData);
    console.log('XPs array:', userData.user.xps);

    if (!userData || !userData.user || !userData.user.xps) {
      setError('User data is incomplete or not available');
      setLoading(false);
      return;
    }

    // Use the xps data from userData
    const history = userData.user.xps.map((xp, index) => ({
      date: MGServices.toDate(xp.timestamp),
      rank: userData.user.ranks[index]?.rank || '-',
      xp: xp.xp,
      level: MGServices.toLevel(xp.xp)
    }));

    setRankHistory(history);
    setLoading(false);
  }, [userData]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Card>
      <Card.Header as="h2">Rank History</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {rankHistory.length === 0 ? (
          <p>No rank history available.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Rank</th>
                <th>XP</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {rankHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.rank}</td>
                  <td>{entry.xp.toLocaleString()}</td>
                  <td>{entry.level}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

export default MeHistoryRank;
