import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext'; // Import UserContext to access user data
import { MGServices } from '../../MGServices'; // Import MGServices for date formatting
import './nicknames.css'; // Import the CSS file for styling

const MeHistoryXP = () => {
  const { userData, loading } = useContext(UserContext); // Access the user data and loading state from context

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of entries per page

  // Show a loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if userData.user and userData.user.xps are defined
  if (!userData || !userData.user || !userData.user.xps) {
    return <div>No XP history available.</div>;
  }

  const { xps } = userData.user;
  const totalEntries = xps.length;

  // Calculate indexes for slicing the XP entries
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = xps.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

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
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={index}>
                <td>{MGServices.toDate(entry.timestamp)}</td>
                <td>{entry.xp}</td>
                <td>{MGServices.toLevel(entry.xp)}</td>
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

export default MeHistoryXP;
