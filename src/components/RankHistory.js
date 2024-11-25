import React, { useState } from 'react';
import { MGServices } from './MGServices'; // Import MGServices for date formatting

const RankHistory = ({ user }) => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of entries per page

  const { ranks } = user;
  const totalEntries = ranks.length;

  // Calculate indexes for slicing the XP entries
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = ranks.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  if (!user || !user.ranks || user.ranks.length === 0) {
    return <div>No Rank history available</div>;
  }
  
  return (
    <div>
      <h2 id="rankhistory" className="history-title">Rank History</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={index}>
                <td>{MGServices.toDate(entry.timestamp)}</td>
                <td>{entry.rank}</td>
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
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RankHistory;
