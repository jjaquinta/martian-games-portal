import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext'; // Import UserContext to access user data
import { MGServices } from '../../MGServices'; // Import MGServices for date formatting
import './nicknames.css'; // Import the CSS file for styling

const MeHistoryNicknames = () => {
  const { userData, loading } = useContext(UserContext); // Access the user data and loading state from context

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of entries per page

  // Show a loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  // Check if userData.user and userData.user.nicknames are defined
  if (!userData || !userData.user || !userData.user.nicknames) {
    return <div>No nickname history available.</div>; // Show a message if no nicknames are available
  }

  const { nicknames } = userData.user;
  const totalEntries = nicknames.length; // Total number of entries

  // Calculate the indexes for slicing the nickname entries
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = nicknames.slice(startIndex, endIndex); // Get the entries for the current page

  // Calculate total pages
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  return (
    <div>
      <h2 id="nicknamehistory">Nickname History</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Nickname</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={index}>
                <td>{MGServices.toDate(entry.timestamp)}</td> {/* Format the timestamp */}
                <td>{entry.nickname}</td> {/* Display the nickname */}
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

export default MeHistoryNicknames;
