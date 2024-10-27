import React, { useContext } from 'react';
import { UserContext } from '../../UserContext'; // Import UserContext to access user data
import { MGServices } from '../../MGServices'; // Import MGServices for date formatting
import './nicknames.css'; // Import the CSS file for styling

const MeHistoryNicknames = () => {
  const { userData, loading } = useContext(UserContext); // Access the user data and loading state from context

  // Show a loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  // Check if userData.user and userData.user.nicknames are defined
  if (!userData || !userData.user || !userData.user.nicknames) {
    return <div>No nickname history available.</div>; // Show a message if no nicknames are available
  }

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
            {userData.user.nicknames.map((entry, index) => (
              <tr key={index}>
                <td>{MGServices.toDate(entry.timestamp)}</td> {/* Format the timestamp */}
                <td>{entry.nickname}</td> {/* Display the nickname */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeHistoryNicknames;
