import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { MGServices } from '../../MGServices';

const MeHistoryRank = () => {
  const { userData } = useContext(UserContext);
  const [rankHistory, setRankHistory] = useState([]);

  useEffect(() => {
    // Simulating an API call to get rank history
    // In a real application, this would be an actual API call
    const fetchRankHistory = async () => {
      // Mock data for development
      const mockRankHistory = [
        { date: '2023-06-01', rank: 100, xp: 5000 },
        { date: '2023-06-15', rank: 95, xp: 5500 },
        { date: '2023-07-01', rank: 90, xp: 6000 },
      ];
      setRankHistory(mockRankHistory);
    };

    fetchRankHistory();
  }, []);

  if (!userData || !userData.player) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>Rank History</h2>
      {rankHistory.length === 0 ? (
        <p>No rank history available.</p>
      ) : (
        <table>
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
                <td>{entry.xp}</td>
                <td>{MGServices.toLevel(entry.xp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MeHistoryRank;
