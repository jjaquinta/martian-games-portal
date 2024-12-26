import React, { useState } from 'react';
import { MGServices } from '../MGServices'; // Import MGServices for date formatting

const XPHistory = ({ user }) => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of entries per page

  const { xps } = user;
  const totalEntries = xps.length;

  // Calculate indexes for slicing the XP entries
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = xps.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  if (!user || !user.xps || user.xps.length === 0) {
    return <div>No XP history available</div>;
  }
  
  return (
    <div>
      <h2 id="xphistory" className="history-title">XP History</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>XP</th>
              <th>Level</th>
              <th>Change</th>
              <th>Over</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={index}>
                <td>{MGServices.toDateTime(entry.timestamp)}</td>
                <td>{entry.xp.toLocaleString()}</td>
                <td>{entry.level}</td>
                <td>{entry.xpchange}</td>
                <td>{entry.elapsed}</td>
                <td>{entry.xprate}</td>
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

export default XPHistory;
