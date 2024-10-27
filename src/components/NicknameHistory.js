import React from 'react';
import { MGServices } from './MGServices'; // Ensure MGServices is correctly imported

const NicknameHistory = ({ user }) => {
  if (!user || !user.nicknames || user.nicknames.length === 0) {
    return <div>No nickname history available</div>;
  }

  return (
    <div>
      <h2 id="nicknamehistory">Nickname History</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}> {/* Set fixed height and scroll */}
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Nickname</th>
            </tr>
          </thead>
          <tbody>
            {user.nicknames.map((entry, index) => (
              <tr key={index}>
                <td>{MGServices.toDate(entry.timestamp)}</td>
                <td>{entry.nickname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NicknameHistory;
