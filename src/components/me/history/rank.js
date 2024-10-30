import React, { useState, useEffect, useContext } from 'react';
import { Card, Alert, Spinner } from 'react-bootstrap';
import { UserContext } from '../../UserContext';
import { MGServices } from '../../MGServices';
import './nicknames.css'; // Import the CSS file for styling

function MeHistoryRank() {
  const [rankHistory, setRankHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (!userData || !userData.user || !userData.user.xps) {
      setError('User data is incomplete or not available');
      setLoading(false);
      return;
    }

    const history = userData.user.xps.map((xp, index) => ({
      date: MGServices.toDate(xp.timestamp),
      rank: userData.user.ranks[index]?.rank || '-',
      xp: xp.xp,
      level: MGServices.toLevel(xp.xp)
    }));

    setRankHistory(history);
    setLoading(false);
  }, [userData]);

  const totalPages = Math.ceil(rankHistory.length / itemsPerPage);
  const currentEntries = rankHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
    <div>
      <h2 id="nicknamehistory">Rank History</h2>
      <div>
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
            {currentEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.rank}</td>
                <td>{entry.xp.toLocaleString()}</td>
                <td>{entry.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MeHistoryRank;
