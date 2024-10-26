import React, { useContext } from 'react';
import { UserContext } from '../../UserContext'; // Import UserContext to access user data
import { MGServices } from '../../MGServices'; // Import MGServices for date formatting

const MeHistoryNicknames = () => {
  const { userData } = useContext(UserContext); // Access the user data from context

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
